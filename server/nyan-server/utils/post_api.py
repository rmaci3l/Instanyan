from models.user import User, UserProfile, Post
from models.base import Session, engine, Base
from sqlalchemy import func

User.metadata.create_all(engine)
session = Session()

# To-do: better error handling (see scrum log #17 & #19)
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

def erase_post(user_id, post_id):
    ...

def edit_post(user_id, post_id):
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