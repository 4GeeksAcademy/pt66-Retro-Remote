import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // Import useLocation
import ScrollToTop from '../components/ScrollToTop';
import { Footer } from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Navbar2 from '../components/Navbar2';

const Layout = () => {
  const location = useLocation(); // Get the current location

  return (
    <ScrollToTop>
      
      <main>
        <Outlet />
      </main>
      <Footer />
    </ScrollToTop>
  );
};

export default Layout;
