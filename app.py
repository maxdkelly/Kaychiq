from flask import Flask, send_from_directory
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy

from os import path
from api.config import Config

app = Flask(__name__,static_folder='frontend/build',static_url_path='')

app.config.from_object(Config)

cors = CORS(app)

db = SQLAlchemy(app)

if not path.exists('./app.db'):
    print('Creating app.db...')
    from api.model import *
    try:
        db.create_all()
    except:
        pass

from api.general.routes import general
from api.guessGame.routes import guessGame
app.register_blueprint(guessGame)
app.register_blueprint(general)

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
	app.run()