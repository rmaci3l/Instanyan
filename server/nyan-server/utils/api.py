from models.user import User, UserProfile, Post
from models.base import Session, engine, Base
from sqlalchemy import func

User.metadata.create_all(engine)
session = Session()

# To-do: better error handling (see scrum log #17 & #19)
# API requests functions.
# Profile data handling.
def profile_data(username, user_id):
    with Session() as session:
        current_user = session.query(User).get(user_id)
        user_profile = session.query(User).filter(User.username == username).first()
        if user_profile:
            posts = session.query(Post).filter(Post.user_id == user_profile.id).all()
            post_data = [post.serialize() for post in posts]                    
            follows = 'No'
            profile = user_profile.serialize()
            if user_profile and current_user in user_profile.followers:
                follows = 'Yes'
            return { 'profile' : profile, 'posts' : post_data, 'follows' : follows, 'message' : "User found!",  'status' : 200 }
        else:
            return { 'profile': "", 'message' : "User not found!", 'status': 404}

def update_data(user_id, user_data):
    with Session() as session:
        # To-do: Implement some data validation here.
        db_user = session.query(UserProfile).get(user_id)
        if not db_user:
            return {'message' : "User not found!", 'status' : 404}
        db_user.about = user_data.get('about', db_user.about)
        db_user.status = user_data.get('status', db_user.status)
        if (user_data.get('profile_image') != ""):
            db_user.profile_image = user_data.get('profile_image', db_user.profile_image)       
        session.commit()
        return { 'message' : "Profile updated successfully", 'redirect' : "/profile", 'status' : 200}


def profile_follow(username, user_id):
    with Session() as session:
        current_user = session.query(User).get(user_id)
        user_to_follow = session.query(User).filter(User.username == username).first()
        message = ''
        if user_to_follow and current_user not in user_to_follow.followers:
            user_to_follow.followers.append(current_user)
            message = { 'message' : "User followed! ", 'current' : "Followed", 'status' : 200}
        else:
            user_to_follow.followers.remove(current_user)
            message = { 'message' : "User unfollowed! ", 'current' : "Unfollowed", 'status' : 200}
        user_to_follow.profile.followers = user_to_follow.followers.count()
        current_user.profile.following = current_user.followed.count()
        session.commit()
        return message

# User posts create/update/delete.   
def create_post(user_id, post_data):
    with Session() as session:
        db_user = session.query(UserProfile).get(user_id)
        if not db_user:
            return {'message' : "user not found", 'status' : 404}
        new_post = Post(user_id=db_user.user_id,
                        image=post_data['image'],
                        content=post_data['content'],
                        hashtags=post_data['hashtags'],
                        )
        session.add(new_post)        
        count = session.query(func.count(Post.id)).filter(Post.user_id == db_user.user_id).scalar()
        db_user.posts = count
        session.commit()
        return {'message' : "Post created successfuly.", 'redirect' : "/profile", 'status' : 200}

def delete_post(user_id, post_id):
    ...

def send_like(user_id, post_id):
    with Session() as session:
        post = session.query(Post).get(post_id)
        user = session.query(User).get(user_id)

        if not post or not user:
            return { 'message' : "Post or User not found.", 'current' : "", 'status' : 404 }

        if user in post.liked_by:
            post.liked_by.remove(user)
            post.likes-= 1
            action = "No"
                        
        else:
            post.liked_by.append(user)
            post.likes += 1
            action = "Yes"    
        session.commit()
        return { 'message' : "Success.", 'liked' : action, 'likes' : post.likes, 'id' : post.id, 'status': 200 }
        

# Feed handling.

def get_feed(user_id):
    with Session() as session:
        # TO-DO
        # Check if feed is from logged user, if positive retrieve the data from
        # the followed users of its account first.

        # Retrieve the first 20 posts.
        recent_posts = session.query(Post)\
            .order_by(Post.created_at.desc())\
            .limit(20)\
            .all()
        return[post.serialize(user_id=user_id) for post in recent_posts]
        