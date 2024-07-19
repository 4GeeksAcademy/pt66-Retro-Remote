import React from 'react';
import ReactDOM from 'react-dom/client'; // Use react-dom/client for createRoot
import './index.css'; // Global styles for your application
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { Layout } from './pages/Layout';
import { FavoritesProvider } from './pages/FavoritesContext'; // Import the FavoritesProvider
import Home from './pages/Home';
import PersonalQueue from './pages/PersonalQueue';

const Main = () => {
  console.log("Main component rendered"); // Add logging

  return (
    <React.StrictMode>
      <FavoritesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="personal-queue" element={<PersonalQueue />} />
              {/* Add other routes here */}
            </Route>
          </Routes>
        </Router>
      </FavoritesProvider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);