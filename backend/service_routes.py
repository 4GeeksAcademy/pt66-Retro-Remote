import requests
from flask import Blueprint, jsonify, redirect

service_bp = Blueprint('service', __name__)

# Define streaming services and their URLs
STREAMING_SERVICES = {
    'netflix': {'url': 'https://www.netflix.com'},
    'hulu': {'url': 'https://www.hulu.com'},
    'prime': {'url': 'https://www.primevideo.com'},
    'peacock': {'url': 'https://www.peacocktv.com'},
    'zeus': {'url': 'https://www.thezeusnetwork.com'},
    'hbo_max': {'url': 'https://www.hbomax.com'},
    'starz': {'url': 'https://www.starz.com'},
    'ifc': {'url': 'https://www.ifc.com'}
}

@service_bp.route('/api/play/movie/<int:movie_id>', methods=['GET'])
def get_movie_streaming_services(movie_id):
    service_id = 'your_service_id'
    platform_id = 'your_platform_id'
    api_key = 'your_api_key'
    
    url = f"https://api.example.com/v1.0/deeplink/tv/services/{service_id}/platforms/{platform_id}/movie/{movie_id}"
    headers = {
        'Authorization': f'Bearer {api_key}'
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        return jsonify({
            "streamingServices": data.get('platforms', [])
        })
    else:
        return jsonify({"error": "Unable to fetch streaming services"}), response.status_code

@service_bp.route('/api/play/tv/<int:episode_id>', methods=['GET'])
def get_tv_show_streaming_services(episode_id):
    service_id = 'your_service_id'
    platform_id = 'your_platform_id'
    api_key = 'your_api_key'
    
    url = f"https://api.example.com/v1.0/deeplink/tv/services/{service_id}/platforms/{platform_id}/episode/{episode_id}"
    headers = {
        'Authorization': f'Bearer {api_key}'
    }
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        return jsonify({
            "streamingServices": data.get('platforms', [])
        })
    else:
        return jsonify({"error": "Unable to fetch streaming services"}), response.status_code

# Other routes (e.g., OAuth) remain unchanged
