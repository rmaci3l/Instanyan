from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.api import user_data, update_data
from flask_bcrypt import Bcrypt
from flask_cors import CORS


api_blueprint = Blueprint('api', __name__)
CORS(api_blueprint)

@api_blueprint.route('/user/profile', methods=['GET'])
@jwt_required()
def user_info():    
    user_id = get_jwt_identity()       
    result = user_data(user_id)
    return jsonify(result), 200

@api_blueprint.route('/user/profile', methods=['POST'])
@jwt_required()
def update_user():
    user_id = get_jwt_identity()
    user_data = request.json
    result = update_data(user_id, user_data)
    return jsonify(result), result['status']
    