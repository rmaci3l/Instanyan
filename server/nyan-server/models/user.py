from sqlalchemy import Column, String, Integer, Table, DateTime, ForeignKey
from sqlalchemy.orm import relationship, backref, dynamic
from .base import Base
from datetime import datetime


likes_table = Table('likes', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('post_id', Integer, ForeignKey('posts.id'))
)

followers_table = Table('followers', Base.metadata,
    Column('follower_id', Integer, ForeignKey('users.id')),
    Column('followed_id', Integer, ForeignKey('users.id'))
)


class User(Base):      
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    email = Column(String(100), unique=True)
    name = Column(String(100))
    username = Column(String(100))
    password = Column(String)
    
    profile = relationship("UserProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    posts = relationship("Post", back_populates="user", lazy="dynamic")
    liked_posts = relationship('Post', secondary=likes_table, back_populates='liked_by')
    followed = relationship('User', secondary=followers_table,
                primaryjoin=id == followers_table.c.follower_id,
                secondaryjoin=id == followers_table.c.followed_id,
                backref=backref('followers', lazy='dynamic'), 
                lazy='dynamic'
            )    

    def __init__(self, name, email, username, password, profile):
        self.name = name
        self.email = email
        self.username = username
        self.password = password
        
        
    def serialize(self):
        return {
            "username": self.username,
            "avatar": self.profile.profile_image,
            "status": self.profile.status,
            "about": self.profile.about,
            "posts_qty": self.profile.posts,
            "followers": self.profile.followers,
            "following": self.profile.following            
        }
        
        
class UserProfile(Base):
    __tablename__ = 'user_profiles'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", back_populates="profile")
    
    profile_image = Column(String, default="https://i.imgur.com/A5b1S4n.jpg")
    status = Column(String(60), default="Nyandit me!")
    about = Column(String(150), default="Nyandit me too!")
    posts = Column(Integer, default=0)
    followers = Column(Integer, default=0)
    following = Column(Integer, default=0)


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
    liked_by = relationship('User', secondary=likes_table, back_populates='liked_posts')

    
    def serialize(self, user_id=None):
        # Calculate the post time difference and format it.
        time_diff = datetime.utcnow() - self.created_at
        seconds = time_diff.total_seconds()
        
        minutes = seconds / 60
        hours = minutes / 60
        days = hours / 24
        
        if minutes < 60:
            time_ago = f"{int(minutes)} m"
        elif hours < 24:
            time_ago = f"{int(hours)} h"
        else:
            time_ago = f"{int(days)} d"
        
        #Checks if user liked the post or not.        
        
        liked = "yes" if user_id in [user.id for user in self.liked_by] else "no"
        
        return {                       
            "id" : self.id,
            "username": self.user.username,
            "avatar" : self.user.profile.profile_image,
            "followers" : self.user.profile.followers,
            "image" : self.image,
            "content" : self.content,
            "hashtags" : self.hashtags,
            "likes" : self.likes,
            "liked" : liked,
            "created_at" : time_ago
        }