import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { FavoritesContext } from '../pages/FavoritesContext'; // Import the context
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEye } from '@fortawesome/free-solid-svg-icons';
import '../index.css'; // Import the CSS file

const API_KEY = 'c2fbec3b6737ac39d91ec2bc021181f7';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMWZkZGM2YTI2MWJiMDI4MTE4ZTJlYTM5IzOTJlY2MTJiY2ZlMzNDNUDSO54';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const { favorites, toggleFavorite, addToPersonalQueue } = useContext(FavoritesContext);

  useEffect(() => {
    console.log("Home component mounted");

    const fetchContent = async () => {
      try {
        const moviesResponse = await axios.get('https://api.themoviedb.org/3/trending/movie/week', {
          headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/json;charset=utf-8'
          }
        });
        console.log("Movies API response:", moviesResponse.data.results);
        setMovies(moviesResponse.data.results);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };
    fetchContent();
  }, []);

  console.log("FavoritesContext in Home:", favorites, toggleFavorite, addToPersonalQueue);

  return (
    <Container className="mt-5">
      <div className="text-center">
        <h1>Retro Remote!</h1>
      </div>
      <h1 className="mt-5">Movies</h1>
      <Row>
        {movies.map((movie) => (
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
                  variant={favorites.find(fav => fav.id === movie.id) ? 'primary' : 'outline-primary'}
                  onClick={() => toggleFavorite(movie)}
                >
                  <FontAwesomeIcon icon={faStar} /> {favorites.find(fav => fav.id === movie.id) ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button variant="info" onClick={() => addToPersonalQueue(movie)}>
                  <FontAwesomeIcon icon={faEye} /> Add to Queue
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


































