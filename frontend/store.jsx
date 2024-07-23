import React, { createContext, useReducer, useContext } from 'react';


export const initialState = {
  movies: [],
  shows: []
};


export function storeReducer(state = initialState, action) {
  switch (action.type) {
    case 'set_movies':
      return {
        ...state,
        movies: action.payload
      };
    case 'set_shows':
      return {
        ...state,
        shows: action.payload
      };
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
