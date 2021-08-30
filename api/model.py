import sys
from datetime import datetime
sys.path.append('..')
from app import db, app

class Game(db.Model):
    __tablename__ = 'Game'
    code = db.Column(db.String(4), primary_key=True, nullable=False)
    timeCreated = db.Column(db.DateTime, unique=False, nullable=False, default=datetime.utcnow)

class User(db.Model):
    __tablename__ = 'User'
    token = db.Column(db.String(50), primary_key=True, nullable=False)
    code = db.Column(db.String(4), db.ForeignKey('Game.code'), nullable=False)
    name = db.Column(db.String(40), nullable=False)
    game = db.relationship("Game", foreign_keys=[code])