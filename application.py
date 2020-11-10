import os

from flask import Flask, render_template
from flask_socketio import SocketIO, emit, send

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

@app.route("/")
def index():
    return render_template("index.html")

@socketio.on('message')
def message(data):
    #add in dictionary later
    print(data)
    send(data)

@socketio.on('new username')
def new_username(data):
    username=""
    # print(data["username"])
    username=data["username"]
    print(username)
    emit("add username",{"username":username})