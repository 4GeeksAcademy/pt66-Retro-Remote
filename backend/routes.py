from flask_jwt_extended import jwt_required
from flask_jwt_extended import create_access_token, get_jwt_identity
from werkzeug.security import (
    generate_password_hash, check_password_hash
)
from flask import Flask, request, jsonify, url_for, Blueprint
from flask import Flask, request, jsonify, Blueprint
from backend.models import db, User, Reviews
from flask_cors import CORS
import requests
import datetime
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

# Initialize Blueprint for API routes
api = Blueprint('api', __name__, url_prefix="/api")
bcrypt = Bcrypt()

# TMDB API key
TMDB_API_KEY = 'f0d14b30a61125698e4990acdb103e21'


api = Blueprint('api', __name__, url_prefix="/api")
bcrypt = Bcrypt()

CORS(api)




@api.route("/login", methods=['POST'])
def create_token():
    username = request.json.get('username')
    password = request.json.get('password')

    user = User.query.filter_by(username=username).first()

    if not user or not password:
        return jsonify(msg="Invalid username or password"), 401

    if not user:
        return jsonify(msg="Invalid username or password"), 401
    if not check_password_hash(user.password, password):
        return jsonify(msg="Invalid username or password"), 401
    # Perform login logic here
    expiration = datetime.timedelta(minutes=120)
    access_token = create_access_token(
        identity=username,
        expires_delta=expiration
    )
    return jsonify(msg="Login successful", access_token=access_token, id=user.id, username=user.username), 200
    # else:
    return jsonify(msg="Wrong username or password"), 401


@api.route('/top-rated/movies', methods=['GET'])
def get_top_rated_movies():
    """Fetch top-rated movies from TMDB API."""
    try:
        response = requests.get(
            f'https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key={TMDB_API_KEY}')
        response.raise_for_status()
        return jsonify(response.json().get('results', []))
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500


@api.route('/top-rated/shows', methods=['GET'])
def get_top_rated_shows():
    """Fetch top-rated TV shows from TMDB API."""
    try:
        response = requests.get(
            f'https://api.themoviedb.org/3/tv/top_rated?language=en-US&api_key={TMDB_API_KEY}')
        response.raise_for_status()
        return jsonify(response.json().get('results', []))
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500


@api.route('/movieDetails', methods=['GET'])
def get_movie_details():
    """Fetch details for a specific movie from TMDB API."""
    movie_id = request.args.get('id')
    try:
        response = requests.get(
            f'https://api.themoviedb.org/3/movie/{movie_id}?language=en-US&api_key={TMDB_API_KEY}')
        response.raise_for_status()
        print(response)
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500


@api.route('/movieCast', methods=['GET'])
def get_movie_cast():
    """Fetch cast information for a specific movie from TMDB API."""
    movie_id = request.args.get('id')
    try:
        response = requests.get(
            f'https://api.themoviedb.org/3/movie/{movie_id}/credits?language=en-US&api_key={TMDB_API_KEY}')
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500


@api.route('/tvShowDetails', methods=['GET'])
def get_tvShow_details():
    id = request.args.get('id')
    try:
        response = requests.get(
            f'https://api.themoviedb.org/3/tv/{id}?language=en-US&api_key={TMDB_API_KEY}')
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500


@api.route('/tvShowCast', methods=['GET'])
def get_tvShow_cast():
    id = request.args.get('id')
    try:
        response = requests.get(
            f'https://api.themoviedb.org/3/tv/{id}/credits?language=en-US&api_key={TMDB_API_KEY}')
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500


@api.route('/search', methods=['GET'])
def search():
    """Search for movies or TV shows from TMDB API."""
    query = request.args.get('query')
    try:
        response = requests.get(
            f'https://api.themoviedb.org/3/search/multi?api_key={TMDB_API_KEY}&query={query}')
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500


@api.route("/review", methods=["POST"])
def add_review():
    """Add a review to the database."""
    body = request.json
    review = Reviews(
        review=body["reviewData"],
        movie_id=body["movieId"],
        username=body["username"]
    )
    db.session.add(review)
    db.session.commit()
    db.session.refresh(review)
    return jsonify(review.serialize())


@api.route('/relay', methods=['GET'])
def relay_http_req():
    """Demo route to relay a HTTP request."""
    resp = requests.get("https://httpbin.org/anything?apiKey=somesecretapikey")
    return jsonify(resp.json()), 200


# Allow CORS requests to this API
CORS(api)


@api.route('/play/movie/<int:movie_id>', methods=['GET'])
def get_movie_streaming_services(movie_id):
    url = "https://api.themoviedb.org/3/watch/providers/movie?language=en-US"

    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmZiZWMzYjY3MzdhYzAzOWQxOWVjMmJjMDI4MTE4NyIsIm5iZiI6MTcyMzI1MTA5OS42MjcyOTcsInN1YiI6IjY2OTg2ODcwZjVmMjdkY2U5ZDcyMGRjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1_J6G9Ukogyrbu_vX35TVNQ4bplfPn9pPH1qp-DXAkg"
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        return jsonify({
            "streamingService": data.provider_name,
            "logo": data.logo_path
        })
    else:
        return jsonify({"error": "Unable to fetch streaming services"}), response.status_code


@api.route('/play/tv/<int:episode_id>', methods=['GET'])
def get_tv_show_streaming_services(episode_id):
    url = "https://api.themoviedb.org/3/watch/providers/tv?language=en-US"

    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMmZiZWMzYjY3MzdhYzAzOWQxOWVjMmJjMDI4MTE4NyIsIm5iZiI6MTcyMzI1MTA5OS42MjcyOTcsInN1YiI6IjY2OTg2ODcwZjVmMjdkY2U5ZDcyMGRjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1_J6G9Ukogyrbu_vX35TVNQ4bplfPn9pPH1qp-DXAkg"
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        return data, 200
    else:
        return jsonify({"error": "Unable to fetch streaming services"}), response.status_code

# Other routes (e.g., OAuth) remain unchanged


# Allow CORS requests to this API
CORS(api)


@api.route("/user", methods=['GET'])
@jwt_required()
def get_user():
    """Fetch the current user's information."""
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    return jsonify(user.serialize()), 200


@api.route("/home")
def home():
    """Home route."""
    return jsonify("Welcome to the home page"), 200


TMDB_API_KEY = 'c2fbec3b6737ac039d19ec2bc0281187'

def get_tv_streaming_providers_tmdb(tv_id):
    """Fetch streaming providers from TMDB for a specific TV show."""
    url = f'https://api.themoviedb.org/3/tv/{tv_id}/watch/providers?api_key={TMDB_API_KEY}'
    
    headers = {
        "accept": "application/json"
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        # Assuming you want to check for US providers
        if 'results' in data and 'US' in data['results'] and 'flatrate' in data['results']['US']:
            providers = data['results']['US']['flatrate']
            return {
                'streamingServices': [
                    {'name': provider['provider_name'], 'logo': provider['logo_path']}
                    for provider in providers
                ]
            }
        else:
            return {"error": "No streaming providers found for this TV show"}, 404
    elif response.status_code == 404:
        return {"error": "TV show not found in TMDB"}, 404
    else:
        return {"error": "Unable to fetch streaming services"}, response.status_code

@api.route('/play/tv/<int:tv_id>', methods=['GET'])
def play_tv_show(tv_id):
    """Fetch and provide links to streaming services for a specific TV show."""
    providers = get_tv_streaming_providers_tmdb(tv_id)
    return jsonify(providers)
# Other routes (e.g., OAuth) remain unchanged


# Allow CORS requests to this API

200

# Allow CORS requests to this API
CORS(api)

@api.route("/signup", methods=['POST'])
def create_user():
    request_body = request.get_json()
    username = request_body.get('username')
    email=request_body.get('email')
    print(username)
    print(bcrypt.generate_password_hash(
        request_body.get("password")
    ).decode('utf-8'))
    # Check the database to see if a user exists w/ that email.
    # https://github.com/4GeeksAcademy/pt66-full-stack-demo/blob/next/backend/routes.py#L54
    user = User.query.filter_by(username=username).first()
    email = User.query.filter_by(email=email).first()

    if not user and not email:
        new_user = User(
            username=request_body.get('username'),
            email=request_body.get('email'),
            password=generate_password_hash(
            request_body.get("password")
            )
        )
    
    if user:
        return jsonify(msg="User already exists"), 401
    
    if email:
        return jsonify(msg="Email already exists"), 401
   
    db.session.add(new_user)
    db.session.commit()
    db.session.refresh(new_user)
    access_token = create_access_token(identity=new_user.username)
    return jsonify(
        msg="User created",
        user=new_user.serialize(),
        token=access_token
    ), 200




