from models.user import User
from models.base import Session, engine, Base
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user


User.metadata.create_all(engine)
session = Session()


def check_username(user_data):
    db_user = session.query(User).filter(User.username == user_data['username']).first()    
    if (db_user == None):
        return False
    else:
        return True


def check_mail(user_data):       
    db_user = session.query(User).filter(User.email == user_data['email']).first()
    if (db_user == None):
        return False
    else:
        return db_user


def log_user(user_data):
    user = (check_mail(user_data))
    if (user):
        print(f'{user.id} | {user.username} was found.')
        if (check_password_hash(user.password, user_data['password'])):
            login_user(user)
            return {"message" : "Log-in successful.", "redirect" : "/profile"}
        else:
            return {"message" : "Invalid password."}
    else:
        print('User not found.')
        return {"message" : "User not found."}


def register_user(user_data):
    print(user_data)
    if (check_username(user_data) or check_mail(user_data)):
        return {"message" : "User already registered!", "redirect" : ""}
    else:
        password = generate_password_hash(user_data['password'])
        new_user = User(name=user_data['name'], email=user_data['email'], username=user_data['username'], password=password)
        session.add(new_user)
        session.commit()
        session.close()
        return {"message" : "User registered successfully", "redirect" : "/login"}
    