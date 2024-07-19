import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './components/FavoritesContext'; // Adjust path as needed
import Layout from './layouts/Layout'; // Adjust path as needed
import Home from './pages/Home'; // Adjust path as needed
import PersonalQueue from './pages/PersonalQueue'; // Adjust path as needed

function App() {
  return (
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
  );
}

export default App;
