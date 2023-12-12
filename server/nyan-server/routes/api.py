from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.api import user_data
from flask_bcrypt import Bcrypt
from flask_cors import CORS


api_blueprint = Blueprint('api', __name__)
CORS(api_blueprint)

@api_blueprint.route('/user/profile', methods=['GET'])
@jwt_required()
def user_info():    
    user_id = get_jwt_identity()       
    user = user_data(user_id)
    return user, 200