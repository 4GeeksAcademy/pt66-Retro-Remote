from flask import Blueprint, jsonify, redirect
from config import STREAMING_SERVICES

service_bp = Blueprint('service', __name__)

# This dictionary maps movie IDs to streaming services for demonstration purposes.
# Replace with dynamic mapping as needed.
MOVIE_STREAMING_SERVICE_MAPPING = {
    1: 'netflix',
    2: 'hulu',
    3: 'prime',
    4: 'peacock',
    5: 'zeus',
    6: 'hbo_max',
    7: 'starz',
    8: 'ifc',
    # Add more mappings based on your needs
}

@service_bp.route('/api/play/<int:movie_id>', methods=['GET'])
def get_streaming_services(movie_id):
    # Find the streaming service for the given movie_id
    service_name = MOVIE_STREAMING_SERVICE_MAPPING.get(movie_id)
    
    if not service_name or service_name not in STREAMING_SERVICES:
        # Return an error if the streaming service is not found
        return jsonify({'error': 'Streaming service not found'}), 404
    
    # Redirect to the appropriate streaming service URL
    streaming_service_url = STREAMING_SERVICES[service_name]['url']
    return jsonify({'streamingServices': [{'name': service_name, 'url': streaming_service_url}]})

@service_bp.route('/api/oauth/authorize/<service_name>', methods=['GET'])
def oauth_authorize(service_name):
    service = STREAMING_SERVICES.get(service_name)
    if not service:
        return jsonify({'error': 'Service not supported'}), 400

    # Redirect to the service's home page or sign-in page
    return redirect(service['url'])

@service_bp.route('/api/oauth/callback/<service_name>', methods=['GET'])
def oauth_callback(service_name):
    # Handle OAuth callback if needed, otherwise this can be a placeholder
    return jsonify({'message': 'Callback URL, handle as needed'}), 200

@service_bp.route('/api/linked-services')
def linked_services():
    services = list(STREAMING_SERVICES.keys())
    return jsonify(services)
