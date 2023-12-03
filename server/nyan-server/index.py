from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from routes.auth import auth_blueprint
from routes.api import api_blueprint
from flask_jwt_extended import JWTManager
from flask_jwt_extended.exceptions import JWTExtendedException


app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'billybob'
app.register_blueprint(auth_blueprint, url_prefix='/auth')
app.register_blueprint(api_blueprint, url_prefix='/api')

jwt = JWTManager(app)

from models.user import User   

@app.route('/')
def backend_home():
    return 'Instanyan Server'