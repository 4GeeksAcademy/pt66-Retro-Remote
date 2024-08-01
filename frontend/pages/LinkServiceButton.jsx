import React from 'react';

function LinkServiceButton({ service }) {
  const handleLinkService = () => {
    window.location.href = `/auth/${service}`;
  };

  return (
    <button onClick={handleLinkService}>
      Link {service} Account
    </button>
  );
}

export default LinkServiceButton;
