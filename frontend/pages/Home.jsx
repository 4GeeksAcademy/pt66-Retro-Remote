import React from 'react';
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import '../index.css'; // Import the CSS file

const moviesInTheaters = [
  {
    id: 1,
    title: 'Movie Title 1',
    director: 'Director 1',
    releaseYear: 2024,
    image: 'path/to/image1.jpg',
  },
  // Add more movie objects here
];

const trendingContent = [
  {
    id: 1,
    title: 'Trending Movie 1',
    director: 'Director 1',
    releaseYear: 2024,
    image: 'path/to/image1.jpg',
    streamingService:'Hulu'
  },
  {
    id: 2,
    title: 'Trending Series 1',
    director: 'Director 2',
    releaseYear: 2023,
    image: 'path/to/image2.jpg',
    streamingService:'Amazon'
  },
  {
    id: 3,
    title: 'Trending Documentary 1',
    director: 'Director 3',
    releaseYear: 2022,
    image: 'path/to/image3.jpg',
    streamingService:'Netflix'
  },
  // Add more content objects here
];

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <Container className="mt-5">
      <div className="text-center">
        <h1>Retro Remote!!</h1>
        <p>
          <img src={rigoImageUrl} alt="Rigo" />
        </p>
      </div>

      <h1 className="mt-5">Movies in Theaters</h1>
      <Row>
        {moviesInTheaters.map((movie) => (
          <Col key={movie.id} sm={12} md={6} lg={4} xl={3}>
            <Card className="mb-4">
              <Card.Img variant="top" src={movie.image} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  <strong>Director:</strong> {movie.director}
                  <br />
                  <strong>Release Year:</strong> {movie.releaseYear}
                </Card.Text>
                <textarea
                  className="form-control mb-2"
                  maxLength="361"
                  placeholder="Add your review (max 361 characters)"
                ></textarea>
                <Button variant="outline-primary">Favorite ★</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h1 className="mt-5">Trending</h1>
      <Row>
        {trendingContent.map((content) => (
          <Col key={content.id} sm={12} md={6} lg={4} xl={3}>
            <Card className="mb-4">
              <Card.Img variant="top" src={content.image} />
              <Card.Body>
                <Card.Title>{content.title}</Card.Title>
                <Card.Text>
                  <strong>Director:</strong> {content.director}
                  <br />
                  <strong>Release Year:</strong> {content.releaseYear}
                </Card.Text>
                <textarea
                  className="form-control mb-2"
                  maxLength="361"
                  placeholder="Add your review (max 361 characters)"
                ></textarea>
                <Button variant="outline-primary">Favorite ★</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
