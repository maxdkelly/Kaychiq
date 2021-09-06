from flask import jsonify, Blueprint, request
from api.model import Game, User, Blackout
from app import db
import random
import string

blackout = Blueprint('blackout', __name__)

@blackout.route("/api/testBlackout", methods=['POST'])
def testBlackout():

    content = request.json 

    return jsonify({
        "isValid": True,
        "validMsg":"yay"
    })

@blackout.route("/api/startBlackout", methods=['POST'])
def startBlackout():

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
    game.link = "blackout"
    db.session.commit()


   #setup blackout Game


    return jsonify({
        "isValid": True,
        "validMsg":None
    })

    
