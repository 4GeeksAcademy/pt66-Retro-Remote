import React, { useContext, useState, useEffect } from 'react';
import { FavoritesContext } from './FavoritesContext';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import ReactPlayer from 'react-player';

const PersonalQueue = () => {
  const { personalQueue } = useContext(FavoritesContext);
  const [currentMovieUrl, setCurrentMovieUrl] = useState('');

  console.log("PersonalQueue component - Personal Queue: ", personalQueue);

  const playMovie = (movieId) => {
    axios.get(`/api/movie/${movieId}/streaming`)
      .then(response => {
        const providers = response.data.results;
        // Assuming you want to use the first available streaming URL
        const streamingUrl = providers?.US?.link; // Adjust as necessary
        setCurrentMovieUrl(streamingUrl);
      })
      .catch(error => console.error('Error fetching streaming URL:', error));
  };
  useEffect(() => {
    fetch('/api/personal-queue')
      .then(res => res.json())
      .then(data => setQueue(data));
  }, []);

  const handlePlay = (movieId) => {
    fetch(`/api/play/${movieId}`)
      .then(res => res.json())
      .then(data => {
        // Redirect to the streaming service's player URL
        window.location.href = data.playUrl;
      })
      .catch(error => console.error('Error playing movie:', error));
  };

  return (
    <Container className="mt-5">
      <h1>Your Personal Queue</h1>
      <Row>
        {personalQueue.map((movie) => (
          <Col key={movie.id} sm={12} md={6} lg={4} xl={3} className="mb-4 movie-card">
            <Card>
              <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  <strong>Release Year:</strong> {new Date(movie.release_date).getFullYear()}
                </Card.Text>
                <Button onClick={() => playMovie(movie.id)} variant="primary">Play</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {currentMovieUrl && (
        <div className="mt-4">
          <ReactPlayer url={currentMovieUrl} controls width="100%" />
        </div>
      )}
    </Container>
  );
};

export default PersonalQueue;
