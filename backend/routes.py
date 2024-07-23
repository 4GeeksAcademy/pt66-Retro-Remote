from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import requests

app = Flask(__name__)
CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///yourdatabase.db'  # Example for SQLite
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

TMDB_API_KEY = 'f6baeddacfa89dbde94bc3da34db9694'

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False, default=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

api = Blueprint('api', __name__, url_prefix="/api")

@api.route('/top-rated/movies', methods=['GET'])
def get_top_rated_movies():
    try:
        response = requests.get(f'https://api.themoviedb.org/3/movie/top_rated?api_key={TMDB_API_KEY}')
        response.raise_for_status()  # Raises an HTTPError if the response was an error
        return jsonify(response.json().get('results', []))
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

@api.route('/top-rated/shows', methods=['GET'])
def get_top_rated_shows():
    try:
        response = requests.get(f'https://api.themoviedb.org/3/tv/top_rated?api_key={TMDB_API_KEY}')
        response.raise_for_status()
        return jsonify(response.json().get('results', []))
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




