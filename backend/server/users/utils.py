from server import db, app
from server.model import *
import os
import io
import base64
from PIL import Image

def get_relationship(user_id1, user_id2):
    result = UserToUser.query.get((user_id1, user_id2)) 
    if result is not None:
        return result

    result = UserToUser.query.get((user_id2, user_id1)) 
    if result is not None:
        return result
        
    return result

def get_profile_json(data):
    return {    
        "user_id": data.id,
        "firstName": data.firstName,
        "lastName": data.lastName,
        "email": data.email 
    }

def get_response_image(image_filename):
    image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_filename)
    encoded_string = ""
    with open(image_path, "rb") as image_file:
        encoded_img = base64.b64encode(image_file.read())
    return encoded_img

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in app.config["ALLOWED_EXTENSIONS"]

