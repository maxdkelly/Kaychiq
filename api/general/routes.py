from flask import jsonify, Blueprint, request
from api.model import Game, User, GuessGame
from app import db
import random
import string
import glob
from datetime import timedelta, datetime

general = Blueprint('general', __name__)

def get_soju():

    return [x.split("/")[-1].split(".")[0]  for x in glob.glob("./frontend/src/soju/*")]

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

    one_day = timedelta(hours=24)
    one_day_ago = datetime.now() - one_day

    old_codes = []
    for game in Game.query.filter(Game.timeCreated < one_day_ago).all():
        old_codes.append(game.code)

    Game.query.filter(Game.code.in_(old_codes)).delete()
    User.query.filter(User.code.in_(old_codes)).delete()
    GuessGame.query.filter(GuessGame.code.in_(old_codes)).delete()

    db.session.commit()

    print("grabbed",old_codes)

    print(get_soju())
    if "username" not in content:
        return jsonify({
            "isValid": False,
            "validMsg":"Malformed user information",
            "gameToken": None,
            "individualToken": None
        })

    soju = random.choice(get_soju())
    username = content["username"]

    if not username:
        return jsonify({
            "isValid": False,
            "validMsg":"Enter Non Empty Username",
            "gameToken": None,
            "individualToken": None
        })
    tokenUnique = False
    gameToken = ""

    while not tokenUnique:
        gameToken = ''.join(random.choice(string.ascii_uppercase) for _ in range(4))
        print(gameToken)
        tokenUnique = not bool(Game.query.filter_by(code = gameToken).first())
    print(gameToken)
    game = Game(code = gameToken, timeCreated = datetime.now())
    user = User(token = gameToken + "_" + username, code = gameToken, name = username, host = True, soju = soju)

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

    if not name:
        return jsonify({
            "isValid": False,
            "validMsg":"Enter Non Empty Username",
            "gameToken": None,
            "individualToken": None
        })

    if not bool(Game.query.filter_by(code = code).first()):
        return jsonify({
            "isValid": False,
            "validMsg":"Incorrect Game Token",
            "gameToken": None,
            "individualToken": None
        })

    if User.query.filter_by(code = code).count() > 8:
        return jsonify({
            "isValid": False,
            "validMsg":"Too many players in Game (Max 8)",
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

    sojus = get_soju()
    for user in User.query.filter_by(code = code):
        sojus.remove(user.soju)

    user = User(token = token, code = code, name = name, soju = random.choice(sojus))

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
            "players": [],
            "sojuMap": {}
        })

    if content['token'] == "":
        return jsonify({
            "isValid": False,
            "validMsg":"Malformed user information",
            "gameStarted": False,
            "gameLink": None,
            "players": [],
            "sojuMap": {}
        })

    token = content["token"]
    user = User.query.filter_by(token = token).first()   

    if not user:
        return jsonify({
            "isValid": False,
            "validMsg":"Malformed user information",
            "gameStarted": False,
            "gameLink": None,
            "players": [],
            "sojuMap": {}
        })

    print(user.code)
    players = []
    sojuMap = {}
    for user in User.query.filter_by(code = user.code):
        players.append(user.name)
        sojuMap[user.name] = user.soju

    game = Game.query.filter_by(code = user.code).first()
    print(game.timeCreated)
    return jsonify({
        "isValid": True,
        "validMsg":"Malformed user information",
        "gameStarted": game.started,
        "gameLink": game.link,
        "players": players,
        "sojuMap": sojuMap
    })


@general.route("/api/isHost", methods=['POST'])
def isHost():

    content = request.json 
    print(content)

    if "token" not in content:
        return jsonify({
            "isValid": False,
            "validMsg":"Malformed user information",
            "isHost": None
        })

    if content['token'] == "":
        return jsonify({
            "isValid": False,
            "validMsg":"Malformed user information",
            "isHost": None
        })

    token = content["token"]
    user = User.query.filter_by(token = token).first()   

    if not user:
        return jsonify({
            "isValid": False,
            "validMsg":"Incorrect Token",
            "isHost": None
        })


    return jsonify({
        "isValid": False,
            "validMsg":"Malformed user information",
            "isHost": user.host
    })
