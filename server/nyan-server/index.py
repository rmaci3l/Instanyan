from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from routes.auth import auth_blueprint
from flask_jwt_extended import JWTManager


app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'billybob'
app.register_blueprint(auth_blueprint, url_prefix='/auth')

jwt = JWTManager(app)

from models.user import User   

@app.route('/')
def backend_home():
    return 'Instanyan Server'