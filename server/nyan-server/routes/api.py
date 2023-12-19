from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.api import profile_data, update_data, create_post, profile_follow, get_feed, send_like
from flask_bcrypt import Bcrypt
from flask_cors import CORS


api_blueprint = Blueprint('api', __name__)
CORS(api_blueprint)

# Profile routes.
@api_blueprint.route('/user/profile/<username>', methods=['GET'])
@jwt_required()
def user_profile(username):       
    user_id = get_jwt_identity()
    result = profile_data(username, user_id)
    return jsonify(result), result['status']

@api_blueprint.route('/user/profile', methods=['POST'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user_data = request.json
    result = update_data(user_id, user_data)
    return jsonify(result), result['status']

@api_blueprint.route('/follow/<username>', methods=['POST'])
@jwt_required()
def follow_user(username):
    user_id = get_jwt_identity()
    result = profile_follow(username, user_id)
    return jsonify (result), result['status']


# Feed and post routes.
@api_blueprint.route('/feed', methods=['GET'])
@jwt_required()
def view_feed():
    user_id = get_jwt_identity()
    result = get_feed(user_id)
    return jsonify(result)
    
@api_blueprint.route('/feed/post', methods=['POST'])
@jwt_required()
def new_post():
    user_id = get_jwt_identity()
    post_data = request.json
    result = create_post(user_id, post_data)
    return jsonify(result), result['status']

@api_blueprint.route('/post/like/<post_id>', methods=['POST'])
@jwt_required()
def like_post(post_id):   
    user_id = get_jwt_identity()
    result = send_like(user_id, post_id)
    return jsonify(result), result['status']