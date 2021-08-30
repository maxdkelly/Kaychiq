from flask import jsonify, Blueprint, request
from api.model import Game, User
from app import db
import random
import string

general = Blueprint('gemeral', __name__)



@general.route("/api/test", methods=['POST','GET'])
def test():

    return jsonify({
        "isValid":True,
        "validMsg":"Test route works"
    })

@general.route("/api/createGame", methods=['POST'])
def create_game():

    content = request.json 
    print(content)

    if "username" not in content:
        return jsonify({
            "isValid": False,
            "validMsg":"Malformed user information",
            "gameToken": None,
            "individualToken": None
        })

    username = content["username"]
    tokenUnique = False
    gameToken = ""

    while not tokenUnique:
        gameToken = ''.join(random.choice(string.ascii_uppercase) for _ in range(4))
        print(gameToken)
        tokenUnique = not bool(Game.query.filter_by(code = gameToken).first())
    print(gameToken)
    game = Game(code = gameToken)
    user = User(token = gameToken + "_" + username, code = gameToken, name = username)

    db.session.add(game)
    db.session.add(user)
    db.session.commit()

    return jsonify({
        "isValid": True,
        "validMsg":None,
        "gameToken": gameToken,
        "individualToken": gameToken + "_" + content['username']
    })

@general.route("/api/joinGame", methods=['POST'])
def join_game():

    content = request.json 
    print(content)

    if "username" not in content or "code" not in content:
        return jsonify({
            "isValid": False,
            "validMsg":"Malformed user information",
            "gameToken": None,
            "individualToken": None
        })

    code = content["code"]
    name = content["username"]

    if not bool(Game.query.filter_by(code = code).first()):
         return jsonify({
            "isValid": False,
            "validMsg":"Incorrect Game Token",
            "gameToken": None,
            "individualToken": None
        })

    token = code + "_" + name
    if bool(User.query.filter_by(token = token).first()):
         return jsonify({
            "isValid": False,
            "validMsg":"Please Select a Different Username",
            "gameToken": None,
            "individualToken": None
        })

    user = User(token = token, code = code, name = name)

    db.session.add(user)
    db.session.commit()
   
    return jsonify({
        "isValid": True,
        "validMsg":None,
        "gameToken": code,
        "individualToken": token
    })



@general.route("/api/checkGameStarted", methods=['POST'])
def check_game():

    content = request.json 
    print(content)

    if "token" not in content:
        return jsonify({
            "isValid": False,
            "validMsg":"Malformed user information",
            "gameStarted": False,
            "gameLink": None,
            "players": []
        })

    if content['token'] == "":
        return jsonify({
            "isValid": False,
            "validMsg":"Malformed user information",
            "gameStarted": False,
            "gameLink": None,
            "players": []
        })

    token = content["token"]
    user = User.query.filter_by(token = token).first()   

    if not user:
        return jsonify({
            "isValid": False,
            "validMsg":"Malformed user information",
            "gameStarted": False,
            "gameLink": None,
            "players": []
        })

    print(user.code)
    players = []
    for user in User.query.filter_by(code = user.code):
        players.append(user.name)


    return jsonify({
        "isValid": True,
        "validMsg":"Malformed user information",
        "gameStarted": False,
        "gameLink": None,
        "players": players
    })

