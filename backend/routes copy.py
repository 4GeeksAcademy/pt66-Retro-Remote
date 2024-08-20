from flask import Flask, request, jsonify, session, redirect
from backend.models import db, User, MovieFavorites, TvShowsFavorites  # Ensure all models are imported
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = 'your_secret_key'
CORS(app)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    new_user = User(email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and user.password == data['password']:
        session['user_id'] = user.id
        return jsonify({"message": "Login successful"})
    return jsonify({"message": "Invalid credentials"}), 401

@app.route('/private')
def private():
    if 'user_id' in session:
        return jsonify({"message": "Welcome to the private dashboard"})
    return redirect('/login')

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return jsonify({"message": "Logged out successfully"}), 200

@app.route('/api/favorites/movies', methods=['GET'])
def get_favorite_movies():
    user_id = request.args.get('user_id')  # Ensure consistent naming
    favorites = MovieFavorites.query.filter_by(user_id=user_id).all()
    return jsonify([fav.serialize() for fav in favorites])  # Ensure serialize method is correct

@app.route('/api/favorites/tv-shows', methods=['GET'])
def get_favorite_tv_shows():
    user_id = request.args.get('user_id')  # Ensure consistent naming
    favorites = TvShowsFavorites.query.filter_by(user_id=user_id).all()
    return jsonify([fav.serialize() for fav in favorites])

@app.route('/api/favorites/movies', methods=['POST'])
def add_favorite_movie():
    data = request.get_json()
    existing_favorite = MovieFavorites.query.filter_by(user_id=data['user_id'], movie_id=data['movie_id']).first()
    if existing_favorite:
        return jsonify({"message": "Movie already in favorites"}), 409
    new_favorite = MovieFavorites(user_id=data['user_id'], movie_id=data['movie_id'])
    db.session.add(new_favorite)
    db.session.commit()
    return jsonify(new_favorite.serialize()), 201

@app.route('/api/favorites/movie', methods=['DELETE'])
def remove_favorite_movie():
    data = request.get_json()
    favorite = MovieFavorites.query.filter_by(user_id=data['user_id'], movie_id=data['movie_id']).first()
    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return '', 204
    return jsonify({'error': 'Favorite not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)

