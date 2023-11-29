from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/register', methods=['POST'])
def register():
    ...
    

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Dummy check.
    if username == 'catlover' and password == 'meow123':
        return jsonify({"message" : "Login sucessfull"}), 200
    else:
        return jsonify({"message" : "Invalid credentials"}), 401

@app.route('/')
def hello_world():
    return 'HEllo, world'