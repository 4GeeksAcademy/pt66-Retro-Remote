from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import bcrypt

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from backend.models import db, User, MovieFavorites, TvShowFavorites, Movie, TvShow
from backend.routes import create_token, create_user, get_user, get_top_rated_movies, get_movie_cast, get_tv_show_details,  get_top_rated_shows, get_movie_details, get_tv_show_cast, search, toggle_favorite_movie, add_favorite, remove_favorite, add_review, get_movie_streaming_services, get_tv_show_streaming_services, add_to_personal_queue, get_personal_queue, remove_from_personal_queue, not_found_error, internal_error

app = Flask(__name__)
CORS(app)
db.init_app(app)


bcrypt = Bcrypt(app)

# Register Blueprint
#
#     app = Flask(__name__)
#     app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
#     app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key_here'
#     db.init_app(app)
#     app.register_blueprint(api)
#     return app

TMDB_API_KEY = 'c2fbec3b6737ac039d19ec2bc0281187'

@app.route("/login", methods=['POST'])
def token():
    return create_token()

@app.route("/signup", methods=['POST'])
def register():
    return create_user()

@app.route("/user", methods=['GET'])
@jwt_required()
def user_by_jwt():
    return get_user()

@app.route('/top-rated/movies', methods=['GET'])
def top_rated_movies():
    return get_top_rated_movies()

@app.route('/top-rated/shows', methods=['GET'])
def top_rated_shows():
    return get_top_rated_shows()

@app.route('/movieDetails', methods=['GET'])
def movie_details():
    return get_movie_details()

@app.route('/movieCast', methods=['GET'])
def movie_cast():
    return get_movie_cast()

@app.route('/tvShowDetails', methods=['GET'])
def tv_show_details():
    return get_tv_show_details()

@app.route('/tvShowCast', methods=['GET'])
def tv_show_cast():
    return get_tv_show_cast()

@app.route('/search', methods=['GET'])
def query():
    return search()

@app.route('/api/favorites/<int:movie_id>/toggle', methods=['POST'])
@jwt_required()
def toggle_fav_movie(movie_id):
    return  toggle_favorite_movie(movie_id)

@app.route('/api/favorites/<int:movie_id>/add', methods=['POST'])
@jwt_required()
def add_fave(movie_id):
    return add_favorite(movie_id)

@app.route('/api/favorites/<int:movie_id>/remove', methods=['POST'])
@jwt_required()
def remove_fave(movie_id):
    return remove_favorite(movie_id)

@app.route("/review", methods=["POST"])
def review():
     body = request.json
     return add_review(body)   

@app.route('/play/movie/<int:movie_id>', methods=['GET']) 
def movie_streaming(movie_id):
    return get_movie_streaming_services(movie_id)

@app.route('/play/tv/<int:episode_id>', methods=['GET'])
def tv_show_streaming(episode_id):
    return get_tv_show_streaming_services(episode_id)

@app.route('/personal-queue', methods=['POST'])
@jwt_required()
def personal_queue():
    data = request.get_json()
    return add_to_personal_queue(data)

@app.route('/personal-queue', methods=['GET'])
@jwt_required()
def get_queue():
    return get_personal_queue()

@app.route('/personal-queue/<int:item_id>', methods=['DELETE'])
@jwt_required()
def remove_from_queue(item_id):
    return remove_from_personal_queue(item_id)

@app.errorhandler(404)
def not_found(error):
    return not_found_error(error)

@app.errorhandler(500)
def inter_error(error):
    return internal_error(error)

# def get_streaming_providers_tmdb(movie_id):
#     url = f'https://api.themoviedb.org/3/movie/{movie_id}/watch/providers'
#     headers = {
#         'Authorization': f'Bearer {TMDB_API_KEY}',
#     }
#     response = requests.get(url, headers=headers)
#     return response.json()

# def get_streaming_providers_reelgood(movie_id):
#     # Replace with actual Reelgood API URL and headers if needed
#     url = f'https://api.reelgood.com/v1.0/deeplink/movie/{movie_id}'
#     headers = {
#         'Authorization': f'Bearer {REELGOOD_API_KEY}',
#     }
#     response = requests.get(url, headers=headers)
#     return response.json()

# @app.route('/api/personal-queue', methods=['GET'])
# def get_personal_queue():
#     # Replace with actual data fetching logic
#     personal_queue = [
#         {'id': 550, 'title': 'Fight Club'},
#         {'id': 299536, 'title': 'Avengers: Infinity War'},
#     ]
#     return jsonify(personal_queue)

# @app.route('/api/movie/<int:movie_id>/streaming', methods=['GET'])
# def get_movie_streaming(movie_id):
#     # For TMDB streaming providers
#     providers = get_streaming_providers_tmdb(movie_id)
#     return jsonify(providers)

# @app.route('/api/reelgood/movie/<int:movie_id>/streaming', methods=['GET'])
# def get_movie_streaming_reelgood(movie_id):
#     # For Reelgood streaming providers
#     providers = get_streaming_providers_reelgood(movie_id)
#     return jsonify(providers)



# @app.route('/api/favorites/toggle', methods=['POST'])
# def toggle_favorite():
#     data = request.json
#     item_id = data['id']
#     item_type = data['type']  # "movie" or "tv-show"
#     user_id = data['user_id']

#     if item_type == 'movie':
#         favorite = MovieFavorites.query.filter_by(user_id=user_id, movie_id=item_id).first()
#         movie = Movie.query.get(item_id)

#         if favorite:
#             db.session.delete(favorite)
#             movie.fav_count -= 1
#         else:
#             new_favorite = MovieFavorites(user_id=user_id, movie_id=item_id)
#             db.session.add(new_favorite)
#             movie.fav_count += 1
        
#         db.session.commit()
#         return jsonify({"favCount": movie.fav_count})

#     elif item_type == 'tv-show':
#         favorite = TvShowFavorites.query.filter_by(user_id=user_id, tvShow_id=item_id).first()
#         tv_show = TvShow.query.get(item_id)

#         if favorite:
#             db.session.delete(favorite)
#             tv_show.fav_count -= 1
#         else:
#             new_favorite = TvShowFavorites(user_id=user_id, tvShow_id=item_id)
#             db.session.add(new_favorite)
#             tv_show.fav_count += 1
        
#         db.session.commit()
#         return jsonify({"favCount": tv_show.fav_count})

#     return jsonify({"error": "Invalid type"}), 400


# # if __name__ == '__main__':
# #     app.run(debug=True)

#     # Initialize Blueprint for API routes


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
