from flask import jsonify
from models.user import User
from models.base import Session, engine, Base

User.metadata.create_all(engine)
session = Session()

# API requests functions.
def user_data(user_id):
    with Session() as session:
        db_user = session.query(User).filter(User.id == user_id).first()
        user_data = {"username" : db_user.username,
                    "email" : db_user.email,
                    }
        return jsonify(user_data)
