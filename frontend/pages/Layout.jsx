import React from 'react';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = () => {
  return (
    <ScrollToTop>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </ScrollToTop>
  );
};

export default Layout;

