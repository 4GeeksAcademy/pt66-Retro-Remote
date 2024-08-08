from flask import Blueprint, redirect, request, session, url_for, jsonify
from oauth_client import OAuthClient

auth_bp = Blueprint('auth', __name__)

# Example credentials for services
STREAMING_SERVICES = {
    'netflix': {
        'client_id': 'YOUR_NETFLIX_CLIENT_ID',
        'client_secret': 'YOUR_NETFLIX_CLIENT_SECRET',
        'redirect_uri': 'YOUR_REDIRECT_URI',
        'scope': 'YOUR_NETFLIX_SCOPE',
    },
    'hulu': {
        'client_id': 'YOUR_HULU_CLIENT_ID',
        'client_secret': 'YOUR_HULU_CLIENT_SECRET',
        'redirect_uri': 'YOUR_REDIRECT_URI',
        'scope': 'YOUR_HULU_SCOPE',
    },
    'peacock': {
        'client_id': 'YOUR_PEACOCK_CLIENT_ID',
        'client_secret': 'YOUR_PEACOCK_CLIENT_SECRET',
        'redirect_uri': 'YOUR_REDIRECT_URI',
        'scope': 'YOUR_PEACOCK_SCOPE',
    },
    'prime': {
        'client_id': 'YOUR_PRIME_CLIENT_ID',
        'client_secret': 'YOUR_PRIME_CLIENT_SECRET',
        'redirect_uri': 'YOUR_REDIRECT_URI',
        'scope': 'YOUR_PRIME_SCOPE',
    }
}

@auth_bp.route('/auth/<service>')
def auth_service(service):
    try:
        credentials = STREAMING_SERVICES.get(service)
        if not credentials:
            return jsonify({'error': 'Service not supported'}), 400

        client = OAuthClient(service, **credentials)
        auth_url = client.get_authorize_url()
        return redirect(auth_url)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/auth/<service>/callback')
def auth_callback(service):
    try:
        credentials = STREAMING_SERVICES.get(service)
        if not credentials:
            return jsonify({'error': 'Service not supported'}), 400

        client = OAuthClient(service, **credentials)
        code = request.args.get('code')
        if not code:
            return jsonify({'error': 'Authorization code is missing'}), 400

        token = client.get_access_token(code)

        # Optionally get user info
        user_info = client.get_user_info(token)

        # Store token and user info in session or database
        session[f'{service}_token'] = token
        session[f'{service}_user_info'] = user_info

        # Redirect to a profile page or another route
        return redirect(url_for('profile'))
    except Exception as e:
        return jsonify({'error': str(e)}), 500
