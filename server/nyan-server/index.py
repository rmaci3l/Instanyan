from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from routes.auth import auth_blueprint
from flask_login import LoginManager

app = Flask(__name__)
app.secret_key = 'billybob'
app.register_blueprint(auth_blueprint, url_prefix='/auth')

login_manager = LoginManager()
login_manager.login_view = 'auth.login'
login_manager.init_app(app)

from models.user import User

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
    

@app.route('/')
def backend_home():
    return 'Instanyan Server'