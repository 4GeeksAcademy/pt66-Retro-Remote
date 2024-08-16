import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // Import the trash icon
import "../style.css";

const TMDB_API_KEY = 'c2fbec3b6737ac039d19ec2bc0281187'; 

const PersonalQueue = () => {
  const [queueItems, setQueueItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadedQueueItems = () => {
      const storedQueueItems = JSON.parse(localStorage.getItem('personalQueue')) || [];
      setQueueItems(storedQueueItems);
    };

    loadedQueueItems();
    window.addEventListener('storage', loadedQueueItems);

    return () => {
      window.removeEventListener('storage', loadedQueueItems);
    };
  }, []);

  const fetchStreamingInfo = async (id, type) => {
    try {
      const url = type === 'movie'
        ? `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${TMDB_API_KEY}`
        : `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${TMDB_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok || !data.results) {
        alert(`Error: ${data.status_message || "Failed to fetch streaming info"}`);
        return;
      }

      const usProviders = data.results.US ? data.results.US.flatrate : null;

      if (usProviders) {
        alert(`Available on: ${usProviders.map(provider => provider.provider_name).join(', ')}`);
      } else {
        alert('No streaming services available for this title.');
      }
    } catch (error) {
      console.error("Error fetching streaming info:", error);
      alert("Failed to fetch streaming info.");
    }
  };

  const removeItemFromQueue = (itemId) => {
    setQueueItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId);
      localStorage.setItem('personalQueue', JSON.stringify(updatedItems)); 
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
                  style={{ height: '300px', objectFit: 'cover' }} // Fit the image within the carousel
                />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    <strong>Release Year:</strong> {new Date(item.release_date).getFullYear()}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                  <Button
                    style={{ backgroundColor: 'grey', color: 'white', border: '1px solid white' }}
                    onClick={() => removeItemFromQueue(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} /> {/* Trash icon */}
                  </Button>
                  <Button
                    style={{ backgroundColor: 'black', color: 'white', border: '1px solid white' }}
                    onClick={() => fetchStreamingInfo(item.id, item.type)}
                  >
                    Streaming Info
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
