import React, { createContext, useState } from 'react';

// Create the context
export const FavoritesContext = createContext();

// Create a provider component
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [personalQueue, setPersonalQueue] = useState([]);

  const toggleFavorite = (item) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.find(fav => fav.id === item.id);
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.id !== item.id);
      } else {
        return [...prevFavorites, item];
      }
    });
  };

  const addToPersonalQueue = (item) => {
    setPersonalQueue((prevQueue) => [...prevQueue, item]);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, personalQueue, toggleFavorite, addToPersonalQueue }}>
      {children}
    </FavoritesContext.Provider>
  );
};
