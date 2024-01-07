from models.user import User, UserProfile, Post
from models.base import Session, engine, Base
from sqlalchemy import func

User.metadata.create_all(engine)
session = Session()

# To-do: better error handling (see scrum log #17 & #19)
# User posts create/update/delete.   
def create_post(user_id, post_data):
    with Session() as session:
        current_user = session.query(User).get(user_id)
        current_profile = current_user.profile
        if not current_user:
            return {'message' : "user not found", 'status' : 404}
        new_post = Post(user_id=current_profile.user_id,
                        image=post_data['image'],
                        content=post_data['content'],
                        hashtags=post_data['hashtags'],
                        )
        session.add(new_post)        
        count = session.query(func.count(Post.id)).filter(Post.user_id == current_profile.user_id).scalar()
        current_profile.posts = count
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
            action = "no"
                        
        else:
            post.liked_by.append(user)
            post.likes += 1
            action = "yes"    
        session.commit()
        return { 'message' : "Success.", 
                'liked' : action, 
                'likes' : post.likes, 
                'id' : post.id, 
                'status': 200 }
    
def request_post(user_id, post_args):
    post_quantity = post_args.get('quantity', '20')
    username = post_args.get('username')
    hashtags = post_args.get('hashtags')
    origin = post_args.get('origin')
    post_id = post_args.get('id')
    
    with Session() as session:
        try:
            # If origin is feed, retrieve the last 20 posts from database.
            if (origin == 'feed'):
                    recent_posts = session.query(Post).order_by(Post.created_at.desc()).limit(20).all()
                    if recent_posts:
                        posts = [post.serialize() for post in recent_posts]
                        return { 'posts' : posts,
                                 'message' : "Feed retrieved successfully.",
                                 'error' : "",
                                 'status' : 200 }
                    if not recent_posts:
                        return { 'posts' : [],
                                 'message' : "No posts found.",
                                 'error' : "noposts",
                                 'status' : 200 }
            
            # If origin is user profile, retrieve all the posts from specified user profile.
            if (origin == 'profile'):
                current_profile = session.query(User).filter(User.username == username).first()
                if not current_profile:
                    return  { 'posts' : [],
                              'message' : "User not found.",
                              'error' : "usernotfound",
                              'status' : 200 }
                posts_data = session.query(Post).filter(Post.user_id == current_profile.id).order_by(Post.created_at.desc()).all()
                if not posts_data:
                    return  { 'posts' : [],
                              'message' : "User has no posts.",
                              'error' : "noposts",
                              'status' : 200 }
                posts = [post.serialize() for post in posts_data]
                return { 'posts' : posts,
                         'message' : "Profile posts retrieved successfully.",
                         'error' : "",
                         'status' : 200 }
                        
            # If origin is explore posts by hashtags, retrieve 20 posts that are like the hashtag.
            if (origin == 'explore'):
                found_posts = session.query(Post).filter(Post.hashtags.like(f"{hashtags}"))\
                    .order_by(Post.created_at.desc()).limit(20).all()
                if not found_posts:
                    return { 'posts' : [], 
                             'message' : "No posts found for this hashtag.",
                             'error' : "noposts",
                             'status' : 200 }
                posts = [post.serialize() for post in found_posts]
                return { 'posts' : posts,
                         'message' : "Post(s) retrieved successfully.",
                         'error' : "",
                         'status' : 200 }
                
            # If origin is single-post, retrieve the post according to the id.
            if (origin == 'single'):
                post = session.query(Post).get(post_id)
                if post:
                    user = post.user_id
                    recent_posts = (session.query(Post).filter(Post.user_id == user, Post.id != post_id).order_by(Post.created_at.desc()).limit(6).all())
                    post_data = [post.serialize()]
                    recent_posts_data = [p.serialize() for p in recent_posts]
                    post_data.extend(recent_posts_data)
                    
                    return {'posts' : post_data,
                            'message' : "Posts retrieved successfully.",
                            'error' : "",
                            'status' : 200 }
                return { 'posts' : "",
                         'message' : "Could not find this post by the ID." ,
                         'error' : "postnotfound",
                         'status' : 400 }
                    
            
            return { 'message' : " Invalid request, no or invalid origin specified.",
                     'error' : "invalid",
                     'status' : 400}
                
        except Exception as e:
            return { 'message' : "Error retrieved from server. Error: " + str(e),
                     'error' : "servererror",
                     'status' : 500 }