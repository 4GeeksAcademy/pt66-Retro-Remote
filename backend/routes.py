"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from backend.models import db, User
from flask_cors import CORS
import requests

api = Blueprint('api', __name__, url_prefix="/api")

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

# Demo API forwarding route
@api.route('/relay', methods=['GET'])
def relay_http_req():
    resp = requests.get("https://httpbin.org/anything?apiKey=somesecretapikey")
    return jsonify(resp.json()), 200
