import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { FavoritesContext } from "./FavoritesContext"; // Import the context
import { Link } from "react-router-dom";
import Login from "./Loginform.jsx";
import "../style.css";
import { Navigate, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Home = () => {
  const [httpbin, setHttpbin] = useState({});
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  // Commented for bugfixing.
  // useEffect(() => {
  //   if (!store.token) {
  //     navigate("/Login");
  //   }
  // }, []);

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined)
      history("/");
  });
  const { favorites, toggleFavorite, addToPersonalQueue } =
    useContext(FavoritesContext); // Use the context
  const [httpbin, setHttpbin] = useState({});

  useEffect(() => {
    console.log('Location changed:', location);
    async function fetchInitialData() {
      try {
        console.log('Fetching initial data...');
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
          }
        };
        const resp = await fetch('https://api.themoviedb.org/3/movie/1022789?language=en-US&api_key=f0d14b30a61125698e4990acdb103e21', options);
        const data = await resp.json();
        console.log('Fetched data:', data);
        setMovieId(data.id);
        dispatch({ type: 'set_movies', payload: data.results ? data.results : [data] });
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    }

    fetchInitialData();
  }, [dispatch, location.key]);

  return (
    <Container className="mt-5">
      <Link to="/personal-queue">personalQueue</Link>
      <pre>{JSON.stringify(httpbin, null, 2)}</pre>

      <h1 className="mt-4">Users Recommended Movies and TV</h1>
      <Row>
        {favorites.map((movie) => (
          <Col key={movie.id} sm={12} md={6} lg={4} xl={3}>
            <Card className="mb-4 movie-card">
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                  <strong>Release Year:</strong>{" "}
                  {new Date(movie.release_date).getFullYear()}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between align-items-center">
                <Button variant="primary" onClick={() => toggleFavorite(movie)}>
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
