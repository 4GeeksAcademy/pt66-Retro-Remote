import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import "../style.css";

const streamingServiceLogos = {
  'Netflix': 'data:image/png;base64,...', // Truncated for brevity
  'Peacock': 'data:image/png;base64,...', // Truncated for brevity
  'Prime Video': 'data:image/png;base64,...' // Truncated for brevity
};

const StreamingServices = () => {
  return (
    <Container>
      <Row>
        {Object.keys(streamingServiceLogos).length > 0 ? (
          Object.keys(streamingServiceLogos).map((service) => (
            <Col key={service} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Img variant="top" src={streamingServiceLogos[service]} />
                <Card.Body>
                  <Card.Title>{service}</Card.Title>
                  {/* You might not need a button here if redirection is handled elsewhere */}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No streaming services available.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default StreamingServices;
