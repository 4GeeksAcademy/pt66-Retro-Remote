import React from 'react';
import ReactDOM from 'react-dom/client'; // Use react-dom/client for createRoot
import './index.css'; // Global styles for your application
import { RouterProvider } from 'react-router-dom';
import { router } from './routes'; // Import the router configuration
import { FavoritesProvider } from './pages/FavoritesContext'; // Import the FavoritesProvider

const Main = () => {
  console.log("Main component rendered"); // Add logging

  return (
    <React.StrictMode>
      {/* Provide global state to all components */}
      <FavoritesProvider>
        {/* Set up routing for the application */}
        <RouterProvider router={router} />
      </FavoritesProvider>
    </React.StrictMode>
  );
};

// Render the Main component into the root DOM element
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);