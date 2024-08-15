from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

TMDB_API_KEY = 'c2fbec3b6737ac039d19ec2bc0281187'


def get_streaming_providers_tmdb(movie_id):
    url = f'https://api.themoviedb.org/3/movie/{movie_id}/watch/providers'
    headers = {
        'Authorization': f'Bearer {TMDB_API_KEY}',
    }
    response = requests.get(url, headers=headers)
    return response.json()


@app.route('/api/personal-queue', methods=['GET'])
def get_personal_queue():
    # Replace with actual data fetching logic
    personal_queue = [
        {'id': 550, 'title': 'Fight Club'},
        {'id': 299536, 'title': 'Avengers: Infinity War'},
    ]
    return jsonify(personal_queue)

@app.route('/api/movie/<int:movie_id>/streaming', methods=['GET'])
def get_movie_streaming(movie_id):
    # For TMDB streaming providers
    providers = get_streaming_providers_tmdb(movie_id)
    return jsonify(providers)



