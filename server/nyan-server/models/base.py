import os
from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

database_url = os.environ.get('DATABASE_URL')
engine = create_engine(database_url)
Session = sessionmaker(bind=engine)

Base = declarative_base()