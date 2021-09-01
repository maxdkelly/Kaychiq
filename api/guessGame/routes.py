from flask import jsonify, Blueprint, request
from api.model import Game, User, GuessGame
from app import db
import random
import string

guessGame = Blueprint('guessGame', __name__)



@guessGame.route("/api/startGuessGame", methods=['POST'])
def startGuessGame():

    content = request.json 

    if "token" not in content:
        return jsonify({
            "isValid": False,
            "validMsg":"Malformed user information"
        })

    token = content["token"]
    user = User.query.filter_by(token = token).first()   
    code = user.code

    #TODO add in only starting until 2 or more players


    game = Game.query.filter_by(code = code).first()
    game.started = True
    game.link = "guessNumberGame"

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
        
    GuessGame.query.filter_by(code = code).delete()
    db.session.commit()

    num = random.randint(0, 99)
    # num = 50
    guessGame = GuessGame(code = code, number = num, lowestGuess = 0, highestGuess = 99, turnNum = 0, numPlayers = len(players))
    db.session.add(guessGame)
    db.session.commit()


    return jsonify({
        "isValid": True,
        "validMsg":None
    })

@guessGame.route("/api/getGuessState", methods=['POST'])
def getGuessState():

    content = request.json 

    if "token" not in content:
        return jsonify({
            "isValid": False,
            "validMsg":"Malformed user information",
            "currPlayer":None,
            "currGuess":None,
            "highestGuess":None,
            "lowestGuess":None,
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
            "currGuess":None,
            "highestGuess":None,
            "lowestGuess":None,
            "yourTurn":None,
            "gameOver":None,
            "link": None,
            "players": [],
            "sojuMap": {}
        })

    code = user.code

    game = GuessGame.query.filter_by(code = code).first()

    if not game:
        return jsonify({
            "isValid": False,
            "validMsg":"Incorrect Token",
            "currPlayer":None,
            "currGuess":None,
            "highestGuess":None,
            "lowestGuess":None,
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
            "currGuess": game.currGuess,
            "highestGuess": game.highestGuess,
            "lowestGuess": game.lowestGuess,
            "yourTurn": yourTurn,
            "gameOver": game.over,
            "link": game.retLink,
            "players": players,
            "sojuMap": sojuMap
        })

@guessGame.route("/api/guessToLobby", methods=['POST'])
def guessToLobby():
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

    game = GuessGame.query.filter_by(code = code).first()

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



@guessGame.route("/api/guess", methods=['POST'])
def guess():

    content = request.json 

    if "token" not in content or "guess" not in content:
        return jsonify({
            "isValid": False,
            "validMsg":"Malformed user information",
            "currPlayer":None,
            "currGuess":None,
            "highestGuess":None,
            "lowestGuess":None,
            "yourTurn":None,
            "gameOver":None
        })

    token = content["token"]
    guess = int(content["guess"])
    user = User.query.filter_by(token = token).first()   
    code = user.code

    game = GuessGame.query.filter_by(code = code).first()

    if not game:
        return jsonify({
            "isValid": False,
            "validMsg":"Incorrect Token",
            "currPlayer":None,
            "currGuess":None,
            "highestGuess":None,
            "lowestGuess":None,
            "yourTurn":None,
            "gameOver":None,
        })

    player = User.query.filter_by(turn = game.turnNum, code = code).first()   

    
    if player.token != user.token:
        return jsonify({
            "isValid": False,
            "validMsg":"Wrong Turn",
            "currPlayer":None,
            "currGuess":None,
            "highestGuess":None,
            "lowestGuess":None,
            "yourTurn":None,
            "gameOver":None,
        })

    game.currGuess = guess

    if guess == game.number:
        game.over = True
    elif guess > game.number:
        game.highestGuess = guess
    else:
        game.lowestGuess = guess

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
        "validMsg":"",
        "currPlayer": player.name,
        "currGuess": game.currGuess,
        "highestGuess": game.highestGuess,
        "lowestGuess": game.lowestGuess,
        "yourTurn": yourTurn,
        "gameOver": game.over
        
    })



