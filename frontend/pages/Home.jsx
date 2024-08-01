import React, { useContext, useEffect, useState } from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { FavoritesContext } from './FavoritesContext'; // Import the context
import { Link } from 'react-router-dom';
import Login from "./Login.jsx";
import "../style.css";
import { Navigate, useNavigate } from "react-router-dom";
import useGlobalReducer from '../hooks/useGlobalReducer';



 
const Home = () => 
  {const {store, dispatch} =useGlobalReducer()
const navigate = useNavigate();	
  useEffect(() => {if (!store.token){navigate("/Login")}} , []);
  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined)
      history("/");
  });
  const { favorites, toggleFavorite, addToPersonalQueue } = useContext(FavoritesContext); // Use the context
  const [httpbin, setHttpbin] = useState({});

  useEffect(() => {
    const getHttpBin = async () => {
      const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/relay");
      const data = await resp.json();
      setHttpbin(data);
    };
    getHttpBin();
  }, []);

  return (
    <Container className="mt-5">
      <Link to="/personal-queue">personalQueue</Link>
      <h1>Users Recommended Movies and TV</h1>
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
                <Link to={`/details/${movie.id}`}>
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
      <pre>{JSON.stringify(httpbin, null, 2)}</pre>
    </Container>
  );
};

export default Home;

