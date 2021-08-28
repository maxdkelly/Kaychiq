from flask import jsonify, Blueprint, request
from datetime import date
from server import db
from server.model import *
from server.users.utils import *
import json
from werkzeug.utils import secure_filename
import base64

users = Blueprint('users', __name__)


@users.route("/api/getUserProfile", methods=['POST'])
def get_user_profile():
    content = request.json
    if "token" not in content or "user_id" not in content:
        return jsonify({
            "success": False,
            "msg": "Malformed information",
            "profile": None
        })

    #Check valid user
    token = content['token']
    user = User.query.filter_by(auth_token=token).first()
    if user is None:
        return jsonify({
            "success": False,
            "msg": "Invalid Authentication.",
            "profile": None
        })

    #Get user profile
    userId = content['user_id']
    if userId == 0:
        return jsonify({
            "success": True,
            "msg": "Profile fetched",
            "profile": get_profile_json(user)
        })

    #Check others profile
    other = User.query.get(userId)
    if other is None:
        return jsonify({
            "success": False,
            "msg": "No such user",
            "profile": None
        })

    #Get others profile
    return jsonify({
        "success": True,
        "msg": "Profile fetched",
        "profile": get_profile_json(other)
    })


@users.route("/api/uploadProfileImage", methods=['POST'])
def upload_image():
    # get token
    token = request.form['token']
    # find user
    user = User.query.filter_by(auth_token=token).first()
    # check user exists
    if not bool(user):
        return jsonify({
            "success": False,
            "msg": "invalid authentication"
        })
    # check if the post request has the file part
    if 'file' not in request.files:
        return jsonify({
            "success":False,
            "msg":"No file found"
        })
    # get file
    f = request.files['file']
    # if user does not select file, browser also
    # submit an empty part without filename
    if f.filename == '':
        return jsonify({
            "success": False,
            "msg": "Malformed information"
        })
    # save file
    if f and allowed_file(f.filename):
        filename = secure_filename(f.filename)
        f.save(os.path.join(
            app.config['UPLOAD_FOLDER'], str(user.id) ))
        user.profileImage = str(user.id) 
        db.session.commit()
        return jsonify({
            "success": True,
            "msg": "Image Uploaded"
        })
    return jsonify({
        "success": False,
        "msg": "Malformed information"
    })


@users.route("/api/getProfileImage", methods=['POST'])
def get_image():
    content = request.json
    # check if person requesting is authorised
    authCheck = User.query.filter_by(auth_token=content['token']).first()
    if not bool(authCheck):
        return jsonify({
            "success": False,
            "msg": "invalid authentication"
        })

    #Get id of the requested users profile
    userId = content['user_id']
    if userId == 0:
        userId = authCheck.id
    user = User.query.filter_by(id=userId).first()

    image_filename = user.profileImage
    encoded_img = get_response_image(image_filename)
    # code to check image
    string_encoded = encoded_img.decode('utf-8')
    with open("CheckIfImageIsDecodeable.png", "wb") as fh:
        fh.write(base64.decodebytes(encoded_img))

    return jsonify({
        "success": True if encoded_img else False,
        "msg": "Image sent"if encoded_img else "Can not find image",
        "profileImage": encoded_img.decode('utf-8')
    })


@users.route("/api/changeName", methods=['POST'])
def change_name():
    content = request.json
    if "token" not in content or "firstName" not in content or "lastName" not in content:
        return jsonify({
            "success": False,
            "msg": "Malformed information",
            "tasks": None
        })

    token = content['token']
    user = User.query.filter_by(auth_token=token).first()
    if user is None:
        return jsonify({
            "success": False,
            "msg": "Invalid Authentication."
        })

    user.firstName = content["firstName"]
    user.lastName = content["lastName"]
    db.session.commit()
    return jsonify({
        "success": True,
        "msg": "Name changed."
    })


@users.route("/api/getConnections", methods=['POST'])
def get_connections():
    content = request.json
    if "user_id" not in content or "token" not in content:
        return jsonify({
            "success": False,
            "msg":"Malformed information"
        })

    # set up variables
    token = content['token']
    user = User.query.filter_by(auth_token = token).first()
    userConnections = []

    # find all possible connections
    query = db.session.query(UserToUser).filter((UserToUser.acceptingUserID ==user.id) | (UserToUser.requestingUserID==user.id))
    
    # loop through query and add to the response list if they are connected
    for connection in query:
        connectionID = 0

        # check if they are connected
        if connection.accepted:

            # check which one is the user
            if connection.acceptingUserID == user.id:
                connectionID = connection.requestingUserID
            else:
                connectionID = connection.acceptingUserID

            # get userprofile and add to response list
            connectedUser = User.query.filter_by(id=connectionID).first()
            userConnections.append(get_profile_json(connectedUser))
            
    return jsonify({
        "success": True,
        "msg":"Request has been accepted",
        "connections":userConnections
    })




@users.route("/api/getConnectionRequests", methods=['POST'])
def get_connection_requests():
    content = request.json
    if "token" not in content:
        return jsonify({
            "success": False,
            "msg":"Malformed information"
        })

    # set up variables
    token = content['token']
    user = User.query.filter_by(auth_token = token).first()
    outConnectionRequests = []
    inConnectionRequests = []

    # find all possible connections
    query = db.session.query(UserToUser).filter((UserToUser.acceptingUserID ==user.id) | (UserToUser.requestingUserID==user.id))
    
    # loop through query and add to the response list if they are connected
    for conreq in query:
        requestingUserID = 0

        # check if they are connected
        if not conreq.accepted:

            # check which one is the user
            if conreq.acceptingUserID == user.id:
                # get userprofile and add to response list
                requestingUser = User.query.filter_by(id=conreq.requestingUserID).first()
                inConnectionRequests.append(get_profile_json(requestingUser))
            else:
                # get userprofile and add to response list
                requestingUser = User.query.filter_by(id=conreq.acceptingUserID).first()
                outConnectionRequests.append(get_profile_json(requestingUser))

            
    return jsonify({
        "success": True,
        "msg":"Requests have been acquired",
        "outgoing_connection":outConnectionRequests,
        "incoming_connection":inConnectionRequests
    })



@users.route("/api/checkConnectionState", methods=['POST'])
def check_connection_states():
    content = request.json
    if "requested_user_id" not in content or "token" not in content:
        return jsonify({
            "success": False,
            "msg": "Malformed information"
        })

    token = content['token']
    user = User.query.filter_by(auth_token=token).first()
    if user is None:
        return jsonify({
            "success": False,
            "msg": "Invalid Authentication."
        })

    targetId = content['requested_user_id']
    target = User.query.get(targetId)
    if target is None:
        return jsonify({
            "success": False,
            "msg": "Requested user doesn't exists"
        })

    rel = get_relationship(user.id, targetId)
    code = 0
    if rel is not None:
        if rel.accepted:
            code = 1
        elif rel.acceptingUserID == targetId:
            code = 2
        elif rel.acceptingUserID == user.id:
            code = 3

    if targetId == user.id:
        code = 4
        
    return jsonify({
        "success": True,
        "msg": code
    })


@users.route("/api/cancelConnectionRequest", methods=['POST'])
def cancel_connection_request():
    content = request.json
    if "requested_user_id" not in content or "token" not in content:
        return jsonify({
            "success": False,
            "msg": "Malformed information"
        })

    token = content['token']
    user = User.query.filter_by(auth_token=token).first()
    if user is None:
        return jsonify({
            "success": False,
            "msg": "Invalid Authentication."
        })

    targetId = content['requested_user_id']
    rel = get_relationship(user.id, targetId)
    if rel is None:
        return jsonify({
            "success": False,
            "msg": "Request doesn't exists."
        })

    if rel.requestingUserID != user.id:
        return jsonify({
            "success": False,
            "msg": "Invalid Authentication."
        })

    db.session.delete(rel)
    db.session.commit()
    return jsonify({
        "success": True,
        "msg": "Request has been cancelled"
    })


@users.route("/api/requestConnection", methods=['POST'])
def request_connection():
    content = request.json
    if "requested_user_id" not in content or "token" not in content:
        return jsonify({
            "success": False,
            "msg": "Malformed information"
        })

    token = content['token']
    user = User.query.filter_by(auth_token=token).first()
    if user is None:
        return jsonify({
            "success": False,
            "msg": "Invalid Authentication."
        })

    targetId = content['requested_user_id']
    #Check if there is a connection request the other way
    rel = get_relationship(user.id, targetId)
    if rel is None:
        rel = UserToUser(requestingUserID=user.id,
                         acceptingUserID=targetId, accepted=False)
        db.session.add(rel)
        db.session.commit()
    elif not rel.accepted and rel.acceptingUserID == user.id:
        rel.accepted = True
        db.session.commit()

    return jsonify({
        "success": True,
        "msg": "Request has been sent"
    })


@users.route("/api/respondToRequest", methods=['POST'])
def respond_to_request():
    content = request.json
    if "requested_user_id" not in content or "token" not in content or "accept" not in content:
        return jsonify({
            "success": False,
            "msg": "Malformed information"
        })

    token = content['token']
    user = User.query.filter_by(auth_token=token).first()
    if user is None:
        return jsonify({
            "success": False,
            "msg": "Invalid Authentication."
        })

    targetId = content['requested_user_id']
    #Check if there is a connection request the other way
    rel = get_relationship(user.id, targetId)
    if rel is None:
        return jsonify({
            "success": False,
            "msg": "Friend requests doesn't exists."
        })

    if content['accept'] and rel.acceptingUserID == user.id:
        rel.accepted = content['accept']
        db.session.commit()
    elif not content['accept']:
        db.session.delete(rel)
        db.session.commit()

    return jsonify({
        "success": True,
        "msg": "Request has been responded to."
    })


@users.route("/api/removeConnection", methods=['POST'])
def remove_connection():
    content = request.json
    if "requested_user_id" not in content or "token" not in content:
        return jsonify({
            "success": False,
            "msg": "Malformed information"
        })

    token = content['token']
    user = User.query.filter_by(auth_token=token).first()
    if user is None:
        return jsonify({
            "success": False,
            "msg": "Invalid Authentication."
        })

    targetId = content['requested_user_id']
    #Check if there is a connection request the other way
    rel = get_relationship(user.id, targetId)
    if rel is None:
        return jsonify({
            "success": False,
            "msg": "Connection doesn't exists."
        })

    db.session.delete(rel)
    db.session.commit()
    return jsonify({
        "success": True,
        "msg": "Connection has been removed."
    })


@users.route("/api/searchUsers", methods=['POST'])
def search_users():
    content = request.json
    if "searchString" not in content or "token" not in content:
        return jsonify({
            "success": False,
            "msg": "Malformed information",
            "users": None
        })

    token = content['token']
    user = User.query.filter_by(auth_token=token).first()
    if user is None:
        return jsonify({
            "success": False,
            "msg": "Invalid Authentication.",
            "users": None
        })

    #Search for users
    search = "%"+content['searchString']+"%"
    query = db.session.query(User, User.id, User.firstName, User.lastName).filter(
        (User.firstName+' '+User.lastName).like(search)).all()

    #Create json for users
    cUsers = []
    ncUsers = []
    selfUser = None
    for data in query:
        json = {
            "id": data.id,
            "firstName": data.firstName,
            "lastName": data.lastName
        }

        #Checks if searching user is involved
        if data.id == user.id:
            selfUser = json
            continue
        
        #Check if they are friends
        rel = get_relationship(data.id, user.id)
        if rel is not None and rel.accepted:
            cUsers.append(json)
        else:
            ncUsers.append(json)

    return jsonify({
        "success": True,
        "msg": "Users fetched",
        "self": selfUser,
        "connectedUsers": cUsers,
        "notConnectedUsers": ncUsers
    })
