import React from 'react';
import '../frontend/assets/css/main.css';
// import { AuthProvider } from './components/AuthContext';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global styles for your application
import { RouterProvider } from 'react-router-dom'; // Import RouterProvider to use the router
import { router } from './routes'; // Import the router configuration
import { StoreProvider } from './hooks/useGlobalReducer'; // Import the StoreProvider for global state management
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FavoritesProvider } from './pages/FavoritesContext';

// Define Main component before using it

const Main = () => {
    return (
        <React.StrictMode>
            {/* <AuthProvider> */}
                <StoreProvider>
                    <FavoritesProvider>
                        <RouterProvider router={router} />
                    </FavoritesProvider>
                </StoreProvider>
            {/* </AuthProvider> */}
        </React.StrictMode>
    );
};

// Render the Main component into the root DOM element
const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  // Hydrate the existing root
  ReactDOM.hydrateRoot(rootElement, <Main />);
} else {
  // Create a new root
  ReactDOM.createRoot(rootElement).render(<Main />);
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);
