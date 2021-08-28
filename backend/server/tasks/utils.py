from server import db
from server.model import *
from sqlalchemy import func
from datetime import date
import server
import os
import io
import base64
from PIL import Image

def taskView(userId):
    return db.session.query(
            TaskToUser, Task.id, Task.title, Task.priority, Task.startDate, Task.endDate, func.group_concat(Tag.name).label("tags")
            ).filter(
                TaskToUser.userID == userId
            ).join(
                Task, Task.id==TaskToUser.taskID
            ).outerjoin(
                TaskToTag, TaskToTag.taskID==Task.id
            ).outerjoin(
                Tag, TaskToTag.tagID==Tag.id
            ).group_by(Task.id)

def simpleTaskJson(data):
    # construct the timetable
    timetable = []
    for contributor in TaskToUser.query.filter_by(taskID=data.id).distinct().all():
        user = User.query.get(contributor.userID)
        name = user.firstName + ' ' + user.lastName
        for hours in TaskHours.query.filter_by(taskID=data.id, userID=contributor.userID).all():
            json = {"date": hours.date.strftime("%d/%m/%Y"), "hours":hours.hours, "contributor_id": contributor.userID, "contributor_name":name}
            timetable.append(json)

    return {
        "taskID": data.id,
        "taskName": data.title,
        "taskTags": [] if data.tags is None else data.tags.split(","),
        "startDate": data.startDate.strftime("%d/%m/%Y"),
        "endDate": data.endDate.strftime("%d/%m/%Y"),
        "priority": data.priority,
        "timetable":timetable
    }

def getDate(stringDate):
    split_date = stringDate.split("/")
    return date(int(split_date[2]),int(split_date[1]),int(split_date[0]))

def mapPriority(priorStr):
    print(priorStr)
    if priorStr == 'Critical':
        return 1
    if priorStr == 'High':
        return 2
    if priorStr == 'Medium':
        return 3
    if priorStr == 'Low':
        return 4
    if priorStr == 'Very Low':
        return 5

    return 6

def getDBTask(task, isOwner, userID):

    # Create list of tags
    tagIDs = TaskToTag.query.filter_by(taskID=task.id).all()
    tags = []
    for tag in tagIDs:
        db_tag = Tag.query.filter_by(id=tag.tagID).first()
        tags.append(db_tag.name)

    ownerID = 0
    ownerName = ""
    # construct the timetable
    timetable = []
    for contributor in TaskToUser.query.filter_by(taskID=task.id).distinct().all():
        user = User.query.get(contributor.userID)
        name = user.firstName + ' ' + user.lastName
        if contributor.isOwner:
            ownerID = contributor.userID
            ownerName = name
        for hours in TaskHours.query.filter_by(taskID=task.id, userID=contributor.userID).all():
            json = {"date": hours.date.strftime("%d/%m/%Y"), "hours":hours.hours, "contributor_id": contributor.userID, "contributor_name":name}
            timetable.append(json)
    
    # Create the response
    return {
        "taskID": task.id,
        "owner":{
            "user_id":ownerID,
            "name": ownerName
        },
        "taskName": task.title,  
        "taskDescription": task.description,  
        "taskTags": tags, 
        "priority": task.priority,  
        "startDate": task.startDate.strftime("%d/%m/%Y"), 
        "endDate": task.endDate.strftime("%d/%m/%Y"),  
        "isEditable": isOwner,
        "timetable": timetable
    }
