import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { FavoritesContext } from "./FavoritesContext"; // Import the context
import { Link} from "react-router-dom";
import Login from "./Loginform.jsx";
import "../style.css";
import { Navigate, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Navbar from "../components/Navbar.jsx";

const Home = () => {
  //  const [httpbin, setHttpbin] = useState({});
  const { store, dispatch } = useGlobalReducer();
  const {token} = store;
  const {id} = store;
  

  const [httpbin, setHttpbin] = useState({});
  const { favorites, toggleFavorite, addToPersonalQueue,addToWatchList } = useContext(FavoritesContext); // Use the context
  const navigate = useNavigate(); // Hook for navigation
  const isAuthenticated= localStorage.getItem('isAuthenticated')


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

  if(isAuthenticated && token){
    return ( 
      <>
      <Navbar></Navbar>
      <Container className="mt-5">
        <Link to="/personal-queue">My Watchlist</Link>
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
                    onClick={() => addToWatchList(movie)}
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
   
  }else {
    return <Login></Login>
  }

};

export default Home;

