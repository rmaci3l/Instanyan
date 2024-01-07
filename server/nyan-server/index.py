import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from routes import auth, api
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.environ.get('JWTKEY')
app.register_blueprint(auth.auth_blueprint, url_prefix='/auth')
app.register_blueprint(api.api_blueprint, url_prefix='/api')

jwt = JWTManager(app)

@app.route('/')
def backend_home():
    return 'Instanyan Server'