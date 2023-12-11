from models.user import User
from models.base import Session, engine, Base

User.metadata.create_all(engine)
session = Session()

# Search & verify queries.

def check_username(user_data):
    with Session() as session:
        db_user = session.query(User).filter(User.username == user_data['username']).first()    
        if (db_user == None):
            return False
        else:
            return True

def check_mail(user_data):
    with Session() as session:       
        db_user = session.query(User).filter(User.email == user_data['email']).first()
        if (db_user == None):
            return False
        else:
            return db_user
    
    
# Add & Create queries.

def add_user(user_data, hash_pwd):
    with Session() as session:
        new_user = User(name=user_data['name'], email=user_data['email'], username=user_data['username'], password=hash_pwd)   
        session.add(new_user)
        session.commit()
        return True