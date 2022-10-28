import os
from flask import Flask, send_from_directory

app = Flask(__name__, static_url_path='', static_folder='ui/build/')

@app.route('/')
def index():
    return send_from_directory('ui/build/', 'index.html')




@app.route('/checkIn/<projectID>/<qty>')
def checkIn_hardware(projectID, qty):
    return "Project ID: " + projectID + "\nCheckin Quantity: " + qty

@app.route('/checkOut/<projectID>/<qty>')
def checkOut_hardware(projectID, qty):
    return "Project ID: " + projectID + "\nCheckout Quantity: " + qty

@app.route('/joinProject/<projectID>')
def joinProject(projectID):
    return "Joined Project | Project ID: " + projectID

@app.route('/leaveProject/<projectID>')
def leaveProject(projectID):
    return "Left Project | Project ID: " + projectID


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))

