import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { FavoritesContext } from "./FavoritesContext"; // Import the context
import { Link} from "react-router-dom";
import Login from "./Loginform.jsx";
import "../style.css";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Navbar from "../components/Navbar.jsx";


const Home = () => {
  //  const [httpbin, setHttpbin] = useState({});
  const { store, dispatch } = useGlobalReducer();
  const {token} = store;
  const {id} = store;
  

  const [httpbin, setHttpbin] = useState({});
  const { favorites, toggleFavorite, addToPersonalQueue } = useContext(FavoritesContext); // Use the context

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

  const handleAddToQueue = (movie) => {
    const currentQueue = JSON.parse(localStorage.getItem('personalQueue')) || [];
    
    if (!currentQueue.some(item => item.id === movie.id)) {
      const updatedQueue = [...currentQueue, { ...movie, type: movie.type }];
      localStorage.setItem('personalQueue', JSON.stringify(updatedQueue));
      
      console.log(`${movie.title} added to queue:`, updatedQueue);
      alert(`${movie.title} has been added to your personal queue`);
    } else {
      console.log(`${movie.title} is already in the queue`);
      alert(`${movie.title} is already in your personal queue`);
    }
};

  return (
    <>
    <Navbar></Navbar>
    <Container className="mt-5">
      <Link to="/personal-queue">personalQueue</Link>
      {/* <pre>{JSON.stringify(httpbin, null, 2)}</pre> */}

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
                  onClick={() => handleAddToQueue(movie)} // Single-click to add to queue
                >
                  ➕
                </Button>
                <Button
                  variant="secondary"
                  onDoubleClick={() => handleDoubleClick(movie)} // Double-click to navigate
                >
                  👁️
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </>
  );
};

export default Home;
