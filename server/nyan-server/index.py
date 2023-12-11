from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from routes import auth, api
from flask_jwt_extended import JWTManager
from config.keys import JWT_SECRET

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = JWT_SECRET
app.register_blueprint(auth.auth_blueprint, url_prefix='/auth')
app.register_blueprint(api.api_blueprint, url_prefix='/api')

jwt = JWTManager(app)

@app.route('/')
def backend_home():
    return 'Instanyan Server'