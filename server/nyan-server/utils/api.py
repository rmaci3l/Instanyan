from flask import jsonify
from models.user import User, UserProfile
from models.base import Session, engine, Base

User.metadata.create_all(engine)
session = Session()

# To-do: better error handling (see scrum log #17 & #19)
# API requests functions.
def user_data(user_id):
    with Session() as session:
        db_user = session.query(UserProfile).filter(UserProfile.user_id == user_id).first()
        user_data = {"username" : db_user.user.username,
                     "email" : db_user.user.email,
                     "profile_image" : db_user.profile_image, 
                     "status" : db_user.status,
                     "about" : db_user.about,
                     "posts" : db_user.posts,
                     "followers" : db_user.followers,
                     "following" : db_user.following}
        return jsonify(user_data)

def update_data(user_id, user_data):
    with Session() as session:
        # To-do: Implement some data validation here.
        db_user = session.query(UserProfile).get(user_id)
        if not db_user:
            return jsonify({"error" : "user not found"}), 404
        db_user.about = user_data.get('about', db_user.about)
        db_user.status = user_data.get('status', db_user.status)
        
        session.commit()
        return jsonify({"message" : "Profile updated successfully"}), 200