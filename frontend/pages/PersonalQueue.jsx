import React, { useContext, useState, useEffect } from 'react';
import { FavoritesContext } from './FavoritesContext';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const PersonalQueue = () => {
  const { personalQueue } = useContext(FavoritesContext);
  
  // Function to handle playing a movie
  const handlePlay = (movieId) => {
    fetch(`/api/play/${movieId}`)
      .then(res => res.json())
      .then(data => {
        if (data.playUrl) {
          // Redirect to the streaming service's player URL
          window.location.href = data.playUrl;
        } else {
          console.error('Error: playUrl not found');
        }
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
                <Button onClick={() => handlePlay(movie.id)} variant="primary">Play</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PersonalQueue;
