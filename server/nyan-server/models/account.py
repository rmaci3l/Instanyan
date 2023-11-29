from user import User
from base import Session, engine, Base

def register():
    ...
    
User.metadata.create_all(engine)

session = Session()

user_one = User("Bob", "omega@br.com", "bobomega", "pw12345")

session.add(user_one)

session.commit()
session.close()