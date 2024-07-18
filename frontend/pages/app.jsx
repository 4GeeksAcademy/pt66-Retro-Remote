import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FavoritesProvider } from './FavoritesContext';

ReactDOM.render(
  <FavoritesProvider>
    <App />
  </FavoritesProvider>,
  document.getElementById('root')
);
