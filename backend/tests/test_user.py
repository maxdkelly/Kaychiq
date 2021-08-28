from util import *
def test_searchUser(client):
    signup(client, "max.diamond.kelly@gmail.com", "John", "Smith", "1234")
    signup(client, "2@gmail.com", "Max", "Lee", "1")
    token = login(client,"max.diamond.kelly@gmail.com", "1234")['auth_token']
    response = searchUsers(client, token, "max")

    assert response["success"] == True
    assert response["connectedUsers"] == []
    assert response["notConnectedUsers"] == [{"id":2, "firstName":"Max", "lastName":"Lee"}]
    assert response["self"] == None

def test_getProfile(client):
    signup(client, "max.diamond.kelly@gmail.com", "John", "Smith", "1234")
    signup(client, "2@gmail.com", "Max", "Lee", "1")
    token = login(client,"max.diamond.kelly@gmail.com", "1234")['auth_token']

    response = getProfile(client, token, 2)
    assert response["success"] == True
    assert response["profile"] == {"user_id":2, "firstName": "Max", "lastName":"Lee", "email":"2@gmail.com"}

def test_changeName(client):
    signup(client, "max.diamond.kelly@gmail.com", "John", "Smith", "1234")
    token = login(client,"max.diamond.kelly@gmail.com", "1234")['auth_token']

    response = changeName(client, token, "Max", "Lee")
    assert response["success"] == True

    response = getProfile(client, token, 1)
    assert response["success"] == True
    assert response["profile"] == {"user_id":1, "firstName": "Max", "lastName":"Lee", "email":"max.diamond.kelly@gmail.com"}

def test_checkConnectionState(client):
    signup(client, "1@gmail.com", "John", "Smith", "1234")
    signup(client, "2@gmail.com", "John", "Smith", "1234")
    signup(client, "3@gmail.com", "John", "Smith", "1234")
    token = login(client,"1@gmail.com", "1234")['auth_token']
    token2 = login(client,"2@gmail.com", "1234")['auth_token']
    token3 = login(client,"3@gmail.com", "1234")['auth_token']

    # not connected
    response = checkConnectionState(client, token, 2)
    assert response["msg"] == 0

    # Pending(User is trying to add requested user)
    response = requestConnection(client, token, 2)
    assert response["success"] == True
    response = checkConnectionState(client, token, 2)
    assert response["msg"] == 2

    #Connected
    response = respondToRequest(client, token2, 1, True)
    assert response["success"] == True
    response = checkConnectionState(client, token, 2)
    assert response["msg"] == 1

    # Pending(Requested user is trying to add user)
    response = requestConnection(client, token3, 1)
    assert response["success"] == True
    response = checkConnectionState(client, token, 3)
    assert response["msg"] == 3

def test_removeConnection(client):
    signup(client, "1@gmail.com", "John", "Smith", "1234")
    signup(client, "2@gmail.com", "John", "Smith", "1234")
    signup(client, "3@gmail.com", "John", "Smith", "1234")
    token = login(client,"1@gmail.com", "1234")['auth_token']
    token2 = login(client,"2@gmail.com", "1234")['auth_token']
    token3 = login(client,"3@gmail.com", "1234")['auth_token']

    # Connected
    response = requestConnection(client, token, 2)
    assert response["success"] == True
    response = respondToRequest(client, token2, 1, True)
    assert response["success"] == True

    #Remove
    response = removeConnection(client, token, 2)
    assert response["success"] == True

    #Check state
    response = checkConnectionState(client, token2, 1)
    assert response["msg"] == 0
    response = checkConnectionState(client, token, 2)
    assert response["msg"] == 0

def test_cancelConnection(client):
    signup(client, "1@gmail.com", "John", "Smith", "1234")
    signup(client, "2@gmail.com", "John", "Smith", "1234")
    signup(client, "3@gmail.com", "John", "Smith", "1234")
    token = login(client,"1@gmail.com", "1234")['auth_token']
    token2 = login(client,"2@gmail.com", "1234")['auth_token']
    token3 = login(client,"3@gmail.com", "1234")['auth_token']

    # Request
    response = requestConnection(client, token, 2)
    assert response["success"] == True

    #Check state
    response = checkConnectionState(client, token2, 1)
    assert response["msg"] == 3
    response = checkConnectionState(client, token, 2)
    assert response["msg"] == 2

    # Cancel request
    response = cancelConnection(client, token, 2)
    assert response["success"] == True

    #Check state
    response = checkConnectionState(client, token2, 1)
    assert response["msg"] == 0
    response = checkConnectionState(client, token, 2)
    assert response["msg"] == 0