from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base
from datetime import datetime

class User(Base):      
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    email = Column(String(100), unique=True)
    name = Column(String(100))
    username = Column(String(100))
    password = Column(String)
    profile = relationship("UserProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    posts = relationship("Post", back_populates="user", lazy="dynamic")

    def __init__(self, name, email, username, password, profile):
        self.name = name
        self.email = email
        self.username = username
        self.password = password
        
class UserProfile(Base):
    __tablename__ = 'user_profiles'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    profile_image = Column(String, default="https://i.imgur.com/A5b1S4n.jpg")
    status = Column(String(60), default="Nyandit me!")
    about = Column(String(150), default="Nyandit me too!")
    posts = Column(Integer, default=0)
    followers = Column(Integer, default=0)
    following = Column(Integer, default=0)
    user = relationship("User", back_populates="profile")
    
    
class Post(Base):
    __tablename__ = 'posts'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship('User', back_populates='posts')    
    image = Column(String)
    content = Column(String(1000))
    hashtags = Column(String(100))
    likes = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    def serialize(self):
        return {
            "username": self.user.username,
            "image" : self.image,
            "content" : self.content,
            "hashtags" : self.hashtags,
            "likes" : self.likes,
            "created_at" : self.created_at.isoformat()
        }