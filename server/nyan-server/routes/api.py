from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from ..utils.profile_api import request_profile, update_data, profile_follow
from ..utils.post_api import create_post, erase_post, send_like, request_post

api_blueprint = Blueprint('api', __name__)
CORS(api_blueprint)


# User profile API routes.
@api_blueprint.route('/user/profile', methods=['GET'])
@jwt_required()
def user_profile():       
    user_id = get_jwt_identity()
    profile_args = request.args
    result = request_profile(profile_args, user_id)
    return jsonify(result), result['status']

@api_blueprint.route('/user/profile', methods=['POST'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user_data = request.json
    result = update_data(user_id, user_data)
    return jsonify(result), result['status']

@api_blueprint.route('/user/follow/<username>', methods=['POST'])
@jwt_required()
def follow_user(username):
    user_id = get_jwt_identity()
    result = profile_follow(username, user_id)
    return jsonify (result), result['status']


# User post routes.  
@api_blueprint.route('/posts/retrieve', methods=['GET'])
@jwt_required()
def retrieve_post():
    user_id = get_jwt_identity()
    post_args = request.args
    result = request_post(user_id, post_args)
    return (result), result['status']

@api_blueprint.route('/post/create', methods=['POST'])
@jwt_required()
def new_post():
    user_id = get_jwt_identity()
    post_data = request.json
    result = create_post(user_id, post_data)
    return jsonify(result), result['status']

@api_blueprint.route('/post/delete/<post_id>', methods=['POST'])
@jwt_required()
def delete_post(post_id):
    user_id = get_jwt_identity()
    result = erase_post(user_id, post_id)
    return jsonify(result), result['status']

@api_blueprint.route('/post/like/<post_id>', methods=['POST'])
@jwt_required()
def like_post(post_id):   
    user_id = get_jwt_identity()
    result = send_like(user_id, post_id)
    return jsonify(result), result['status']


