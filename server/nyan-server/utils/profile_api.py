from models.user import User, UserProfile, Post
from models.base import Session, engine, Base
from sqlalchemy import func

User.metadata.create_all(engine)
session = Session()

# API requests functions.
# Profile data handling.
def request_profile(profile_args, user_id):
    username = profile_args.get('username')
    origin = profile_args.get('origin')
    
    with Session() as session:
        try:
            user_profile = session.query(User).filter(User.username == username).first()
            # If origin is profile, retrieve the single profile data.
            if (origin == 'profile'):
                current_user = session.query(User).get(user_id)
                if user_profile:
                    follows = 'Follow'
                    profile = user_profile.serialize()
                    if user_profile and current_user in user_profile.followers:
                        follows = 'Following'
                    return { 'profile' : profile, 
                             'follows' : follows, 
                             'message' : f"Retrieved user {username} from server.",  
                             'error' : "",                        
                             'status' : 200 }
                else:
                    return { 'profile': "", 
                             'message' : f"User {username} not found.",
                             'error' : "usernotfound",
                             'status': 404 }

            # If origin is explore, retrieve the similar users accordingly to the username.
            if (origin == 'explore'):
                mid = len(username) // 2
                first = username[:mid]
                last = username[mid:]                
                users_list = []                
                if user_profile:
                    users_list.append({
                        'username' : user_profile.username,
                        'avatar' : user_profile.profile.profile_image,
                        'status' : user_profile.profile.status,
                        'followers' : user_profile.profile.followers
                        })                          
                similar_users = session.query(User).filter(User.username.like(f"%{first}%{last}%")).limit(10).all()
                users_list.extend([{
                    'username' : user.username,
                    'avatar' : user.profile.profile_image,
                    'status' : user.profile.status,
                    'followers' : user.profile.followers
                    } for user in similar_users])
                if users_list:
                    return { 'users' : users_list,
                             'message' : "User(s) successfully retrieved.",
                             'error' : "",
                             'status' : 200 }
                else:
                    return { 'users' : [],
                             'message' : "No similar users found.",
                             'error' : "nouserfound",
                             'status' : 200 }
            return { 'message' : "Invalid request, no or invalid origin arg specified. ",
                     'error' : "invalid",
                     'status' : 400 }
        
        except Exception as e:
            return { 'message' : "Error retrieved from server. Error: " + str(e),
                     'error' : "servererror",
                     'status' : 500 }
           

def update_data(user_id, user_data):
    with Session() as session:
        # To-do: Implement some data validation here.
        current_user = session.query(User).get(user_id)
        user_profile = current_user.profile
        if not current_user:
            return {'message' : "User not found!", 'status' : 404}
        user_profile.about = user_data.get('about', user_profile.about)
        user_profile.status = user_data.get('status', user_profile.status)
        if (user_data.get('avatar') != ""):
            user_profile.profile_image = user_data.get('avatar', user_profile.profile_image)       
        profile = session.query(User).get(user_id).serialize()
        session.commit()
        return { 'profile' : profile, 
                 'message' : "Profile updated successfully", 
                 'error' : "", 
                 'status' : 200 }


def profile_follow(username, user_id):
    with Session() as session:
        current_user = session.query(User).get(user_id)
        user_to_follow = session.query(User).filter(User.username == username).first()
        message = ''
        if user_to_follow and current_user not in user_to_follow.followers:
            user_to_follow.followers.append(current_user)
            message = { 'message' : "User followed! ", 'follows' : "Following", 'status' : 200}
        else:
            user_to_follow.followers.remove(current_user)
            message = { 'message' : "User unfollowed! ", 'follows' : "Follow", 'status' : 200}
        user_to_follow.profile.followers = user_to_follow.followers.count()
        current_user.profile.following = current_user.followed.count()
        session.commit()
        return message