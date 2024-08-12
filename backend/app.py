from flask import Flask, jsonify, request
import requests

app = Flask(__name__)

TMDB_API_KEY = 'c2fbec3b6737ac039d19ec2bc0281187'
REELGOOD_API_KEY = 'YOUR_REELGOOD_API_KEY'

def get_streaming_providers_tmdb(movie_id):
    url = f'https://api.themoviedb.org/3/movie/{movie_id}/watch/providers'
    headers = {
        'Authorization': f'Bearer {TMDB_API_KEY}',
    }
    response = requests.get(url, headers=headers)
    return response.json()

def get_streaming_providers_reelgood(movie_id):
    # Replace with actual Reelgood API URL and headers if needed
    url = f'https://api.reelgood.com/v1.0/deeplink/movie/{movie_id}'
    headers = {
        'Authorization': f'Bearer {REELGOOD_API_KEY}',
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

@app.route('/api/reelgood/movie/<int:movie_id>/streaming', methods=['GET'])
def get_movie_streaming_reelgood(movie_id):
    # For Reelgood streaming providers
    providers = get_streaming_providers_reelgood(movie_id)
    return jsonify(providers)

if __name__ == '__main__':
    app.run(debug=True)
