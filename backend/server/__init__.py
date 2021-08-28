from os import path, environ
from flask import Flask
from flask_mail import Mail
from .config import Config
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config.from_object(Config)

mail = Mail(app)

db = SQLAlchemy(app)

if not path.exists('./server/app.db'):
    print('Creating app.db...')
    from .model import *
    db.create_all()


from server.users.routes import users
app.register_blueprint(users)
from server.tasks.routes import tasks
app.register_blueprint(tasks)
from server.auths.routes import auths 
app.register_blueprint(auths)