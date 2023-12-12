from flask import Blueprint, request
from utils.auth import register_user, log_user
from flask_bcrypt import Bcrypt
from flask_cors import CORS


auth_blueprint = Blueprint('auth', __name__)
CORS(auth_blueprint)

@auth_blueprint.route('/register', methods=['POST'])
def register():
    user_data = request.json
    result = register_user(user_data)    
    return result

 
@auth_blueprint.route('/login', methods=['POST'])
def login():
    user_data = request.json
    result = log_user(user_data)
    return result
