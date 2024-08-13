from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    # _tablename_ = 'user'
    username = db.Column(db.String(80), unique=True, nullable=False)
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    reviews = db.relationship("Reviews", backref="user", lazy=True)
    movieFavorites = db.relationship("MovieFavorites", backref="user", lazy=True)
    tvShowFavorites = db.relationship("TvShowFavorites", backref="user", lazy=True)
    WatchlistItems = db.relationship("WatchlistItems", backref="user", lazy=True)
    

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "reviews": [review.serialize() for review in self.reviews],
            "movieFavorites": [fav.serialize() for fav in self.movieFavorites],
            "tvShowFavorites": [fav.serialize() for fav in self.tvShowFavorites]
            # do not serialize the password, its a security breach
        }

class Reviews(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    review=db.Column(db.Text,nullable=False)
    movie_id=db.Column(db.Integer,nullable=False)
    username=db.Column(db.String(80), db.ForeignKey('user.username'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "movie_id": self.movie_id,
            "username": self.username,
        }

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    release_date = db.Column(db.Date, nullable=False)
    poster_path = db.Column(db.String(255), nullable=False)
    fav_count = db.Column(db.Integer, default=0)  # New field to track favorite count

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "release_date": self.release_date,
            "poster_path": self.poster_path,
            "fav_count": self.fav_count
        }

class TvShow(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    release_date = db.Column(db.Date, nullable=False)
    poster_path = db.Column(db.String(255), nullable=False)
    fav_count = db.Column(db.Integer, default=0)  # New field to track favorite count

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "release_date": self.release_date,
            "poster_path": self.poster_path,
            "fav_count": self.fav_count
        }


class MovieFavorites(db.Model):
    __tablename__ = 'movieFavorites'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    movie_id = db.Column(db.Integer, primary_key=True)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "movie_id": self.movie_id,
        } 
    

class TvShowFavorites(db.Model):
        __tablename__ = 'tvShowFavorites'
        id = db.Column(db.Integer, primary_key=True)
        user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
        tvShow_id = db.Column(db.Integer, primary_key=True)

        def serialize(self):
            return {
                "id": self.id,
                "user_id": self.user_id,
                "tvShow_id": self.tvShow_id,
            } 
        
class WatchlistItems(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        content_type = db.Column(db.String(50), nullable=False)  # 'movie' or 'tv_show'
        content_id = db.Column(db.Integer, nullable=False)
        user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

        def serialize(self):
            return {
                "id": self.id,
                "content_type": self.content_type,
                "content_id": self.content_id,
                "user_id": self.user_id,
        }

         