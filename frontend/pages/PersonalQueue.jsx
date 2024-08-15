import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "../style.css";

const PersonalQueue = () => {
  const [queueItems, setQueueItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load queue items from local storage when the component mounts
    const storedQueueItems = JSON.parse(localStorage.getItem('personalQueue')) || [];
    setQueueItems(storedQueueItems);
  }, []);

  const removeItemFromQueue = (itemId) => {
    setQueueItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId);
      localStorage.setItem('personalQueue', JSON.stringify(updatedItems)); // Update local storage
      return updatedItems;
    });
  };

  return (
    <Container>
      <h1 className="mt-4">Personal Queue</h1>
      <Row>
        {queueItems.length > 0 ? (
          queueItems.map((item) => (
            <Col key={item.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    <strong>Release Year:</strong> {new Date(item.release_date).getFullYear()}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                  <Button
                    variant="secondary"
                    onClick={() => removeItemFromQueue(item.id)}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/streaming/${item.id}`)} // Redirect to the streaming service page
                  >
                    View Streaming Info
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>Your personal queue is empty.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default PersonalQueue;
