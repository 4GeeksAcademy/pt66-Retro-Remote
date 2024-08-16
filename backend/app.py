from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

# Load the TMDB API Key from environment variable
TMDB_API_KEY = os.getenv('TMDB_API_KEY', 'your_api_key_here')

def get_streaming_providers_tmdb(movie_id):
    url = f'https://api.themoviedb.org/3/movie/{movie_id}/watch/providers'
    params = {
        'api_key': TMDB_API_KEY
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        response.raise_for_status()

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
    try:
        providers = get_streaming_providers_tmdb(movie_id)
        return jsonify(providers)
    except requests.HTTPError as e:
        return jsonify({'error': str(e)}), e.response.status_code

if __name__ == '__main__':
    app.run(debug=True)
