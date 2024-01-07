from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import CORS
from ..utils.auth import register_user, log_user, user_data

auth_blueprint = Blueprint('auth', __name__)
CORS(auth_blueprint)


@auth_blueprint.route('/register', methods=['POST'])
def register():
    auth_data = request.json
    result = register_user(auth_data)       
    return jsonify(result), result['status']
 
@auth_blueprint.route('/login', methods=['POST'])
def login():
    auth_data = request.json
    result = log_user(auth_data)
    return jsonify(result), result['status']
  
@auth_blueprint.route('/user', methods=['GET'])
@jwt_required()
def user_info():   
    user_id = get_jwt_identity()
    result = user_data(user_id)
    return jsonify(result['userDetails']), result['status']
