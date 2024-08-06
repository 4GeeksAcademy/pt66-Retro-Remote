import React, { createContext, useReducer, useContext } from 'react';

export const initialState = {
  movies: [],
  shows: [],
  movie_details: [],
  movie_cast: [],
  tvShow_details: [],
  token: null, // Add token field
};

export function storeReducer(state = initialState, action) {
  switch (action.type) {
    case 'set_movies':
      console.log('Setting movies:', action.payload);
      return {
        ...state,
        movies: action.payload.results || action.payload,
      };
    case 'set_shows':
      console.log('Setting shows:', action.payload);
      return {
        ...state,
        shows: action.payload.results || action.payload,
      };
    case 'set_movie_details':
      console.log('setting movie details', action.payload);
      return {
        ...state,
        movie_details: action.payload.results || action.payload,
      };
    case 'set_movie_cast':
      console.log('setting movie cast and crew', action.payload);
      return {
        ...state,
        movie_cast: action.payload.results || action.payload,
      };
    case 'set_token':
      return {
        ...state,
        token: action.payload,
      };
    case 'clear_token':
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
}

export const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useGlobalReducer() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useGlobalReducer must be used within a StoreProvider');
  }
  return context;
}
