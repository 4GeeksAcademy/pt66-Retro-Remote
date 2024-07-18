import React from 'react';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { router } from './routes';

const App = () => {
  console.log("App component rendered"); // Add logging

  return (
    <BrowserRouter>
      <RouterProvider router={router} />
    </BrowserRouter>
  );
};

export default App;