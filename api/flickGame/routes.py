from flask import jsonify, Blueprint, request
from api.model import Game, User, FlickGame
from app import db
import random
import string

flickGame = Blueprint('flickGame', __name__)

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
    num = random.randint(600, 999)
    flipGame = FlickGame(code = code, hitPoints = num, hitRange = 100, maxHitPos = random.randint(1, 99), turnNum = 0, numPlayers = len(players))
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
            "players": [],
            "sojuMap": {}
        })

    player = User.query.filter_by(turn = game.turnNum, code = code).first()   

    yourTurn = False
    if player.name == user.name:
        yourTurn = True

    players = []
    sojuMap = {}
    for user in User.query.filter_by(code = user.code).order_by("turn"):
        players.append(user.name)
        sojuMap[user.name] = user.soju

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
            "sojuMap": sojuMap
        })


