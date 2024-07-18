// Home.jsx and PersonalQueue.jsx (relevant part)
import React, { useContext } from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import { FavoritesContext } from '../FavoritesContext'; // Import the context

const Home = () => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext); // Use the context

  return (
    <Container className="mt-5">
      {/* Rest of your component code */}
    </Container>
  );
};

export default Home;

// PersonalQueue.jsx (relevant part)
const PersonalQueue = () => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext); // Use the context

  return (
    <Container className="mt-5">
      {/* Rest of your component code */}
    </Container>
  );
};
