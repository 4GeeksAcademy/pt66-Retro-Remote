import React, { createContext, useReducer, useContext } from 'react';

export const initialState = {
  movies: [],
  shows: [],
  movie_details:[],
  movie_cast : [],
  tvShow_details:[]
};

export function storeReducer(state = initialState, action) {
  switch (action.type) {
    case 'set_movies':
      console.log('Setting movies:', action.payload); // Log the action payload
      return {
        ...state,
        movies: action.payload.results || action.payload // Ensure it handles the correct payload structure
      };
    case 'set_shows':
      console.log('Setting shows:', action.payload); // Log the action payload
      return {
        ...state,
        shows: action.payload.results || action.payload // Ensure it handles the correct payload structure
      };
    case 'set_movie_details':
      console.log('setting movie details',action.payload);
      return {
        ...state,
        movie_details: action.payload.results || action.payload
      }
    case 'set_movie_cast':
        console.log('setting movie cast and crew',action.payload);
        return {
          ...state,
          movie_cast: action.payload.results || action.payload
        }
    default:
      return state;
  }
}

// Create a context to hold the global state of the application
export const StoreContext = createContext();

// Define a provider component that encapsulates the store
export function StoreProvider({ children }) {
  // Initialize reducer with the initial state
  const [store, dispatch] = useReducer(storeReducer, initialState);

  // Provide the store and dispatch method to all child components
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

// Custom hook to access the global state and dispatch function
export function useGlobalReducer() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useGlobalReducer must be used within a StoreProvider');
  }
  return context;
}