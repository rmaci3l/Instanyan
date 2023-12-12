from flask import jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from utils.db import check_mail, check_username, add_user
from datetime import timedelta

# Auth functions
# Log-in and register functions.
def log_user(user_data):
    user = (check_mail(user_data))
    if (user):
        if (check_password_hash(user.password, user_data['password'])):
            print(f'User {user.username} found, creating JWT session.')
            expires = timedelta(days=7)
            userToken = create_access_token(identity=user.id, expires_delta=expires)
            user_data = {"username" : user.username,"email" : user.email}
            return jsonify(userToken=userToken, userInfo=user_data), 200
        else:
            return {"message" : "Invalid password."}, 401
    else:
        return {"message" : "User not found."}, 401

def register_user(user_data):
    if (check_username(user_data) or check_mail(user_data)):
        return {"message" : "User already registered!", "redirect" : ""}, 401
    else:
        password = generate_password_hash(user_data['password'])        
        if (add_user(user_data=user_data, hash_pwd=password)):
            return {"message" : "User registered successfully", "redirect" : "/login"}, 200
        else:
            return{"message" : "Error accessing database."}, 400
        
    