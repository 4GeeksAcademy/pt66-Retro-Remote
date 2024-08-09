from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/api/play/<movie_id>', methods=['GET'])
def play_movie(movie_id):
    app.logger.info(f"Received request to play movie with ID: {movie_id}")
    try:
        # Mockup of how you might fetch streaming service data
        streaming_services = [
            {'name': 'Netflix', 'url': 'https://www.netflix.com'},
            {'name': 'Hulu', 'url': 'https://www.hulu.com'},
            {'name': 'Peacock', 'url': 'https://www.peacocktv.com'},
            {'name': 'Prime Video', 'url': 'https://www.amazon.com/PrimeVideo'},
            # Add more streaming services here
        ]

        response = jsonify({'streamingServices': streaming_services})
        response.status_code = 200
        return response

    except Exception as e:
        app.logger.error(f"Error processing movie ID {movie_id}: {str(e)}")
        return jsonify({'error': 'An error occurred'}), 500

if __name__ == '__main__':
    app.run(debug=True)
