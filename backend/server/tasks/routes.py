from flask import jsonify, Blueprint, request
from datetime import date, datetime
from server import db
from server.model import *
from server.users.utils import get_relationship
from server.tasks.utils import *
import enum
from werkzeug.utils import secure_filename
import base64

tasks = Blueprint('tasks', __name__)

@tasks.route("/api/getTimetable", methods=['POST'])
def get_timetable():
    content = request.json
    if "user_id" not in content or "token" not in content or "startDate" not in content or "endDate" not in content:
        return jsonify({
            "success": False,
            "msg":"Malformed information",
            "tasks": None
        })

    token = content['token']
    user = User.query.filter_by(auth_token = token).first()
    if user is None: 
        return jsonify({
            "success":False,
            "msg":"Invalid Authentication.",
            "tasks": None
        })
    
    #Logic for friend or not
    userId = content['user_id']
    rel = get_relationship(userId, user.id)
    if userId == 0 or userId == user.id:
        userId = user.id
    elif rel is None or not rel.accepted:
        return jsonify({
            "success":False,
            "msg":"Can not view unconnected user's timetable",
            "tasks": None
        })

    #Get user timetable
    query = taskView(userId)

    #Get the dates
    endDate = content['endDate']
    startDate = content['startDate']
    #Check date
    if startDate is not None and endDate is not None:
        query = query.filter(
                Task.startDate<=getDate(endDate)
            ).filter(
                Task.endDate>=getDate(startDate)
            )
    elif startDate is not None:
        query = query.filter(Task.startDate>=getDate(startDate))
    elif endDate is not None:
        query = query.filter(Task.endDate<=getDate(endDate))

    tasks = []
    for data in query:
        tasks.append(simpleTaskJson(data))

    return jsonify({
        "success":True,
        "msg":"Tasks have been acquired",
        "tasks":tasks
    })

@tasks.route("/api/getSortedTimetable", methods=['POST'])
def get_sorted_timetable():
    content = request.json

    print(content)
    if "user_id" not in content or "token" not in content or "startDate" not in content or "endDate" not in content:
        return jsonify({
            "success": False,
            "msg":"Malformed information",
            "tasks": None
        })

    print(content)
    token = content['token']
    user = User.query.filter_by(auth_token = token).first()
    if user is None: 
        return jsonify({
            "success":False,
            "msg":"Invalid Authentication.",
            "tasks": None
        })
    
    #Logic for friend or not
    userId = content['user_id']
    print(userId)

    rel = get_relationship(userId, user.id)
    if userId == 0 or userId == user.id:
        userId = user.id
    elif rel is None or not rel.accepted:
        return jsonify({
            "success":False,
            "msg":"Can not view unconnected user's timetable",
            "tasks": None
        })

    #Get user timetable
    print(userId)
    query = taskView(userId)

    #Get the dates
    endDate = content['endDate']
    startDate = content['startDate']
    #Check date
    if startDate is not None and endDate is not None:
        query = query.filter(
                Task.startDate<=getDate(endDate)
            ).filter(
                Task.endDate>=getDate(startDate)
            )
    elif startDate is not None:
        query = query.filter(Task.startDate>=getDate(startDate))
    elif endDate is not None:
        query = query.filter(Task.endDate<=getDate(endDate))

    # print(query)
    tasks = []
    for data in query:
        tasks.append(simpleTaskJson(data))

    if content['sortKey'] == 'startDate':
        tasks = sorted(tasks, key=lambda k: getDate(k[content['sortKey']]))
    elif content['sortKey'] == 'priority':
        tasks = sorted(tasks, key=lambda k: mapPriority(k[content['sortKey']]))
    else:
        tasks = sorted(tasks, key=lambda k: k[content['sortKey']])

    return jsonify({
        "success":True,
        "msg":"Tasks have been acquired",
        "tasks":tasks
    })

@tasks.route("/api/searchTaskName", methods=['POST'])
def search_task_name():
    content = request.json

    print(content)
    if "user_id" not in content or "token" not in content or "taskname" not in content or "startDate" not in content or "endDate" not in content:
        return jsonify({
            "success": False,
            "msg":"Malformed information"
        })

    token = content['token']
    user = User.query.filter_by(auth_token = token).first()

    
    if user is None:
        return jsonify({
            "success":False,
            "msg":"Invalid Authentication."
        })

    #Logic for friend or not
    userId = content['user_id']
    rel = get_relationship(userId, user.id)

    print("rel",rel)
    if userId == 0 or userId == user.id:
        userId = user.id
    elif rel is None or not rel.accepted:
        return jsonify({
            "success":False,
            "msg":"Can not view unconnected user's timetable",
            "tasks": None
        })

    taskname = content['taskname']
    tasks = []

    print(user.id)
    query = taskView(userId).filter(Task.title.like(f'%{taskname}%'))

    #Get the dates
    endDate = content['endDate']
    startDate = content['startDate']
    #Check date
    if startDate is not None and endDate is not None:
        query = query.filter(
                Task.startDate<=getDate(endDate)
            ).filter(
                Task.endDate>=getDate(startDate)
            )
    elif startDate is not None:
        query = query.filter(Task.startDate>=getDate(startDate))
    elif endDate is not None:
        query = query.filter(Task.endDate<=getDate(endDate))
        
    for data in query:
        tasks.append(simpleTaskJson(data))

    print(tasks)
    return jsonify({
        "success":True,
        "msg":"Tasks have been acquired",
        "tasks":tasks
    })

@tasks.route("/api/getTags", methods=['POST'])
def get_tags():
    content = request.json 

    if "token" not in content:
        return jsonify({
            "success": False,
            "msg":"Malformed information",
            "tags": None
        })

    token = content['token']
    user = User.query.filter_by(auth_token = token).first()
    if user is None:
        return jsonify({
            "success":False,
            "msg":"Invalid Authentication."
        })

    query = taskView(user.id)

    tags = []
    for data in query:
        if data.tags:        
           tags += data.tags.split(",")

    return jsonify({
        "success":True,
        "msg":"Tags have been acquired",
        "tags":list(set(tags))
    })

@tasks.route("/api/searchTaskTag", methods=['POST'])
def search_task_tag():
    content = request.json
    if "user_id" not in content or "token" not in content or "tag" not in content or "startDate" not in content or "endDate" not in content:
        return jsonify({
            "success": False,
            "msg":"Malformed information"
        })

    token = content['token']
    user = User.query.filter_by(auth_token = token).first()
    if user is None:
        return jsonify({
            "success":False,
            "msg":"Invalid Authentication."
        })

    #Logic for friend or not
    userId = content['user_id']
    rel = get_relationship(userId, user.id)
    if userId == 0 or userId == user.id:
        userId = user.id
    elif rel is None or not rel.accepted:
        return jsonify({
            "success":False,
            "msg":"Can not view unconnected user's timetable",
            "tasks": None
        })

    tag = content['tag']
    tasks = []
    subquery = db.session.query(Task).distinct(Task.id
        ).join(
            TaskToTag, Task.id==TaskToTag.taskID
        ).join(
            Tag, Tag.id==TaskToTag.tagID
        ).filter(
            Tag.name.like(f'%{tag}%')
        ).subquery()
    query = taskView(userId).filter(Task.id == subquery.c.id)
    
    #Get the dates
    endDate = content['endDate']
    startDate = content['startDate']
    #Check date
    if startDate is not None and endDate is not None:
        query = query.filter(
                Task.startDate<=getDate(endDate)
            ).filter(
                Task.endDate>=getDate(startDate)
            )
    elif startDate is not None:
        query = query.filter(Task.startDate>=getDate(startDate))
    elif endDate is not None:
        query = query.filter(Task.endDate<=getDate(endDate))

    for data in query:
        tasks.append(simpleTaskJson(data))

    return jsonify({
        "success":True,
        "msg":"Tasks have been acquired",
        "tasks":tasks
    })


@tasks.route("/api/getMaxHours",methods=['POST'])
def get_max_hours():
    content = request.json 
    if "token" not in content:
        return jsonify({
            "success": False,
            "msg":"Malformed information"
        })

    token = content['token']
    user = User.query.filter_by(auth_token = token).first()
    user = UserMaxHours.query.filter_by(UserID=user.id).first()

    if not bool(user):
        return jsonify({
            "success":False,
            "msg":"invalid authentication",
            "maxHours": None
        })

    return jsonify({
            "success":True,
            "msg":"max hours acquired",
            "maxHours": user.MaxHours
        })

@tasks.route("/api/getMaxHoursUID",methods=['POST'])
def get_max_hours_uid():
    content = request.json 
    if "user_id" not in content or "token" not in content:
        return jsonify({
            "success": False,
            "msg":"Malformed information"
        })

    if content['user_id'] == 0:
        token = content['token']
        user = User.query.filter_by(auth_token = token).first()
        user = UserMaxHours.query.filter_by(UserID=user.id).first()
    else:
        user = UserMaxHours.query.filter_by(UserID=content['user_id']).first()

    print("ID:",user.UserID)
    if not bool(user):
        return jsonify({
            "success":False,
            "msg":"invalid authentication",
            "maxHours": None
        })

    return jsonify({
            "success":True,
            "msg":"max hours acquired",
            "maxHours": user.MaxHours
        })

@tasks.route("/api/changeMaxHours",methods=['POST'])
def change_max_hours():
    content = request.json 
    if "token" not in content or "max_hours" not in content:
        return jsonify({
            "success": False,
            "msg":"Malformed information"
        })

    # find user
    token = content['token']
    user = User.query.filter_by(auth_token = token).first()

    uid = user.id
    user = UserMaxHours.query.filter_by(UserID=uid).first()
    if not bool(user):
        return jsonify({
            "success":False,
            "msg":"invalid authentication"
        })

    max_hours = int(content['max_hours'])

    if max_hours < 0 or max_hours > 24:
        return jsonify({
            "success": False,
            "msg":"Malformed information"
        })

    user = UserMaxHours.query.filter_by(UserID=uid).delete()

    userMaxHours = UserMaxHours(UserID = uid, MaxHours = max_hours)
    db.session.add(userMaxHours)
    db.session.commit()
    return jsonify({
            "success":True,
            "msg":"max hours changed"
        })

@tasks.route("/api/getTask",methods=['POST'])
def get_task():
    content = request.json 
    if "user_id" not in content or "token" not in content or "task_id" not in content:
        return jsonify({
            "success": False,
            "msg":"Malformed information"
        })

    # find user
    user = User.query.filter_by(auth_token=content['token']).first()
    if not bool(user):
        return jsonify({
            "success":False,
            "msg":"invalid authentication",
            "task": None
        })
    
    # check if task exists
    task = Task.query.filter_by(id=content['task_id']).first()
    if not bool(task):
        return jsonify({
            "success":False,
            "msg":"Cannot find task",
            "task": None
        })

    userID = content["user_id"]
    
    if userID == 0:
        userID = user.id
  
    rel = TaskToUser.query.get((content['task_id'], user.id))
    owner = True
    if not rel:
        owner = False
    return jsonify({
            "success":True,
            "msg":"task acquired",
            "task": getDBTask(task, owner, user.id)
        })

@tasks.route("/api/updateTask",methods=['POST'])
def update_task():
    content = request.json 
    if "token" not in content or "task_id" not in content or "changes" not in content:
        return jsonify({
            "success": False,
            "msg":"Malformed information"
        })

    # find user
    user = User.query.filter_by(auth_token=content['token']).first()
    if not bool(user):
        return jsonify({
            "success":False,
            "msg":"invalid authentication"
        })
    
    # find task
    task = Task.query.filter_by(id=content['task_id']).first()
    if not bool(task):
        return jsonify({
            "success":False,
            "msg":"task not found"
        })

    #Check if task is related to User 
    rel = TaskToUser.query.get((content['task_id'], user.id))
    if rel is None or not rel.isOwner:
        return jsonify({
            "success":False,
            "msg":"User does not have permissions to update task"
        })
    
    #Logic for changes
    changes = content['changes']
    if "taskName" in changes:
        task.title = changes["taskName"]
    if "description" in changes:
        task.description = changes["description"]
    if "startDate" in changes:
        task.startDate = getDate(changes["startDate"])
    if "endDate" in changes:
        task.endDate = getDate(changes["endDate"])
    if "priority" in changes:
        task.priority = changes["priority"]
    if "completionDate" in changes:
        cDate = changes["completionDate"]
        task.completionDate = getDate(cDate) if cDate is not None else None
    if "timetable" in changes:
        timetable = changes["timetable"]

        # delete all contributors & their hours from db
        for contributor in TaskToUser.query.filter_by(taskID=task.id).all():
            if not contributor.isOwner: 
                TaskToUser.query.filter_by(taskID=task.id, userID = contributor.userID).delete()
            TaskHours.query.filter_by(taskID=task.id, userID = contributor.userID).delete() 
        db.session.commit()

        # Add new contributors & their hours into db
        for timeset in timetable:
            day = timeset["date"]
            hours = timeset["hours"]
            cid = timeset["contributor_id"]
            if User.query.get(cid) is None:
                return jsonify({
                    "success":False,
                    "msg":"Invalid contributor id"
                })
            # Link tasks to new contributors
            if TaskToUser.query.get((task.id, cid)) is None:
                db.session.add(TaskToUser(taskID=task.id, userID=cid, isOwner=False))
            # Set hours for new contributors 
            db.session.add(TaskHours(taskID=task.id, userID=cid, date=getDate(day), hours=hours))

    if "taskTags" in changes:
        # find the tags the task has in the db
        db_tag = db.session.query(
                                TaskToTag, Tag.name
                            ).join(
                                Tag
                            ).filter(
                                TaskToTag.taskID==content['task_id'])
        db_tag_names = [ tag[1] for tag in db_tag]          

        # delete tasks which are not supposed to be associated with the task according to request
        for tag in db_tag:
            print(tag)
            if not (tag[1] in changes["taskTags"]):
                TaskToTag.query.filter_by(taskID=task.id, tagID=tag[0].tagID).delete()
        db.session.commit()
        # Add new tags to task
        for tag in changes["taskTags"]:
            print(tag)
            # check if task already has the tags
            if not(tag in db_tag_names):
                new_tag = Tag.query.filter_by(name=tag).first()
                # check if new tag to be added to task exists, if not make a new one
                if not bool(new_tag):
                    new_tag = Tag(name=tag)
                    db.session.add(new_tag)
                    db.session.commit()
                # add the new tag to task
                new_task_to_tag = TaskToTag(taskID=task.id, tagID=new_tag.id)
                db.session.add(new_task_to_tag)    
    db.session.commit()

    return jsonify({
            "success":True,
            "msg":"Task has been updated"
        })

@tasks.route("/api/deleteTask",methods=['POST'])
def delete_task():
    content = request.json 

    # find user
    user = User.query.filter_by(auth_token=content['token']).first()
    if not bool(user):
        return jsonify({
            "success":False,
            "msg":"invalid authentication"
        })

    # get task
    task = Task.query.filter_by(id=content['task_id']).first()
    if not bool(task):
        return jsonify({
            "success":False,
            "msg":"No task found"
        })

    #Check if task is related to User 
    rel = TaskToUser.query.get((content['task_id'], user.id))
    if rel is None or not rel.isOwner:
        return jsonify({
            "success":False,
            "msg":"User does not have permissions to delete task"
        })

    # delete stuff related to task
    TaskToTag.query.filter_by(taskID=task.id).delete()
    TaskHours.query.filter_by(taskID=task.id).delete()
    TaskToUser.query.filter_by(taskID=task.id).delete()
    Task.query.filter_by(id=content['task_id']).delete()
    db.session.commit()

    return jsonify({
            "success":True,
            "msg":"task deleted"
        })

@tasks.route("/api/addTask",methods=['POST'])
def add_task():
    content = request.json 

    if "token" not in content:
        return jsonify({
        "success": False,
        "msg":"Malformed user information", 
        "taskID":None

    })
    print(content)
    # get information from request
    token = content['token']
    task = content['task']
    tags = task['taskTags']
    timetable = task['timetable']

    # find user
    user = User.query.filter_by(auth_token=content['token']).first()
    if not bool(user):
        return jsonify({
            "success":False,
            "msg":"invalid authentication",
            "taskID": None
        })

    # create task in db
    taskORM = Task(title=task['taskName'], description=task['taskDescription'], startDate=getDate(task['startDate']), endDate=getDate(task['endDate']), priority=task['priority'], completionDate=None)
    db.session.add(taskORM)
    db.session.commit()

    # link task to user
    db.session.add(TaskToUser(taskID=taskORM.id, userID=user.id, isOwner=True))

    # Setting up timetable
    for timeset in timetable:
        day = timeset["date"]
        hours = timeset["hours"]
        # Set hours for new contributors 
        db.session.add(TaskHours(taskID=taskORM.id, userID=user.id, date=getDate(day), hours=hours))
    db.session.commit()

    # loop through tags and if it doesnt exist already add it to db
    for tag in tags:
        db_tag = Tag.query.filter_by(name=tag).first()
        if not bool(db_tag):
            db_tag = Tag(name=tag)
            db.session.add(db_tag)
    db.session.commit()

    # links tags to task
    for tag in tags:
        db_tag = Tag.query.filter_by(name=tag).first()
        task_to_tag = TaskToTag(taskID=taskORM.id, tagID = db_tag.id)
        db.session.add(task_to_tag)
    db.session.commit()

    print(task)
    return jsonify({
            "success":True,
            "msg":task,
            "taskID": taskORM.id
        })

@tasks.route("/api/getContributors",methods=['POST'])
def get_contributors():
    content = request.json 

    if "token" not in content or "task_id" not in content:
        return jsonify({
            "success": False,
            "msg":"Malformed user information", 
            "contributors": None
        })

    token = content['token']
    # find user
    user = User.query.filter_by(auth_token=content['token']).first()
    if not bool(user):
        return jsonify({
            "success":False,
            "msg":"invalid authentication",
            "contributors": None
        })

    contributors = []
    taskID = content['task_id']
    #Get task
    for task in TaskToUser.query.filter_by(taskID=taskID):
        user = User.query.get(task.userID)
        contributor = {"user_id": task.userID, "name": user.firstName+" "+user.lastName}
        contributors.append(contributor)

    return jsonify({
        "success":True,
        "msg":"All contributors returned",
        "contributors": contributors
    })