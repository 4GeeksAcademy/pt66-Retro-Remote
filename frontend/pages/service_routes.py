from flask import Blueprint, jsonify, session

service_bp = Blueprint('service', __name__)

@service_bp.route('/api/linked-services')
def linked_services():
    # Fetch linked services from session or database
    services = ['spotify', 'netflix']  # Example
    return jsonify(services)

@service_bp.route('/api/personal-queue')
def personal_queue():
    # Fetch personal queue from database
    queue = [
        {'id': 1, 'title': 'Movie 1'},
        {'id': 2, 'title': 'Movie 2'}
    ]
    return jsonify(queue)

@service_bp.route('/api/play/<int:movie_id>')
def play_movie(movie_id):
    # Determine which service has the movie and generate the play URL
    # This is just a placeholder logic
    play_url = f"https://example.com/play/{movie_id}"
    return jsonify({'playUrl': play_url})
