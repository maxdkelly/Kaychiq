from util import *
def test_searchTaskName(client):
    signup(client, "max.diamond.kelly@gmail.com", "John", "Smith", "1234")
    token = login(client,"max.diamond.kelly@gmail.com", "1234")['auth_token']

    task = {
        "taskName": "Go to school",  
        "taskDescription": "difghs ",  
        "taskTags": ["boring"], 
        "priority": "low",  
        "startDate": "15/06/2000", 
        "endDate": "16/06/2000",  
        "timetable": [
            {"date": "16/06/2000", "hours": 2},
            {"date": "15/06/2000", "hours": 6}
        ]
    }
    response = addTask(client, token, task)
    assert response["success"] == True
    task = {
        "taskName": "Leave school",  
        "taskDescription": "difghs ",  
        "taskTags": ["yeah", "fun"], 
        "priority": "high",  
        "startDate": "15/07/2000", 
        "endDate": "16/07/2000",  
        "timetable": [
            {"date": "16/07/2000", "hours": 2},
            {"date": "15/07/2000", "hours": 6}
        ]
    }
    response = addTask(client, token, task)
    assert response["success"] == True

    task1 = {
        "taskID": 1, 
        "taskName": "Go to school", 
        "taskTags": ["boring"], 
        "priority": "low",  
        "startDate": "15/06/2000", 
        "endDate": "16/06/2000",
        "timetable": [
            {"date": "15/06/2000", "hours": 6, "contributor_id":1, "contributor_name":"John Smith"},
            {"date": "16/06/2000", "hours": 2, "contributor_id":1, "contributor_name":"John Smith"}
        ]
    }
    task2 = {
        "taskID": 2, 
        "taskName": "Leave school", 
        "taskTags": ["yeah", "fun"], 
        "priority": "high",  
        "startDate": "15/07/2000", 
        "endDate": "16/07/2000",
        "timetable": [
            {"date": "15/07/2000", "hours": 6, "contributor_id":1, "contributor_name":"John Smith"},
            {"date": "16/07/2000", "hours": 2, "contributor_id":1, "contributor_name":"John Smith"}
        ]
    }
    response = searchTaskName(client, 0, token, "sc", None, None)
    assert response["success"] == True
    assert response["tasks"] == [task1, task2]

def test_searchTag(client):
    signup(client, "max.diamond.kelly@gmail.com", "John", "Smith", "1234")
    token = login(client,"max.diamond.kelly@gmail.com", "1234")['auth_token']

    task = {
        "taskName": "s",  
        "taskDescription": "difghs ",  
        "taskTags": ["yeah", "fun"], 
        "priority": "high",  
        "startDate": "15/06/2000", 
        "endDate": "16/06/2000",  
        "timetable": [
            {"date": "16/06/2000", "hours": 2},
            {"date": "15/06/2000", "hours": 6}
        ]
    }
    response = addTask(client, token, task)
    assert response["success"] == True

    task1 = {
        "taskID": 1, 
        "taskName": "s", 
        "taskTags": ["yeah", "fun"], 
        "priority": "high",  
        "startDate": "15/06/2000", 
        "endDate": "16/06/2000",
        "timetable": [
            {"date": "15/06/2000", "hours": 6, "contributor_id":1, "contributor_name":"John Smith"},
            {"date": "16/06/2000", "hours": 2, "contributor_id":1, "contributor_name":"John Smith"}
        ]
    }
    response = searchTaskTag(client, 0, token, "ea", None, None)
    assert response["success"] == True
    assert response["tasks"][0] == task1

def test_getSelfTimetable(client):
    signup(client, "max.diamond.kelly@gmail.com", "John", "Smith", "1234")
    token = login(client,"max.diamond.kelly@gmail.com", "1234")['auth_token']

    task = {
        "taskName": "s",  
        "taskDescription": "difghs ",  
        "taskTags": [], 
        "priority": "high",  
        "startDate": "15/06/2000", 
        "endDate": "16/06/2000",  
        "timetable": [
            {"date": "16/06/2000", "hours": 2},
            {"date": "15/06/2000", "hours": 6}
        ]
    }
    addTask(client, token, task)
    response = getTimetable(client, 0, token, "14/06/2000", "16/06/2000")
    task1 = {
        "taskID": 1, 
        "taskName": "s", 
        "taskTags": [], 
        "priority": "high",  
        "startDate": "15/06/2000", 
        "endDate": "16/06/2000",
        "timetable": [
            {"date": "15/06/2000", "hours": 6, "contributor_id":1, "contributor_name":"John Smith"},
            {"date": "16/06/2000", "hours": 2, "contributor_id":1, "contributor_name":"John Smith"}
        ]
    }
    assert response["success"] == True
    assert response["tasks"][0] == task1 

def test_addTask(client):
    signup(client, "max.diamond.kelly@gmail.com", "John", "Smith", "1234")
    signup(client, "2@gmail.com", "Max", "Lee", "1")
    token = login(client,"max.diamond.kelly@gmail.com", "1234")['auth_token']

    task = {
        "taskName": "s",  
        "taskDescription": "difghs ",  
        "taskTags": [], 
        "priority": "high",  
        "startDate": "15/06/2000", 
        "endDate": "16/06/2000",  
        "timetable": [
            {"date": "16/06/2000", "hours": 2},
            {"date": "15/06/2000", "hours": 6}
        ]
    }

    response = addTask(client, token, task)
    assert response["success"] == True
    assert response["taskID"] == 1 

def test_getTask(client):
    signup(client, "max.diamond.kelly@gmail.com", "John", "Smith", "1234")
    signup(client, "2@gmail.com", "Max", "Lee", "1")
    token = login(client,"max.diamond.kelly@gmail.com", "1234")['auth_token']

    task = {
        "taskName": "s",  
        "taskDescription": "difghs ",  
        "taskTags": [], 
        "priority": "high",  
        "startDate": "15/06/2000", 
        "endDate": "16/06/2000",  
        "timetable": [
            {"date": "16/06/2000", "hours": 2}
        ]
    }
    taskID = addTask(client, token, task)["taskID"]
    task1 = {
        "taskID": 1,
        "owner": {
            "user_id":1,
            "name": "John Smith"
        },
        "isEditable":True,
        "taskName": "s",  
        "taskDescription": "difghs ",  
        "taskTags": [], 
        "priority": "high",  
        "startDate": "15/06/2000", 
        "endDate": "16/06/2000",  
        "timetable": [
            {"date": "16/06/2000", "hours": 2, "contributor_id": 1, "contributor_name": "John Smith"},
        ]
    }
    response = getTask(client, 0, token, taskID)
    assert response["success"] == True
    assert response["task"] == task1

def test_deleteTask(client):
    signup(client, "max.diamond.kelly@gmail.com", "John", "Smith", "1234")
    signup(client, "2@gmail.com", "Max", "Lee", "1")
    token = login(client,"max.diamond.kelly@gmail.com", "1234")['auth_token']

    task = {
        "taskName": "s",  
        "taskDescription": "difghs ",  
        "taskTags": [], 
        "priority": "high",  
        "startDate": "15/06/2000", 
        "endDate": "16/06/2000",  
        "timetable": [
            {"date": "16/06/2000", "hours": 2},
            {"date": "15/06/2000", "hours": 6}
        ]
    }

    taskID = addTask(client, token, task)["taskID"]
    response = deleteTask(client, token, taskID)
    assert response["success"] == True  

    response = getTimetable(client, 0, token, "14/06/2000", "16/06/2000")
    assert response["success"] == True  
    assert response["tasks"] == []

def test_updateTask(client):
    signup(client, "max.diamond.kelly@gmail.com", "John", "Smith", "1234")
    signup(client, "2@gmail.com", "Max", "Lee", "1")
    token = login(client,"max.diamond.kelly@gmail.com", "1234")['auth_token']

    task = {
        "taskName": "s",  
        "taskDescription": "difghs ",  
        "taskTags": [], 
        "priority": "high",  
        "startDate": "15/06/2000", 
        "endDate": "16/06/2000",  
        "timetable": [
            {"date": "16/06/2000", "hours": 2},
            {"date": "15/06/2000", "hours": 6}
        ]
    }

    taskID = addTask(client, token, task)["taskID"]
    changes = {
        "taskName": "difference",  
        "description": "difgh ",  
        "taskTags": ["yeah"], 
        "priority": "high",  
        "startDate": "15/06/2000", 
        "endDate": "16/06/2000",  
        "completionDate": "17/7/2021",                
        "timetable":[
            {"date": "16/06/2000", "hours": 6, "contributor_id": 2},
            {"date": "15/06/2000", "hours": 6, "contributor_id": 1}
        ]
    }
    response = updateTask(client, token, taskID, changes)
    assert response["success"] == True  

    task1 = {
        "taskID": 1,
        "isEditable":True,
        "owner": {
            "user_id":1,
            "name": "John Smith"
        },
        "taskName": "difference",  
        "taskDescription": "difgh ",  
        "taskTags": ["yeah"], 
        "priority": "high",  
        "startDate": "15/06/2000", 
        "endDate": "16/06/2000",  
        "timetable": [
            {"date": "15/06/2000", "hours": 6, "contributor_id": 1, "contributor_name": "John Smith"},
            {"date": "16/06/2000", "hours": 6, "contributor_id": 2, "contributor_name": "Max Lee"}
        ]
    }
    response = getTask(client, 0, token, taskID)
    assert response["success"] == True  
    assert response["task"] == task1