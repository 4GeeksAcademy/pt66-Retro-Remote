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

@api.route('/top-rated/movies', methods=['GET'])
def get_top_rated_movies():
    """Fetch top-rated movies from TMDB API."""
    try:
        response = requests.get(f'https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key={TMDB_API_KEY}')
        response.raise_for_status()
        return jsonify(response.json().get('results', []))
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

@api.route('/top-rated/shows', methods=['GET'])
def get_top_rated_shows():
    """Fetch top-rated TV shows from TMDB API."""
    try:
        response = requests.get(f'https://api.themoviedb.org/3/tv/top_rated?language=en-US&api_key={TMDB_API_KEY}')
        response.raise_for_status()
        return jsonify(response.json().get('results', []))
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

@api.route('/movieDetails', methods=['GET'])
def get_movie_details():
    """Fetch details for a specific movie from TMDB API."""
    movie_id = request.args.get('id')
    try:
        response = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}?language=en-US&api_key={TMDB_API_KEY}')
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

@api.route('/movieCast', methods=['GET'])
def get_movie_cast():
    """Fetch cast information for a specific movie from TMDB API."""
    movie_id = request.args.get('id')
    try:
        response = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}/credits?language=en-US&api_key={TMDB_API_KEY}')
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

@api.route('/search', methods=['GET'])
def search():
    """Search for movies or TV shows from TMDB API."""
    query = request.args.get('query')
    try:
        response = requests.get(f'https://api.themoviedb.org/3/search/multi?api_key={TMDB_API_KEY}&query={query}')
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
        movie_id=body["movieId"]
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

@api.route("/signup", methods=['POST'])
def create_user():
    """Create a new user and return an access token."""
    request_body = request.get_json()
    hashed_password = bcrypt.generate_password_hash(request_body.get("password")).decode('utf-8')
    user = User(
        username=request_body.get('username'),
        email=request_body.get('email'),
        password=hashed_password
    )
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
    """Authenticate user and return an access token."""
    username = request.json.get('username')
    password = request.json.get('password')

    user = User.query.filter_by(username=username).first()

    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify(msg="Invalid username or password"), 401 

    expiration = datetime.timedelta(minutes=120)
    access_token = create_access_token(
        identity=username,
        expires_delta=expiration
    )
    return jsonify(msg="Login successful", access_token=access_token), 200

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

@api.route('/play/<movie_id>', methods=['GET'])
def play_movie(movie_id):
    """Provide links to streaming services for a specific movie."""
    streaming_services = [
        {'name': 'Netflix', 'url': 'https://www.netflix.com'},
        {'name': 'Hulu', 'url': 'https://www.hulu.com'},
        {'name': 'Peacock', 'url': 'https://www.peacocktv.com'},
        {'name': 'Prime Video', 'url': 'https://www.amazon.com/PrimeVideo'},
        # Add more streaming services here
    ]
    return jsonify({'streamingServices': streaming_services}), 200

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


