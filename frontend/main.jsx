import React from 'react';
import '../frontend/assets/css/main.css'

import ReactDOM from 'react-dom/client';
import './index.css'; // Global styles for your application
import { RouterProvider } from 'react-router-dom'; // Import RouterProvider to use the router
import { router } from './routes'; // Import the router configuration
import { StoreProvider } from './store'; // Import the StoreProvider for global state management
import FetchInitialData from './FetchInitialData'; // Import FetchInitialData for initial data fetching
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import PersonalQueue from './pages/PersonalQueue';
import { FavoritesProvider } from './pages/FavoritesContext';



const Main = () => {
    return (
        <React.StrictMode>
          
            <StoreProvider>
            <FavoritesProvider>
              
                <FetchInitialData />
              
                <RouterProvider router={router} />
                </FavoritesProvider>
            </StoreProvider>
        </React.StrictMode>
    );
};

// Render the Main component into the root DOM element.
ReactDOM.createRoot(document.getElementById('root')).render(<Main />);

