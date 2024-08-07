import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
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
      <Link to="/user-recommend">User Recommendations</Link>
      <pre>{JSON.stringify(httpbin, null, 2)}</pre>
    </Container>
  );
};

export default Home;
