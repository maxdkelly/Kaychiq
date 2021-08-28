import json
import pytest
from server.model import *

@pytest.fixture
def client():
    from server import app, db
    
    db.session.query(TaskToUser).delete()
    db.session.query(TaskHours).delete()
    db.session.query(TaskToTag).delete()
    db.session.query(UserToUser).delete()
    db.session.query(UserMaxHours).delete()
    db.session.query(User).delete()
    db.session.query(Tag).delete()
    db.session.query(Task).delete()
    db.session.commit()
    return app.test_client()

def cancelConnection(client, token, userID):
    response = client.post(
        "/api/cancelConnectionRequest", 
        data = json.dumps({"token":token, "requested_user_id":userID}),
        content_type = 'application/json',
    )
    return json.loads(response.data.decode("UTF-8"))

def removeConnection(client, token, userID):
    response = client.post(
        "/api/removeConnection", 
        data = json.dumps({"token":token, "requested_user_id":userID}),
        content_type = 'application/json',
    )
    return json.loads(response.data.decode("UTF-8"))

def respondToRequest(client, token, userID, accept):
    response = client.post(
        "/api/respondToRequest", 
        data = json.dumps({"token":token, "requested_user_id":userID, "accept":accept}),
        content_type = 'application/json',
    )
    return json.loads(response.data.decode("UTF-8"))

def checkConnectionState(client, token, userID):
    response = client.post(
        "/api/checkConnectionState", 
        data = json.dumps({"token":token, "requested_user_id":userID}),
        content_type = 'application/json',
    )
    return json.loads(response.data.decode("UTF-8"))

def requestConnection(client, token, userID):
    response = client.post(
        "/api/requestConnection", 
        data = json.dumps({"token":token, "requested_user_id":userID}),
        content_type = 'application/json',
    )
    return json.loads(response.data.decode("UTF-8"))

def changeName(client, token, first, last):
    response = client.post(
        "/api/changeName", 
        data = json.dumps({"token":token, "firstName":first, "lastName":last}),
        content_type = 'application/json',
    )
    return json.loads(response.data.decode("UTF-8"))

def getProfile(client, token, userID):
    response = client.post(
        "/api/getUserProfile", 
        data = json.dumps({"token":token, "user_id":userID}),
        content_type = 'application/json',
    )
    return json.loads(response.data.decode("UTF-8"))

def searchUsers(client, token, msg):
    response = client.post(
        "/api/searchUsers", 
        data = json.dumps({"token":token, "searchString":msg}),
        content_type = 'application/json',
    )
    return json.loads(response.data.decode("UTF-8"))

def getTimetable(client, userid, token, startDate, endDate):
    response = client.post(
        "/api/getTimetable", 
        data = json.dumps({"user_id":userid, "token":token, "startDate":startDate, "endDate":endDate}),
        content_type = 'application/json',
    )
    return json.loads(response.data.decode("UTF-8"))

def updateTask(client, token, taskID, changes):
    response = client.post(
        "/api/updateTask", 
        data = json.dumps({"token":token, "task_id":taskID, "changes":changes}),
        content_type = 'application/json',
    )
    return json.loads(response.data.decode("UTF-8"))

def searchTaskName(client, userID, token, msg, startDate, endDate):
    response = client.post(
        "/api/searchTaskName", 
        data = json.dumps({"user_id":userID, "token":token, "taskname":msg, "startDate":startDate, "endDate":endDate}),
        content_type = 'application/json',
    )
    return json.loads(response.data.decode("UTF-8"))

def searchTaskTag(client, userID, token, msg, startDate, endDate):
    response = client.post(
        "/api/searchTaskTag", 
        data = json.dumps({"user_id":userID, "token":token, "tag":msg, "startDate":startDate, "endDate":endDate}),
        content_type = 'application/json',
    )
    return json.loads(response.data.decode("UTF-8"))

def addTask(client, token, task):
    response = client.post(
        "/api/addTask", 
        data = json.dumps({"token":token, "task":task}),
        content_type = 'application/json',
    )
    return json.loads(response.data.decode("UTF-8"))

def getTask(client, userid, token, taskID):
    response = client.post(
        "/api/getTask", 
        data = json.dumps({"token":token, "task_id":taskID, "user_id":userid}),
        content_type = 'application/json',
    )
    return json.loads(response.data.decode("UTF-8"))

def deleteTask(client, token, taskID):
    response = client.post(
        "/api/deleteTask", 
        data = json.dumps({"token":token, "task_id":taskID}),
        content_type = 'application/json',
    )
    return json.loads(response.data.decode("UTF-8"))

def signup(client, email, firstName, lastName, password):
    response = client.post(
        "/api/signup", 
        data = json.dumps({"email":email, "firstName":firstName, "lastName":lastName, "password":password}),
        content_type = 'application/json',
    )
    return json.loads(response.data.decode("UTF-8"))

def login(client, email, password):
    response = client.post(
        "/api/login", 
        data = json.dumps({"email":email, "password": password}),
        content_type = 'application/json',
    )
    return json.loads(response.data.decode("UTF-8"))

def logout(client, token):
    response = client.post(
        "/api/logout", 
        data = json.dumps({"token":token}),
        content_type = 'application/json',
    )
    return json.loads(response.data.decode("UTF-8"))
