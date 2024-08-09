import React, { useEffect, useState, useContext } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FavoritesContext } from './FavoritesContext'; // Import the context

const Home = () => {
  const [httpbin, setHttpbin] = useState({});
  const { favorites, toggleFavorite, addToPersonalQueue } = useContext(FavoritesContext); // Use the context
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const getHttpBin = async () => {
      const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/relay");
      const data = await resp.json();
      setHttpbin(data);
    };
    getHttpBin();
  }, []);

  const handleDoubleClick = (movie) => {
    addToPersonalQueue(movie);
    navigate('/personal-queue'); // Redirect to the personal queue page
  };

  return (
    <Container className="mt-5">
      <Link to="/personal-queue">personalQueue</Link>
      <pre>{JSON.stringify(httpbin, null, 2)}</pre>

      <h1 className="mt-4">Users Recommended Movies and TV</h1>
      <Row>
        {favorites.map((movie) => (
          <Col key={movie.id} sm={12} md={6} lg={4} xl={3}>
            <Card className="mb-4 movie-card">
              <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  <strong>Release Year:</strong> {new Date(movie.release_date).getFullYear()}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between align-items-center">
                <Button
                  variant="primary"
                  onClick={() => toggleFavorite(movie)}
                >
                  ⭐ {movie.stars}
                </Button>
                <Link to={`/movie/${movie.id}`}>
                  <Button
                    variant="dark"
                    style={{ color: 'white' }}
                  >
                    Details
                  </Button>
                </Link>
                <Button
                  variant="secondary"
                  onClick={() => addToPersonalQueue(movie)}
                  onDoubleClick={() => handleDoubleClick(movie)} // Handle double-click
                >
                  👁️
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
