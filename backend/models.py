from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    # _tablename_ = 'user'
    username = db.Column(db.String(80), unique=True, nullable=False)
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    # reviews = db.relationship('Review', backref='user', lazy=True)
    # user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,

            # do not serialize the password, its a security breach
        }
    
