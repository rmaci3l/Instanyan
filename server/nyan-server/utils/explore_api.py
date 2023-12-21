from models.user import User, UserProfile, Post
from models.base import Session, engine, Base
from sqlalchemy import func, text

User.metadata.create_all(engine)
session = Session()

# Feed handling.
def get_feed(user_id):
    with Session() as session:
        # TO-DO
        # Check if feed is from logged user, if positive retrieve the data from
        # the followed users of its account first.

        # Retrieve the first 20 posts.
        recent_posts = session.query(Post)\
            .order_by(Post.created_at.desc())\
            .limit(20).all()
        return { 'feed' : [post.serialize(user_id=user_id) for post in recent_posts],
                 'message' : " Feed retrieved successfully.",
                 'status' : 200 
        }


# Explore handling.
def search_hashtag(hashtag, user_id):
    with Session() as session:
        try:
            found_posts = session.query(Post).filter(Post.hashtags.like(f"%{hashtag}%"))\
                .order_by(Post.created_at.desc())\
                .limit(20).all()
            if found_posts:
                return { 'posts' : [post.serialize() for post in found_posts],
                         'message' : " Post(s) successfully retrieved.",
                         'status': 200
                }
            else:
                return { 'message' : "No post found.", 
                         'status' : 400 }
        
        except Exception as e:
            return { 'message' : "Error accessing database. Error: " + str(e), 
                     'status' : 500}
        
def search_users(username):
    with Session() as session:
        mid = len(username) // 2
        a = username[:mid]
        b = username[mid:]
        users_list = []
        try:
            user_profile = session.query(User).filter(User.username == username).first()
            if user_profile:
                users_list.append({
                    'username' : user_profile.username,
                    'profile_image' : user_profile.profile.profile_image,
                    'status' : user_profile.profile.status,
                    'followers' : user_profile.profile.followers
                    })          
            
            similar_users = session.query(User)\
                .filter(User.username.like(f"%{a}%{b}%"))\
                .limit(10).all()
            users_list.extend([{
                'username' : user.username,
                'profile_image' : user.profile.profile_image,
                'status' : user.profile.status,
                'followers' : user.profile.followers
            } for user in similar_users])
            if users_list:
                return { 'users' : users_list,
                        'message' : "User(s) successfully retrieved.",
                        'status' : 200 }
            else:
                return { 'message' : "No user found. ",
                         'status' : 200 }
                       
        except Exception as e:
            return { 'message' : "Error accessing database. Error: " + str(e), 
                     'status' : 500}