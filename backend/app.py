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

from flask import request, jsonify
from backend.models import db, User, MovieFavorites, TvShowFavorites, Movie, TvShow

@app.route('/api/favorites/toggle', methods=['POST'])
def toggle_favorite():
    data = request.json
    item_id = data['id']
    item_type = data['type']  # "movie" or "tv-show"
    user_id = data['user_id']

    if item_type == 'movie':
        favorite = MovieFavorites.query.filter_by(user_id=user_id, movie_id=item_id).first()
        movie = Movie.query.get(item_id)

        if favorite:
            db.session.delete(favorite)
            movie.fav_count -= 1
        else:
            new_favorite = MovieFavorites(user_id=user_id, movie_id=item_id)
            db.session.add(new_favorite)
            movie.fav_count += 1
        
        db.session.commit()
        return jsonify({"favCount": movie.fav_count})

    elif item_type == 'tv-show':
        favorite = TvShowFavorites.query.filter_by(user_id=user_id, tvShow_id=item_id).first()
        tv_show = TvShow.query.get(item_id)

        if favorite:
            db.session.delete(favorite)
            tv_show.fav_count -= 1
        else:
            new_favorite = TvShowFavorites(user_id=user_id, tvShow_id=item_id)
            db.session.add(new_favorite)
            tv_show.fav_count += 1
        
        db.session.commit()
        return jsonify({"favCount": tv_show.fav_count})

    return jsonify({"error": "Invalid type"}), 400


if __name__ == '__main__':
    app.run(debug=True)
