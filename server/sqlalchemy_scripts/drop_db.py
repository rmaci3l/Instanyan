from .base import engine, Session, Base  # Replace 'yourapp' with the name of your Flask app
from sqlalchemy import text

def main():
    Base.metadata.drop_all(engine)
    print("Database wiped")
    Base.metadata.create_all(engine)
    print("Database created.")
main()