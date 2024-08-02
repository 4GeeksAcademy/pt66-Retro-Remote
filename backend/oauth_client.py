import requests

class OAuthClient:
    def __init__(self, service_name):
        self.service_name = service_name
        self.client_id = 'YOUR_CLIENT_ID'
        self.client_secret = 'YOUR_CLIENT_SECRET'
        self.redirect_uri = 'YOUR_REDIRECT_URI'
        self.scope = 'YOUR_SCOPE'  # Define the scope you need

    def get_authorize_url(self):
        auth_url = f"https://{self.service_name}.com/oauth/authorize"
        return (
            f"{auth_url}?response_type=code"
            f"&client_id={self.client_id}"
            f"&redirect_uri={self.redirect_uri}"
            f"&scope={self.scope}"
        )

    def get_access_token(self, code):
        token_url = f"https://{self.service_name}.com/oauth/token"
        response = requests.post(token_url, data={
            'grant_type': 'authorization_code',
            'client_id': self.client_id,
            'client_secret': self.client_secret,
            'code': code,
            'redirect_uri': self.redirect_uri,
        })
        
        if response.status_code != 200:
            raise Exception(f"Error {response.status_code}: {response.text}")

        response_json = response.json()
        access_token = response_json.get('access_token')
        if not access_token:
            raise Exception("Access token not found in response")

        return access_token
