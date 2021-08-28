#### Credentials ####
####     Email         Password     Name
#### test1@gmail.com     1234     Monkey Kong
#### test2@gmail.com     1234     Monkey Long
#### test3@gmail.com     1234     Monkey Tong
import requests
import sys 
import os

port = int(sys.argv[1])

requests.post(f'http://localhost:{port}/api/signup', json={"email":"test1@gmail.com", "firstName":"Monkey", "lastName":"Kong", "password":"1234"})
requests.post(f'http://localhost:{port}/api/signup', json={"email":"test2@gmail.com", "firstName":"Monkey", "lastName":"Long", "password":"1234"})
requests.post(f'http://localhost:{port}/api/signup', json={"email":"test3@gmail.com", "firstName":"Monkey", "lastName":"Tong", "password":"1234"})

for num in range(1,4):
    r = requests.post(f'http://localhost:{port}/api/login', json={"email":f"test{num}@gmail.com", "password":"1234"})
    auth_token = r.json()['auth_token']
    
    # insert image
    path = os.getcwd()+"/tests/Monkeys/"+str(num)+".jpg"
    with open(path, 'rb') as img:
        files = {"file":img}
        data = {"token":auth_token}
        r = requests.post(f'http://localhost:{port}/api/uploadProfileImage',data=data, files=files)

    # insert tasks
    task_obj = { 
        "token": auth_token,
        "task" : {
            "taskName": "Clean",  
            "taskDescription": "test description",  
            "taskTags": ["boring"], 
            "priority": "high",  
            "startDate": "15/06/2000", 
            "endDate": "16/06/2000",  
            "timetable":[
                {"date": "16/06/2000", "hours": 2},
                {"date": "15/06/2000", "hours": 6}
            ]
        }
    }
    r = requests.post(f'http://localhost:{port}/api/addTask', json=task_obj)

    task_obj = { 
        "token": auth_token,
        "task" : {
            "taskName": "Work",  
            "taskDescription": "test description",  
            "taskTags": ["fun"], 
            "priority": "low",  
            "startDate": "2/08/2021", 
            "endDate": "3/08/2021",  
            "timetable":[
                {"date": "2/08/2021", "hours": 2},
                {"date": "3/08/2021", "hours": 6}
            ]
        }
    }
    r = requests.post(f'http://localhost:{port}/api/addTask', json=task_obj)

    task_obj = { 
        "token": auth_token,
        "task" : {
            "taskName": "Go to School",  
            "taskDescription": "test description",  
            "taskTags": ["boring"], 
            "priority": "high",  
            "startDate": "3/08/2021", 
            "endDate": "6/08/2021",  
            "timetable":[
                {"date": "3/08/2021", "hours": 2},
                {"date": "4/08/2021", "hours": 2},
                {"date": "5/08/2021", "hours": 2},
                {"date": "6/08/2021", "hours": 6}
            ]
        }
    }
    r = requests.post(f'http://localhost:{port}/api/addTask', json=task_obj)

    task_obj = { 
        "token": auth_token,
        "task" : {
            "taskName": "Eat banana",  
            "taskDescription": "test description",  
            "taskTags": ["fun"], 
            "priority": "high",  
            "startDate": "29/07/2021", 
            "endDate": "31/07/2021",  
            "timetable":[
                {"date": "29/07/2021", "hours": 2},
                {"date": "30/07/2021", "hours": 2},
                {"date": "31/07/2021", "hours": 6}
            ]
        }
    }
    r = requests.post(f'http://localhost:{port}/api/addTask', json=task_obj)
    requests.post(f'http://localhost:{port}/api/logout', json={"token":auth_token})

requests.post(f'http://localhost:{port}/api/signup', json={"email":"godzilla@gmail.com", "firstName":"God", "lastName":"Zilla", "password":"1234"})

r = requests.post(f'http://localhost:{port}/api/login', json={"email":"godzilla@gmail.com", "password":"1234"})
auth_token = r.json()['auth_token']

# insert image
path = os.getcwd()+"/tests/Lizards/godzilla.jpg"
with open(path, 'rb') as img:
    files = {"file":img}
    data = {"token":auth_token}
    r = requests.post(f'http://localhost:{port}/api/uploadProfileImage',data=data, files=files)

task_obj = { 
        "token": auth_token,
        "task" : {
            "taskName": "Kill Monke",  
            "taskDescription": "This task is a reminder for me to kill monke",  
            "taskTags": ["kill","monke"], 
            "priority": "high",  
            "startDate": "02/08/2021", 
            "endDate": "04/08/2021",  
            "timetable":[
                {"date": "02/08/2021", "hours": 2},
                {"date": "03/08/2021", "hours": 3},
                {"date": "04/08/2021", "hours": 4}
            ]
        }
    }
r = requests.post(f'http://localhost:{port}/api/addTask', json=task_obj)


task_obj = { 
        "token": auth_token,
        "task" : {
            "taskName": "Take out the trash",  
            "taskDescription": "Task is pretty obvious from the title",  
            "taskTags": ["boring"], 
            "priority": "low",  
            "startDate": "04/08/2021", 
            "endDate": "08/08/2021",  
            "timetable":[
                {"date": "04/08/2021", "hours": 2},
                {"date": "05/08/2021", "hours": 3},
                {"date": "06/08/2021", "hours": 4},
                {"date": "07/08/2021", "hours": 4},
                {"date": "08/08/2021", "hours": 4}
            ]
        }
    }


r = requests.post(f'http://localhost:{port}/api/addTask', json=task_obj)
