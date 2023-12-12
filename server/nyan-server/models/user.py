from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base

class User(Base):      
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    email = Column(String(100), unique=True)
    name = Column(String(100))
    username = Column(String(100))
    password = Column(String)
    profile = relationship("UserProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")

    def __init__(self, name, email, username, password, profile):
        self.name = name
        self.email = email
        self.username = username
        self.password = password
        self.profile = profile
        
class UserProfile(Base):
    __tablename__ = 'user_profiles'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    profile_image = Column(String)
    status = Column(String(60))
    about = Column(String(150))
    posts = Column(Integer)
    followers = Column(Integer)
    following = Column(Integer)
    user = relationship("User", back_populates="profile")