from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from utils.db import check_mail, check_username, add_user
from utils.api import user_data
from datetime import timedelta

# Auth functions
# Log-in and register functions.
def log_user(user_info):
    user = (check_mail(user_info))
    if (user):
        if (check_password_hash(user.password, user_info['password'])):
            print(f'User {user.username} found, creating JWT session.')
            expires = timedelta(days=7)
            userToken = create_access_token(identity=user.id, expires_delta=expires)
            user_info = user_data(user.id)
            return {'userToken' : userToken, 'userInfo' : user_info, 'status' : 200}
        else:
            return { 'message' : "Invalid password.", 'status': 401}
    else:
        return { 'message' : "User not found.", 'status' : 404}

def register_user(user_info):
    if (check_username(user_info) or check_mail(user_info)):
        return { 'message' : "User already registered!", 'status': 409}
    else:
        password = generate_password_hash(user_info['password'])        
        if (add_user(user_data=user_info, hash_pwd=password)):
            return { 'message' : "User registered successfully", 'status': 201}
        else:
            return{ 'message' : "Error accessing database.", 'status' : 500}
        
    