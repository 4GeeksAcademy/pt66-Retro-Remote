from flask import Flask, request, jsonify, Blueprint
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from backend.models import db, User, Reviews, MovieFavorites, TvShowFavorites
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import requests
import datetime

# Initialize Blueprint for API routes
api = Blueprint('api', __name__, url_prefix="/api")
bcrypt = Bcrypt()
CORS(api)

# TMDB API key
TMDB_API_KEY = 'f0d14b30a61125698e4990acdb103e21'

# User Authentication Routes
@api.route("/login", methods=['POST'])
def create_token():
    username = request.json.get('username')
    password = request.json.get('password')

    user = User.query.filter_by(username=username).first()

    if not user or not password or not check_password_hash(user.password, password):
        return jsonify(msg="Invalid username or password"), 401

    expiration = datetime.timedelta(minutes=120)
    access_token = create_access_token(identity=username, expires_delta=expiration)
    return jsonify(msg="Login successful", access_token=access_token, id=user.id, username=user.username), 200

@api.route("/signup", methods=['POST'])
def create_user():
    request_body = request.get_json()
    username = request_body.get('username')
    email = request_body.get('email')

    if User.query.filter_by(username=username).first():
        return jsonify(msg="Username already exists"), 401

    if User.query.filter_by(email=email).first():
        return jsonify(msg="Email already exists"), 401

    new_user = User(
        username=username,
        email=email,
        password=generate_password_hash(request_body.get("password"))
    )
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=new_user.username)
    return jsonify(msg="User created", user=new_user.serialize(), token=access_token), 200

@api.route("/user", methods=['GET'])
@jwt_required()
def get_user():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    return jsonify(user.serialize()), 200

# TMDB API Routes
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
    movie_id = request.args.get('id')
    try:
        response = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}?language=en-US&api_key={TMDB_API_KEY}')
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

@api.route('/movieCast', methods=['GET'])
def get_movie_cast():
    movie_id = request.args.get('id')
    try:
        response = requests.get(f'https://api.themoviedb.org/3/movie/{movie_id}/credits?language=en-US&api_key={TMDB_API_KEY}')
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

@api.route('/tvShowDetails', methods=['GET'])
def get_tv_show_details():
    id = request.args.get('id')
    try:
        response = requests.get(f'https://api.themoviedb.org/3/tv/{id}?language=en-US&api_key={TMDB_API_KEY}')
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

@api.route('/tvShowCast', methods=['GET'])
def get_tv_show_cast():
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

# Favorites Routes
@api.route('/favorites/movies', methods=['POST'])
@jwt_required()
def add_favorite_movie():
    print(data)
    user_id = get_jwt_identity()
    data = request.get_json()
    movie_id = data['movie_id']

    existing_favorite = MovieFavorites.query.filter_by(user_id=user_id, movie_id=movie_id).first()

    if existing_favorite:
        if data.get('confirm_removal'):  # Check if the user confirmed the removal
            db.session.delete(existing_favorite)
            db.session.commit()
            return jsonify({'msg': 'Movie unfavorited successfully'}), 200
        else:
            return jsonify({
                'msg': 'Movie is already favorited',
                'warn': 'Favoriting again will remove it from your list. Do you want to proceed?'
            }), 200

    new_favorite = MovieFavorites(user_id=user_id, movie_id=movie_id)
    db.session.add(new_favorite)
    db.session.commit()

    return jsonify({'msg': 'Movie favorited successfully'}), 201

@api.route('/favorites/tv-shows', methods=['POST'])
@jwt_required()
def add_favorite_tv_show():
    user_id = get_jwt_identity()
    data = request.get_json()
    tv_show_id = data['tv_show_id']

    existing_favorite = TvShowsFavorite.query.filter_by(user_id=user_id, tv_show_id=tv_show_id).first()

    if existing_favorite:
        if data.get('confirm_removal'):  # Check if the user confirmed the removal
            db.session.delete(existing_favorite)
            db.session.commit()
            return jsonify({'msg': 'TV Show unfavorited successfully'}), 200
        else:
            return jsonify({
                'msg': 'TV Show is already favorited',
                'warn': 'Favoriting again will remove it from your list. Do you want to proceed?'
            }), 200

    new_favorite = TvShowsFavorite(user_id=user_id, tv_show_id=tv_show_id)
    db.session.add(new_favorite)
    db.session.commit()

    return jsonify({'msg': 'TV Show favorited successfully'}), 201

@api.route('/favorites/tv-shows', methods=['DELETE'])
@jwt_required()
def remove_favorite_tv_show():
    user_id = get_jwt_identity()
    data = request.get_json()
    tv_show_id = data['tv_show_id']

    favorite = TvShowsFavorite.query.filter_by(user_id=user_id, tv_show_id=tv_show_id).first()
    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({'msg': 'TV Show unfavorited successfully'}), 204

    return jsonify({'error': 'Favorite not found'}), 404

# Reviews Route
@api.route("/review", methods=["POST"])
def add_review():
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

# Streaming Services Routes
@api.route('/play/movie/<int:movie_id>', methods=['GET'])
def get_movie_streaming_services(movie_id):
    url = f"https://api.themoviedb.org/3/watch/providers/movie?language=en-US"
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer your_bearer_token_here"
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        return jsonify({
            "streamingService": data.get('provider_name'),
            "logo": data.get('logo_path')
        })
    else:
        return jsonify({"error": "Unable to fetch streaming services"}), response.status_code

@api.route('/play/tv/<int:episode_id>', methods=['GET'])
def get_tv_show_streaming_services(episode_id):
    url = f"https://api.themoviedb.org/3/watch/providers/tv?language=en-US"
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer your_bearer_token_here"
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        return jsonify({
            "streamingService": data.get('provider_name'),
            "logo": data.get('logo_path')
        })
    else:
        return jsonify({"error": "Unable to fetch streaming services"}), response.status_code

# Personal Queue Routes
@api.route('/personal-queue', methods=['POST'])
@jwt_required()
def add_to_personal_queue():
    user_id = get_jwt_identity()
    data = request.get_json()
    item_id = data['item_id']
    item_type = data['item_type']  # 'movie' or 'tv_show'

    if item_type == 'movie':
        new_item = PersonalQueue(user_id=user_id, movie_id=item_id)
    elif item_type == 'tv_show':
        new_item = PersonalQueue(user_id=user_id, tv_show_id=item_id)
    else:
        return jsonify({'error': 'Invalid item type'}), 400

    db.session.add(new_item)
    db.session.commit()

    return jsonify({'msg': f'{item_type.capitalize()} added to personal queue successfully'}), 201

@api.route('/personal-queue', methods=['GET'])
@jwt_required()
def get_personal_queue():
    user_id = get_jwt_identity()
    movies = PersonalQueue.query.filter_by(user_id=user_id).all()
    tv_shows = PersonalQueue.query.filter_by(user_id=user_id).all()

    movie_list = [movie.serialize() for movie in movies]
    tv_show_list = [tv_show.serialize() for tv_show in tv_shows]

    return jsonify({
        'movies': movie_list,
        'tv_shows': tv_show_list
    }), 200

@api.route('/personal-queue/<int:item_id>', methods=['DELETE'])
@jwt_required()
def remove_from_personal_queue(item_id):
    user_id = get_jwt_identity()
    item_type = request.args.get('item_type')  # 'movie' or 'tv_show'

    if item_type == 'movie':
       item = PersonalQueue.query.filter_by(user_id=user_id, movie_id=item_id).first()
    elif item_type == 'tv_show':
       item = PersonalQueue.query.filter_by(user_id=user_id, tv_show_id=item_id).first()
    else:
       return jsonify({'error': 'Invalid item type'}), 400

    
    db.session.delete(item)
    db.session.commit()
    return jsonify({'msg': f'{item_type.capitalize()} removed from personal queue successfully'}), 204

    return jsonify({'error': f'{item_type.capitalize()} not found in personal queue'}), 404

# Error Handling
@api.errorhandler(404)
def not_found_error(error):
    return jsonify({'error': 'Not found'}), 404

@api.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# Register Blueprint
def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
    app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key_here'
    db.init_app(app)
    app.register_blueprint(api)
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

