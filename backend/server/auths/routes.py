from flask import jsonify, Blueprint, request
from flask_mail import Message

from server.model import User, UserMaxHours
from server import db
from server import mail

from passlib.hash import pbkdf2_sha256 as pwd

from uuid import uuid4

auths = Blueprint('auths', __name__)

@auths.route("/api/signup",methods=['POST'])
def signup():

    content = request.json 
    print(content)

    if "email" not in content or "firstName" not in content or "lastName" not in content or "password" not in content:
        return jsonify({
        "success": False,
        "msg":"Malformed user information"
        })

    if bool(User.query.filter_by(email=content['email']).first()):
        return jsonify({
        "success": False,
        "msg":"User with email already exists"
        })

    user = User(email= content['email'], firstName = content['firstName'], lastName = content['lastName'], password = pwd.hash(content['password']), auth_token = None)
    print(user.id)
    db.session.add(user)
    db.session.commit()

    user_id = User.query.filter_by(email=content['email']).first().id
    print(user_id)
    userMaxHours = UserMaxHours(UserID = user_id, MaxHours = 8)
    db.session.add(userMaxHours)
    db.session.commit()

    return jsonify({
        "success":True,
        "msg":"User successfully signed up"
    })

    
@auths.route("/api/login",methods=['POST'])
def login():
    content = request.json 
    user = User.query.filter_by(email=content['email']).first()
    if not bool(user):
        return jsonify({
        "success":False,
        "msg":"Password or Email does not match",
        "auth_token":None
    }) 
    elif bool(user.auth_token):
        return jsonify({
        "success":True,
        "msg":"User already logged in",
        "auth_token":user.auth_token
    })
    elif pwd.verify(content['password'], user.password):
        # using this for now, can switch to something more secure if needed
        # will be used to check if user is logged in, currently does not expire until log out this can be changed
        # requests for information should be checked against the token if they are the same 
        # they will be considered logged in
        user.auth_token = str(uuid4())
        db.session.commit()
        return jsonify({
        "success":True,
        "msg":"User logged in",
        "auth_token": user.auth_token
    })
    print(user.auth_token)

    return jsonify({
        "success":False,
        "msg":"Password or Email does not match",
        "auth_token":None
    })

@auths.route("/api/logout",methods=['POST'])
def logout():
    content = request.json

    if "token" not in content:
        return jsonify({
            "success":False,
            "msg":"Malformed user information"
        })
    token = content["token"]
    user = User.query.filter_by(auth_token=token).first()
    if not bool(user):
        return jsonify({
            "success":False,
            "msg":"User does not exist for token"
    })
    elif user.auth_token == token:
        user.auth_token = None
        db.session.commit()
        return jsonify({
            "success":True,
            "msg":"User logged out"
    })
    return jsonify({
            "success":False,
            "msg":"Authentication token not correct"
        })



@auths.route("/api/resetRequest",methods=['POST'])
def reset_request():
    content = request.json 

    if "email" not in content:
        return jsonify({
        "success": False,
        "msg":"Malformed user information"
    })

    user = User.query.filter_by(email=content['email']).first()
    if not bool(user):
        return jsonify({
        "success": False,
        "msg":"User does not exist"
        })

    token = user.get_reset_token()
    msg = Message('Password Reset for Task Master', sender = 'max.diamond.kelly@gmail.com', recipients = [content['email']])
    msg.body = f'''Hey, sending you this email to reset your password.
Please go this link to reset your password for your Task Master account:
http://localhost:3000/reset_password/{token}
Also note that this link will expire after 15 mins. 
    '''
    mail.send(msg)
    return jsonify({
            "success":True,
            "msg":"Password reset email sent"
        })


@auths.route("/api/changePassword",methods=['POST'])
def change_password():
    content = request.json 

    if "email" not in content or "oldPassword" not in content or "newPassword" not in content:
        return jsonify({
        "success": False,
        "msg":"Malformed user information"
    })

    user = User.query.filter_by(email=content['email']).first()
    if not bool(user):
        return jsonify({
        "success": False,
        "msg":"User or Password Incorrect"
        })

    if pwd.verify(content['oldPassword'], user.password):
        
        user.password = pwd.hash(content['newPassword'])
        db.session.commit()
        
        return jsonify({
            "success":True,
            "msg":"Password has been changed"
        })

    return jsonify({
        "success": False,
        "msg":"User or Password Incorrect"
    })

@auths.route("/api/verifyResetToken",methods=['POST'])
def verify_reset_token():
    content = request.json 

    if "resetToken" not in content:
        return jsonify({
            "success": False,
            "msg":"Malformed user information"
        })

    token = content['resetToken']
    user = User.verify_reset_token(token)
    if user is None:
        return jsonify({
            "success":False,
            "msg":"Invalid or expired token."
        })

    return jsonify({
        "success":True,
        "msg":"Valid token."
    })
        
@auths.route("/api/passwordReset",methods=['POST'])
def reset_password():
    content = request.json
    if "resetToken" not in content or "password" not in content:
        return jsonify({
            "success": False,
            "msg":"Malformed user information"
        })

    token = content['resetToken']
    user = User.verify_reset_token(token)
    
    if user is None:
        return jsonify({
            "success":False,
            "msg":"Invalid or expired token."
        })

    # logout(token)
    user.password = pwd.hash(content['password'])
    db.session.commit()
    
    print(f"LOG: password has been changed to {user.password}")

    return jsonify({
        "success":True,
        "msg":"Password has been reset"
    })

@auths.route("/api/isAuthenticated",methods=['POST'])
def check_authentication():
    content = request.json 

    if "token" not in content:
        return jsonify({
        "success": False,
        "msg":"Malformed user information"
    })

    token = content['token']

    q = User.query.filter_by(auth_token = token).first()

    if q:
        return jsonify({
                "success":True,
                "msg":"User is Authenticated"
            })

    else:
        return jsonify({
                "success":False,
                "msg":"User is not Authenticated"
            })

