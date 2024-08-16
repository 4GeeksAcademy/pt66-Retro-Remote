from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    reviews = db.relationship("Reviews", backref="user", lazy=True)
    movie_favorites = db.relationship("MovieFavorites", backref="user", lazy=True)
    tv_show_favorites = db.relationship("TvShowFavorites", backref="user", lazy=True)

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "reviews": [review.serialize() for review in self.reviews],
            "movieFavorites": [fav.serialize() for fav in self.movie_favorites],
            "tvShowFavorites": [fav.serialize() for fav in self.tv_show_favorites]
            # do not serialize the password, its a security breach
        }

class Reviews(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.Text, nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "review": self.review,
            "movie_id": self.movie_id,
            "user_id": self.user_id,
        }

class Movie(db.Model):
    __tablename__ = 'movie'
    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer, nullable=False, unique=True)
    title = db.Column(db.String(255), nullable=False)
    release_date = db.Column(db.Date, nullable=False)
    poster_path = db.Column(db.String(255), nullable=False)
    fav_count = db.Column(db.Integer, default=0)

    # Define the relationship with MovieFavorites
    movie_favorites = db.relationship('MovieFavorites', backref='movie', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "movie_id": self.movie_id,
            "title": self.title,
            "release_date": self.release_date,
            "poster_path": self.poster_path,
            "fav_count": self.fav_count
        }

class MovieFavorites(db.Model):
    __tablename__ = 'movie_favorites'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'), nullable=False)

    # Define the relationship with User and Movie
    user = db.relationship('User', back_populates='movie_favorites')
    movie = db.relationship('Movie', back_populates='movie_favorites')

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "movie_id": self.movie_id,
        }

class Tv_show(db.Model):
    __tablename__ = 'tv_show'
    id = db.Column(db.Integer, primary_key=True)
    tv_show_id = db.Column(db.Integer, nullable=False, unique=True)
    title = db.Column(db.String(255), nullable=False)
    release_date = db.Column(db.Date, nullable=False)
    poster_path = db.Column(db.String(255), nullable=False)
    fav_count = db.Column(db.Integer, default=0)

    tv_show_favorites = db.relationship('TvShowFavorites', backref='tv_show', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "tv_show_id": self.tv_show_id,
            "title": self.title,
            "release_date": self.release_date,
            "poster_path": self.poster_path,
            "fav_count": self.fav_count
        }

class TvShowFavorites(db.Model):
    __tablename__ = 'tv_show_favorites'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    tv_show_id = db.Column(db.Integer, db.ForeignKey('tv_show.id'), nullable=False)

    user = db.relationship('User', back_populates='tv_show_favorites')
    tv_show = db.relationship('Tv_show', back_populates='tv_show_favorites')

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "tv_show_id": self.tv_show_id,
        }
