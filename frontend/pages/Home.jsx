import React, { useContext, useEffect, useState } from "react";
import { Carousel, Card, Button, Container } from "react-bootstrap";
import { FavoritesContext } from "./FavoritesContext"; // Import the context
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Navbar from "../components/Navbar.jsx";
import axios from 'axios';
import Login from "./Loginform.jsx"

const Home = () => {
  const { store } = useGlobalReducer();
  const { token } = store;
  const [favMovies, setFavMovies] = useState([]);
  const [favTVShows, setFavTVShows] = useState([]);
  const navigate = useNavigate();
  const { favorites, toggleFavorite, addToWatchList } = useContext(FavoritesContext); // Use the context
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const movieResponse = await axios.get('/api/favorites/movies');
        setFavMovies(movieResponse.data);

        const tvShowResponse = await axios.get('/api/favorites/tv-shows');
        setFavTVShows(tvShowResponse.data);
      } catch (error) {
        console.error('Error fetching favored movies or TV shows:', error);
      }
    };

    getFavorites();
  }, []);

  if (token !==null ) {
    return (
      <>
        <Navbar />
        <Container className="mt-5">
          <Link to="/personal-queue">My Watchlist</Link>
          <h1 className="mt-4">Users Recommended Movies and TV</h1>

          <h2 className="mt-4">Top 10 Favored Movies</h2>
          <Carousel>
            {favMovies.map((movie, index) => (
              <Carousel.Item key={movie.id}>
                <Card className="movie-card">
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                  <Card.Body>
                    <Card.Title>{index + 1}. {movie.title}</Card.Title>
                    <Card.Text>
                      <strong>Release Year:</strong> {new Date(movie.release_date).getFullYear()}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between align-items-center">
                    <Button variant="primary" onClick={() => toggleFavorite(movie)}>
                      ⭐ {movie.stars}
                    </Button>
                    <Link to={`/movie/${movie.id}`}>
                      <Button variant="dark" style={{ color: 'white' }}>
                        Details
                      </Button>
                    </Link>
                    <Button
                      variant="secondary"
                      onClick={() => addToWatchList(movie)}
                    >
                      👁️
                    </Button>
                  </Card.Footer>
                </Card>
              </Carousel.Item>
            ))}
          </Carousel>

          <h2 className="mt-4">Top 10 Favored TV Shows</h2>
          <Carousel>
            {favTVShows.map((show, index) => (
              <Carousel.Item key={show.id}>
                <Card className="tvshow-card">
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  />
                  <Card.Body>
                    <Card.Title>{index + 1}. {show.title}</Card.Title>
                    <Card.Text>
                      <strong>Release Year:</strong> {new Date(show.release_date).getFullYear()}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between align-items-center">
                    <Button variant="primary" onClick={() => toggleFavorite(show)}>
                      ⭐ {show.stars}
                    </Button>
                    <Link to={`/tv-show/${show.id}`}>
                      <Button variant="dark" style={{ color: 'white' }}>
                        Details
                      </Button>
                    </Link>
                    <Button
                      variant="secondary"
                      onClick={() => addToWatchList(show)}
                    >
                      👁️
                    </Button>
                  </Card.Footer>
                </Card>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </>
    );
  } else {
    <Login></Login>
  }
};

export default Home;




