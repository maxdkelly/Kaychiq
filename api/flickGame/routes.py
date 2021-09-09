from flask import jsonify, Blueprint, request
from api.model import Game, User, FlickGame
from app import db
import random
import string

flickGame = Blueprint('flickGame', __name__)

def removeFlickUser(code, turn):

    game = FlickGame.query.filter_by(code = code).first()
    
    if not game:
        return
        
    game.numPlayers -= 1

    #makes sure turn order is maintained
    if turn == game.turnNum:
        if game.turnNum + 1 == game.numPlayers:
            game.turnNum = 0
    elif turn < game.turnNum:
        game.turnNum -= 1


    db.session.commit()

    for user in User.query.filter_by(code = code):
        if user.turn > turn:
            user.turn -= 1
            db.session.commit()


@flickGame.route("/api/startFlickGame", methods=['POST'])
def startFlickGame():

    content = request.json 

    if "token" not in content:
        return jsonify({
            "isValid": False,
            "validMsg":"Malformed user information"
        })

    token = content["token"]
    user = User.query.filter_by(token = token).first()   

    if not user:
        return jsonify({
            "isValid": False,
            "validMsg":"Incorrect Token"
        })

    code = user.code

    #TODO add in only starting until 2 or more players


    game = Game.query.filter_by(code = code).first()

    if not game:
        return jsonify({
            "isValid": False,
            "validMsg":"Incorrect Token"
        })
    
    game.started = True
    game.link = "flickGame"

    players = []
    for user in User.query.filter_by(code = code):
        players.append(user.token)
        
    random.shuffle(players)

    order = 0
    for player in players:
        user = User.query.filter_by(token = player).first()   
        user.turn = order
        db.session.commit()
        order += 1
        
    FlickGame.query.filter_by(code = code).delete()
    db.session.commit()
    num = random.randint(210, 700)
    flipGame = FlickGame(code = code, hitPoints = num, currHitPoints = num, hitRange = 100, maxHitPos = 70, turnNum = 0, numPlayers = len(players), tick = False)
    db.session.add(flipGame)
    db.session.commit()


    return jsonify({
        "isValid": True,
        "validMsg":None
    })

@flickGame.route("/api/getFlickState", methods=['POST'])
def getFlickState():

    content = request.json 

    if "token" not in content:
        return jsonify({
            "isValid": False,
            "validMsg":"Malformed user information",
            "currPlayer":None,
            "currHitPos":None,
            "hitRange":None,
            "maxHitPos":None,
            "yourTurn":None,
            "gameOver":None,
            "link": None,
            "stage": None,
            "players": [],
            "sojuMap": {}
        })

    token = content["token"]
    user = User.query.filter_by(token = token).first()   

    if not user:
        return jsonify({
            "isValid": False,
            "validMsg":"Incorrect Token",
            "currPlayer":None,
            "currHitPos":None,
            "hitRange":None,
            "maxHitPos":None,
            "yourTurn":None,
            "gameOver":None,
            "link": None,
            "stage": None,
            "players": [],
            "sojuMap": {}
        })

    code = user.code

    game = FlickGame.query.filter_by(code = code).first()

    if not game:
        return jsonify({
            "isValid": False,
            "validMsg":"Incorrect Token",
            "currPlayer":None,
            "currHitPos":None,
            "hitRange":None,
            "maxHitPos":None,
            "yourTurn":None,
            "gameOver":None,
            "link": None,
            "stage": None,
            "players": [],
            "sojuMap": {}
        })

    stage = 0
    print("hit:",game.currHitPoints)
    
    if game.currHitPoints < game.hitPoints / 2:
        stage = 1

    if game.currHitPoints <= 0:
        stage = 2

    health = 100

    if game.currHitPoints < (3 * game.hitPoints / 4):
        health = 75

    if game.currHitPoints < game.hitPoints / 2:
        health = 50

    if game.currHitPoints < game.hitPoints / 4:
        health = 25


    player = User.query.filter_by(turn = game.turnNum, code = code).first()   

    yourTurn = False
    if player.name == user.name:
        yourTurn = True

    players = []
    sojuMap = {}

    drinkingPlayers = []
    drinkIndex = []

    if game.over:

        if game.turnNum + 1 == game.numPlayers:
            drinkIndex.append(0)
            drinkIndex.append(game.turnNum - 1)
        elif game.turnNum == 0:

            drinkIndex.append(game.numPlayers - 1)
            drinkIndex.append(game.turnNum + 1)
        else:
            drinkIndex.append(game.turnNum - 1)
            drinkIndex.append(game.turnNum + 1)

    for user in User.query.filter_by(code = user.code).order_by("turn"):
        players.append(user.name)
        sojuMap[user.name] = user.soju

        if user.turn in drinkIndex:
            drinkingPlayers.append(user.name)

    
    if len(drinkingPlayers) == 1:
        drinkingPlayers.append(drinkingPlayers[0])
    

        

    # print("sssssssssssssssssssssssssssssssssssssssssss",game.currHitPos)
    return jsonify({
            "isValid": True,
            "validMsg":"",
            "currPlayer": player.name,
            "currHitPos": game.currHitPos,
            "hitRange": game.hitRange,
            "maxHitPos": game.maxHitPos,
            "yourTurn": yourTurn,
            "gameOver": game.over,
            "link": game.retLink,
            "players": players,    
            "stage": stage,
            "sojuMap": sojuMap,
            "tick": game.tick,
            "drinkingPlayers": drinkingPlayers,
            "health": health
        })

@flickGame.route("/api/flick", methods=['POST'])
def flick():

    content = request.json 

    if "token" not in content or "flick" not in content:
        return jsonify({
            "isValid": False,
            "validMsg":"Malformed user information",
            "stage": None,
            "currHitPos": None
        })

    token = content["token"]
    flick = int(content["flick"])
    print("hey", token)
    user = User.query.filter_by(token = token).first()   
    print("ho")

    code = user.code

    game = FlickGame.query.filter_by(code = code).first()

    if not game:
        return jsonify({
            "isValid": False,
            "validMsg":"Incorrect Token",
            "stage": None,
            "currHitPos": None
        })

    player = User.query.filter_by(turn = game.turnNum, code = code).first()   

    
    if player.token != user.token:
        return jsonify({
            "isValid": False,
            "validMsg":"Wrong Turn",
            "stage": None,
            "currHitPos": None
        })

    if abs(flick - game.maxHitPos) <= 10:

        game.currHitPoints -= 100
    elif abs(flick - game.maxHitPos) <= 30:
        game.currHitPoints -= int((100 - abs(flick - game.maxHitPos)) / 5)
        
    game.currHitPos = flick

    game.maxHitPos = random.randint(20, 80)

    game.tick = not game.tick
    stage = 0
    if game.currHitPoints < game.hitPoints / 2:
        stage = 1
    if game.currHitPoints <= 0:
        stage = 2
        game.over = True

    if not game.over:
        if game.turnNum + 1 == game.numPlayers:
            game.turnNum = 0
        else:
            game.turnNum += 1
        
    db.session.commit()

    player = User.query.filter_by(turn = game.turnNum, code = code).first()   

    yourTurn = False
    if player.name == user.name:
        yourTurn = True


    return jsonify({
        "isValid": True,
        "validMsg": "",
        "stage": stage,
        "currHitPos": game.currHitPoints,
        "tick": game.tick
    })

@flickGame.route("/api/flickToLobby", methods=['POST'])
def flickToLobby():
    content = request.json 

    if "token" not in content:
        return jsonify({
            "isValid": False,
            "validMsg":"Malformed user information"
        })

    token = content["token"]
    user = User.query.filter_by(token = token).first()   

    if not user:
        return jsonify({
            "isValid": False,
            "validMsg":"Incorrect Token",
        })

    code = user.code

    game = FlickGame.query.filter_by(code = code).first()

    if not game:
        return jsonify({
            "isValid": False,
            "validMsg":"Incorrect Token",
        })

    game.retLink = "lobby"

    wholeGame = Game.query.filter_by(code = code).first()
    wholeGame.started = False
    
    db.session.commit()

    return jsonify({
        "isValid": True,
        "validMsg":"", 
    })


