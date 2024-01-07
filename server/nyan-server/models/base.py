from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine('postgres://richardm:LnEegiR6ll6oY2ixDz39TfOY7ERFHVlx@dpg-cmcutfud3nmc73dfe7b0-a/instanyandb')
Session = sessionmaker(bind=engine)

Base = declarative_base()