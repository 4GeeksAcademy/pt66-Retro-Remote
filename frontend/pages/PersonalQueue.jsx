import React, { useContext, useState } from 'react';
import { FavoritesContext } from './FavoritesContext';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';

const PersonalQueue = () => {
  const { personalQueue } = useContext(FavoritesContext);
  const [showModal, setShowModal] = useState(false);
  const [streamingOptions, setStreamingOptions] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handlePlay = (movieId) => {
    console.log('Requesting play for movie ID:', movieId);
    fetch(`/api/play/${movieId}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(data => {
        console.log('Streaming services data:', data);
        if (data.streamingServices && data.streamingServices.length > 0) {
          setStreamingOptions(data.streamingServices);
          setSelectedMovie(movieId);
          setShowModal(true);
        } else {
          console.error('Error: No streaming services found');
        }
      })
      .catch(error => {
        console.error('Error fetching streaming services:', error);
      });
  };

  const handleServiceSelect = (url) => {
    console.log('Redirecting to streaming service URL:', url);
    window.location.href = url; // Redirects the user to the selected streaming service URL
  };

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
                <Button onClick={() => handlePlay(movie.id)} variant="primary">Play</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal to show streaming service options */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select a Streaming Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {streamingOptions.map((service, index) => (
            <Button
              key={index}
              onClick={() => handleServiceSelect(service.url)}
              className="mb-2"
              block
            >
              {service.name}
            </Button>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PersonalQueue;
