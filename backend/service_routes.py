from flask import Blueprint, jsonify, redirect, request, session
from oauth_client import OAuthClient

service_bp = Blueprint('service', __name__)

# Define credentials for each service
STREAMING_SERVICES = {
    'netflix': {
        'client_id': 'YOUR_NETFLIX_CLIENT_ID',
        'client_secret': 'YOUR_NETFLIX_CLIENT_SECRET',
        'redirect_uri': 'YOUR_NETFLIX_REDIRECT_URI',
        'scope': 'YOUR_NETFLIX_SCOPE',
    },
    'hulu': {
        'client_id': 'YOUR_HULU_CLIENT_ID',
        'client_secret': 'YOUR_HULU_CLIENT_SECRET',
        'redirect_uri': 'YOUR_HULU_REDIRECT_URI',
        'scope': 'YOUR_HULU_SCOPE',
    },
    # Add other services here
}

@service_bp.route('/api/oauth/authorize/<service_name>', methods=['GET'])
def oauth_authorize(service_name):
    credentials = STREAMING_SERVICES.get(service_name)
    if not credentials:
        return jsonify({'error': 'Service not supported'}), 400

    oauth_client = OAuthClient(service_name, **credentials)
    authorize_url = oauth_client.get_authorize_url()
    return redirect(authorize_url)

@service_bp.route('/api/oauth/callback/<service_name>', methods=['GET'])
def oauth_callback(service_name):
    code = request.args.get('code')
    if not code:
        return jsonify({'error': 'Authorization code not provided'}), 400

    credentials = STREAMING_SERVICES.get(service_name)
    if not credentials:
        return jsonify({'error': 'Service not supported'}), 400

    oauth_client = OAuthClient(service_name, **credentials)
    try:
        access_token = oauth_client.get_access_token(code)
        # Store access_token in session or database
        session[f'{service_name}_access_token'] = access_token
        return redirect('/profile')  # Redirect to a profile page or another route
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@service_bp.route('/api/linked-services')
def linked_services():
    services = ['hulu', 'netflix']  # Example
    return jsonify(services)
