from server import db, app
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer

class User(db.Model):
    __tablename__ = 'User'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    firstName = db.Column(db.String(30), unique=False, nullable=False)
    lastName = db.Column(db.String(30), unique=False, nullable=False)
    password = db.Column(db.String(50), unique=False, nullable=False)
    auth_token = db.Column(db.String(50), unique=True, nullable=True)
    profileImage = db.Column(db.String(50), unique=True, nullable=True)

    def get_reset_token(self, expires_sec=900):
        s = Serializer(app.config['SECRET_KEY'], expires_sec)
        return s.dumps({'user_id': self.id}).decode('utf-8')

    @staticmethod
    def verify_reset_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            user_id = s.loads(token)['user_id']
        except:
            return None
        return User.query.get(user_id)
    
    #Override for printing
    def __repr__(self):
        return f"User(id={self.id}, email='{self.email}')"

class Task(db.Model):
    __tablename__ = 'Task'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), unique=False, nullable=False)
    description = db.Column(db.String(250), unique=False, nullable=True)
    startDate = db.Column(db.Date(), unique=False, nullable=False)
    endDate = db.Column(db.Date(), unique=False, nullable=False)
    priority = db.Column(db.String(20), unique=False, nullable=False)
    completionDate = db.Column(db.Date(), unique=False, nullable=True)

class TaskToUser(db.Model):
    taskID = db.Column(db.Integer, db.ForeignKey('Task.id'), primary_key = True, nullable=False)
    userID = db.Column(db.Integer, db.ForeignKey('User.id'), primary_key = True, nullable=False)
    task = db.relationship("Task", foreign_keys=[taskID])
    user = db.relationship("User", foreign_keys=[userID])
    isOwner = db.Column(db.Boolean, nullable = False)

class TaskHours(db.Model):
    taskID = db.Column(db.Integer, db.ForeignKey('Task.id'), primary_key = True, nullable=False)
    userID = db.Column(db.Integer, db.ForeignKey('User.id'), primary_key = True, nullable=False)
    date = db.Column(db.Date(), primary_key = True, unique=False, nullable=False)
    hours = db.Column(db.Integer, unique=False, nullable=False)

class Tag(db.Model):
    __tablename__ = 'Tag'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

class TaskToTag(db.Model):
    taskID = db.Column(db.Integer, db.ForeignKey('Task.id'), primary_key = True, nullable=False)
    tagID = db.Column(db.Integer, db.ForeignKey('Tag.id'), primary_key = True, nullable=False)
    task = db.relationship("Task", foreign_keys=[taskID])
    tag = db.relationship("Tag", foreign_keys=[tagID])

class UserToUser(db.Model):
    acceptingUserID = db.Column(db.Integer, db.ForeignKey('User.id'), primary_key = True, nullable=False)
    requestingUserID = db.Column(db.Integer, db.ForeignKey('User.id'), primary_key = True, nullable=False)
    acceptingUser = db.relationship("User", foreign_keys=[acceptingUserID ])
    requestingUser = db.relationship("User", foreign_keys=[requestingUserID ])
    accepted = db.Column(db.Boolean, nullable = False)

class UserMaxHours(db.Model):
    UserID = db.Column(db.Integer, db.ForeignKey('User.id'), primary_key = True, nullable=False)
    MaxHours = db.Column(db.Integer, nullable=False)
  

