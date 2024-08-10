from flask import Flask, request, jsonify, url_for, Blueprint
from backend.models import db, User, Reviews
from flask_cors import CORS
import requests



TMDB_API_KEY = 'f0d14b30a61125698e4990acdb103e21'

from werkzeug.security import (
    generate_password_hash, check_password_hash
)
from flask_jwt_extended import create_access_token, get_jwt_identity
from flask_jwt_extended import jwt_required
import datetime
from flask_bcrypt import Bcrypt



api = Blueprint('api', __name__, url_prefix="/api")
bcrypt = Bcrypt()

@api.route('/top-rated/movies', methods=['GET'])
def get_top_rated_movies():
    try:
        response = requests.get(f'https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key={TMDB_API_KEY}')
        response.raise_for_status()
        return jsonify(response.json().get('results', []))
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

@api.route('/top-rated/shows', methods=['GET'])
def get_top_rated_shows():
    try:
        response = requests.get(f'https://api.themoviedb.org/3/tv/top_rated?language=en-US&api_key={TMDB_API_KEY}')
        response.raise_for_status()
        return jsonify(response.json().get('results', []))
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500
    
@api.route('/movieDetails', methods=['GET'])
def get_movie_details():
    print('get movie details route')
    id = request.args.get('id')
    try:
        response = requests.get(f'https://api.themoviedb.org/3/movie/{id}?language=en-US&api_key={TMDB_API_KEY}')
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500
    
@api.route('/movieCast', methods=['GET'])
def get_movie_cast():
    print('get movie cast route')
    id = request.args.get('id')
    try:
        response = requests.get(f'https://api.themoviedb.org/3/movie/{id}/credits?language=en-US&api_key={TMDB_API_KEY}')
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

@api.route('/tvShowDetails', methods=['GET'])
def get_tvShow_details():
    id = request.args.get('id')
    try:
        response = requests.get(f'https://api.themoviedb.org/3/tv/{id}?language=en-US&api_key={TMDB_API_KEY}')
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500
    
@api.route('/tvShowCast', methods=['GET'])
def get_tvShow_cast():
    id = request.args.get('id')
    try:
        response = requests.get(f'https://api.themoviedb.org/3/tv/{id}/credits?language=en-US&api_key={TMDB_API_KEY}')
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500



@api.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')
    try:
        response = requests.get(f'https://api.themoviedb.org/3/search/multi?api_key={TMDB_API_KEY}&query={query}')
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500




# Register the Blueprint with the Flask app
# app.register_blueprint(api)

# if __name__ == '__main__':
#     app.run(debug=True)



@api.route("/review", methods=["POST"])
def add_review():
    print('method called')
    body = request.json

    print(body)
    
    review = Reviews(
        review=body["reviewData"],
        movie_id=body["movieId"]
    )
    db.session.add(review)
    db.session.commit()
    db.session.refresh(review)

    return jsonify(review.serialize())




# Demo API forwarding route
@api.route('/relay', methods=['GET'])
def relay_http_req():
    resp = requests.get("https://httpbin.org/anything?apiKey=somesecretapikey")
    return jsonify(resp.json()), 200

# Allow CORS requests to this API
CORS(api)

@api.route("/signup", methods=['POST'])
def create_user():
    request_body = request.get_json()
    print(bcrypt.generate_password_hash(
        request_body.get("password")
    ).decode('utf-8'))
    # Check the database to see if a user exists w/ that email.
    # https://github.com/4GeeksAcademy/pt66-full-stack-demo/blob/next/backend/routes.py#L54
    user = User(
        username=request_body.get('username'),
        email=request_body.get('email'),
        password=generate_password_hash(
            request_body.get("password")
        )
    )
    
    # print(user)
    # user = User()
    # username=request_body.get('username')
    db.session.add(user)
    db.session.commit()
    db.session.refresh(user)
    access_token = create_access_token(identity=user.username)
    return jsonify(
        msg="User created",
        user=user.serialize(),
        token=access_token
    ), 200


@api.route("/login", methods=['POST'])
def create_token():
    username = request.json.get('username')
    password = request.json.get('password')

    user = User.query.filter_by(username=username).first()

    if not user or not password:
        return jsonify(msg="Invalid username or password"), 401
    
    if not user : return jsonify(msg="Invalid username or password"), 401
    if not check_password_hash(user.password, password):
        return jsonify(msg="Invalid username or password"), 401 
    # Perform login logic here
    expiration = datetime.timedelta(minutes=120)
    access_token = create_access_token(
        identity=username,
        expires_delta=expiration
    )
    return jsonify(msg="Login successful",access_token=access_token), 200
    # else:
    return jsonify(msg="Wrong username or password"), 401

@api.route("/user", methods=['GET'])
@jwt_required()
def get_user():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    return jsonify(user.serialize()), 200

@api.route("/home")
def home():
    # Check if user is authenticated
    # If not, redirect to login page
    # Otherwise, return the home page
    return jsonify("Welcome to the home page"), 200