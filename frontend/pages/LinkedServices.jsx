import React, { useEffect, useState } from 'react';
import LinkServiceButton from './LinkServiceButton';

function LinkedServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/api/linked-services')
      .then(res => res.json())
      .then(data => setServices(data));
  }, []);

  return (
    <div>
      <h2>Your Linked Services</h2>
      <ul>
        {services.map(service => (
          <li key={service.name}>{service.name}</li>
        ))}
      </ul>
      <LinkServiceButton service="Peacock" />
      <LinkServiceButton service="Netflix" />
      {/* Add more services as needed */}
    </div>
  );
}

export default LinkedServices;
