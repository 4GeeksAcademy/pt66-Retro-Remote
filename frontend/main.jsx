import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global styles for your application
import { RouterProvider } from 'react-router-dom'; // Import RouterProvider to use the router
import { router } from './routes'; // Import the router configuration
import { StoreProvider } from './store'; // Import the StoreProvider for global state management
import FetchInitialData from './FetchInitialData'; // Import FetchInitialData for initial data fetching

const Main = () => {
    return (
        <React.StrictMode>
          
            <StoreProvider>
              
                <FetchInitialData />
              
                <RouterProvider router={router} />
            </StoreProvider>
        </React.StrictMode>
    );
};

// Render the Main component into the root DOM element.
ReactDOM.createRoot(document.getElementById('root')).render(<Main />);

