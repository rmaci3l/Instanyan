from flask import jsonify
from models.user import User
from models.base import Session, engine, Base
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from datetime import timedelta

User.metadata.create_all(engine)
session = Session()


def check_username(user_data):
    db_user = session.query(User).filter(User.username == user_data['username']).first()    
    if (db_user == None):
        return False
    else:
        return True

def check_mail(user_data):       
    db_user = session.query(User).filter(User.email == user_data['email']).first()
    if (db_user == None):
        return False
    else:
        return db_user

# API requests functions.
def user_data(user_id):
    db_user = session.query(User).filter(User.id == user_id).first()
    user_data = {"username" : db_user.username,
                 "email" : db_user.email,
                 }
    return jsonify(user_data)

# Log-in and register functions.
def log_user(user_data):
    user = (check_mail(user_data))
    if (user):
        if (check_password_hash(user.password, user_data['password'])):
            print(f'User {user.username} found, creating JWT session.')
            expires = timedelta(days=7)
            userToken = create_access_token(identity=user.id, expires_delta=expires)
            return jsonify(userToken=userToken), 200
        else:
            return {"message" : "Invalid password."}, 401
    else:
        return {"message" : "User not found."}, 401

def register_user(user_data):
    if (check_username(user_data) or check_mail(user_data)):
        return {"message" : "User already registered!", "redirect" : ""}, 401
    else:
        password = generate_password_hash(user_data['password'])
        new_user = User(name=user_data['name'], email=user_data['email'], username=user_data['username'], password=password)
        session.add(new_user)
        session.commit()
        session.close()
        return {"message" : "User registered successfully", "redirect" : "/login"}, 200
    