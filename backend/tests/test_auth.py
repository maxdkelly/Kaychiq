from flask import g 
from flask import session

import os
import tempfile

import sys

from util import *

def test_successful_register(client):

    response = signup(client, "max.diamond.kelly@gmail.com", "John", "Smith", "1234")
       
    assert response['success'] == True
    assert response['msg'] == "User successfully signed up"

def test_replicated_register(client):

    signup(client, "max.diamond.kelly@gmail.com", "John", "Smith", "1234")
    response = signup(client, "max.diamond.kelly@gmail.com", "John", "Smith", "1234")

    assert response['success'] == False
    assert response['msg'] == "User with email already exists"

def test_failed_login(client):

    response = login(client,"max.diamond.kelly@gmail.com", "1234")

    assert response['success'] == False
    assert response['msg'] == "Password or Email does not match"

def test_successful_login(client):

    signup(client, "max.diamond.kelly@gmail.com", "John", "Smith", "1234")
    response = login(client,"max.diamond.kelly@gmail.com", "1234")

    assert response['success'] == True
    assert response['msg'] == "User logged in"

def test_double_login(client):

    signup(client, "max.diamond.kelly@gmail.com", "John", "Smith", "1234")
    login(client,"max.diamond.kelly@gmail.com", "1234")
    response = login(client,"max.diamond.kelly@gmail.com", "1234")

    assert response['success'] == True
    assert response['msg'] == "User already logged in"

def test_incorrect_logout(client):

    response = logout(client, "non token")

    assert response["success"] == False
    assert response["msg"] == "User does not exist for token"

def test_correct_logout(client):

    signup(client, "max.diamond.kelly@gmail.com", "John", "Smith", "1234")
    token = login(client,"max.diamond.kelly@gmail.com", "1234")['auth_token']
    response = logout(client, token)

    assert response["success"] == True
    assert response["msg"] == "User logged out"




