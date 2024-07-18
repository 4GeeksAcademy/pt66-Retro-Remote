import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [personalQueue, setPersonalQueue] = useState([]);

  const toggleFavorite = (item) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.find((fav) => fav.id === item.id);
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.id !== item.id);
      } else {
        return [...prevFavorites, item];
      }
    });
  };

  const addToPersonalQueue = (item) => {
    setPersonalQueue((prevQueue) => [...prevQueue, item]);
  };

  console.log("FavoritesProvider initialized");

  return (
    <FavoritesContext.Provider value={{ favorites, personalQueue, toggleFavorite, addToPersonalQueue }}>
      {children}
    </FavoritesContext.Provider>
  );
};







