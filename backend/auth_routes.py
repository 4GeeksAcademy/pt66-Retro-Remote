from flask import Blueprint, redirect, request, session, url_for
from your_oauth_client import OAuthClient

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/auth/<service>')
def auth_service(service):
    client = OAuthClient(service)
    auth_url = client.get_authorize_url()
    return redirect(auth_url)

@auth_bp.route('/auth/<service>/callback')
def auth_callback(service):
    client = OAuthClient(service)
    code = request.args.get('code')
    token = client.get_access_token(code)
    
    # Store token in session or database
    session[f'{service}_token'] = token

    return redirect(url_for('profile'))
