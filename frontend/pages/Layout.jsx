import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // Import useLocation
import ScrollToTop from '../components/ScrollToTop';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = () => {
  const location = useLocation(); // Get the current location

  return (
    <ScrollToTop location={location}> {/* Pass location to ScrollToTop */}
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </ScrollToTop>
  );
};

export default Layout;
