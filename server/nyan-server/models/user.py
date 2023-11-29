from sqlalchemy import Column, String, Integer
from base import Base

class User(Base):      
    __tablename__ = 'user'
    
    id = Column(Integer, primary_key=True)
    email = Column(String)
    name = Column(String)
    username = Column(String)
    password = Column(String)

    def __init__(self, name, email, username, password):
        self.name = name
        self.email = email
        self.username = username
        self.password = password
        