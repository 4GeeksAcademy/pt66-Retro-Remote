import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from '../store'; // Adjust the import path

// Create a context to hold the global state of the application
const StoreContext = createContext();

// Define a provider component that encapsulates the store
export function StoreProvider({ children }) {
  // Initialize reducer with the initial state
  const [store, dispatch] = useReducer(storeReducer, initialStore);

  // Provide the store and dispatch method to all child components
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducer() {
    const { dispatch, store } = useContext(StoreContext)
    return { dispatch, store };
}
