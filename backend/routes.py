"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from backend.models import db, User, Reviews
from flask_cors import CORS
import requests



TMDB_API_KEY = 'f0d14b30a61125698e4990acdb103e21'


api = Blueprint('api', __name__, url_prefix="/api")

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
