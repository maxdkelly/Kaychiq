import sys
from datetime import datetime
sys.path.append('..')
from app import db, app

class Game(db.Model):
    __tablename__ = 'Game'
    code = db.Column(db.String(4), primary_key=True, nullable=False)
    timeCreated = db.Column(db.DateTime, unique=False, nullable=False, default=datetime.utcnow)
    started = db.Column(db.Boolean, nullable = False, default=False)
    link = db.Column(db.String(20), nullable=False, default="")


class User(db.Model):
    __tablename__ = 'User'
    token = db.Column(db.String(50), primary_key=True, nullable=False)
    code = db.Column(db.String(4), db.ForeignKey('Game.code'), nullable=False)
    name = db.Column(db.String(40), nullable=False)
    soju = db.Column(db.String(15), nullable=False)
    game = db.relationship("Game", foreign_keys=[code])
    turn = db.Column(db.Integer)
    numDrinks = db.Column(db.Integer, default = 0)
    host = db.Column(db.Boolean, nullable = False, default=False)


class GuessGame(db.Model):
    __tablename__ = 'GuessGame'
    code = db.Column(db.String(4), primary_key=True, nullable=False)
    timeCreated = db.Column(db.DateTime, unique=False, nullable=False, default=datetime.utcnow)
    number = db.Column(db.Integer, nullable = False)
    currGuess = db.Column(db.Integer)
    highestGuess = db.Column(db.Integer, nullable = False)
    lowestGuess = db.Column(db.Integer, nullable = False)
    turnNum = db.Column(db.Integer, nullable = False)
    numPlayers = db.Column(db.Integer, nullable = False)
    over = db.Column(db.Boolean, nullable = False, default=False)
    retLink = db.Column(db.String(20),  nullable=True)

