import React, { useContext } from 'react';
import { FavoritesContext } from './FavoritesContext';
import { Container, Row, Col, Card } from 'react-bootstrap';

const PersonalQueue = () => {
  const { personalQueue } = useContext(FavoritesContext);

  console.log("PersonalQueue component - Personal Queue: ", personalQueue);

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
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PersonalQueue;









