from models.user import User, UserProfile
from models.base import Session, engine, Base
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from datetime import timedelta

User.metadata.create_all(engine)
session = Session()

# DB user verification/check functions.
def check_username(auth_data, session):
        db_user = session.query(User).filter(User.username == auth_data['username']).first()    
        if (db_user):
            return db_user 
        else: 
            return False

def check_mail(auth_data, session):
        db_user = session.query(User).filter(User.email == auth_data['email']).first()
        if (db_user):
            return db_user 
        else: 
            return False

# Auth functions
# Log-in and register functions.
def user_data(user_id):
    with Session() as session:
        try:
            user = session.query(User).get(user_id)
            user_info = { 'username' : user.username, 'email' : user.email, 'avatar' : user.profile.profile_image }
            return { 'userDetails' : user_info , 'status' : 200}
        except SQLAlchemyError as e:
            session.rollback()
            return { 'message' : "Error accessing database", 'status' : 500}

def log_user(auth_data):
    with Session() as session:
        user = (check_mail(auth_data, session))
        if (user):
            if (check_password_hash(user.password, auth_data['password'])):
                print(f'User {user.username} found, creating JWT session.')
                expires = timedelta(days=7)
                user_token = create_access_token(identity=user.id, expires_delta=expires)
                user_info = { 'username' : user.username, 'email' : user.email }
                return {'userToken' : user_token, 'userInfo' : user_info, 'status' : 200}
            else:
                return { 'message' : "Invalid password.", 'status': 401}
        else:
            return { 'message' : "User not found.", 'status' : 404}

def register_user(auth_data):
    with Session() as session:
        if (check_username(auth_data, session) or check_mail(auth_data, session)):
            return { 'message' : "User already registered!", 'status': 409}
        else:
            try:
                password = generate_password_hash(user_info['password'])
                new_profile = UserProfile()
                new_user = User(name=user_data['name'], 
                                email=user_data['email'], 
                                username=user_data['username'], 
                                password=password,
                                profile=new_profile
                                )
                session.add(new_user)
                session.commit
                return { 'message' : "User registered successfully", 'status': 201}
            except SQLAlchemyError as e:
                print("Database error: ", str(e))
                session.rollback()
                return { 'message' : "Error accessing database", 'status' : 500}