from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.profile_api import profile_data, update_data, profile_follow
from utils.post_api import create_post, erase_post, send_like
from utils.explore_api import get_feed, search_hashtag, search_users
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

@api_blueprint.route('/user/follow/<username>', methods=['POST'])
@jwt_required()
def follow_user(username):
    user_id = get_jwt_identity()
    result = profile_follow(username, user_id)
    return jsonify (result), result['status']


# User post routes.  
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


# Feed/Explore routes.
@api_blueprint.route('/feed', methods=['GET'])
@jwt_required()
def view_feed():
    user_id = get_jwt_identity()
    result = get_feed(user_id)
    return jsonify (result), result['status']

@api_blueprint.route('/explore/posts/<hashtag>', methods=['GET'])
@jwt_required()
def explore_hashtags(hashtag):
    user_id = get_jwt_identity()
    result = search_hashtag(hashtag, user_id)
    return jsonify (result), result['status']

@api_blueprint.route('/explore/<username>', methods=['GET'])
@jwt_required()
def explore_users(username):
    user_id = get_jwt_identity()
    result = search_users(username)
    return jsonify(result), result['status']