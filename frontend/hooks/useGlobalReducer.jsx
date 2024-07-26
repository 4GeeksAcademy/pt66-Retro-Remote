


// import React, { createContext, useReducer } from 'react';
// import { storeReducer, initialState } from '../store'; // Adjust the import path


// import { useContext } from 'react';
// import { StoreContext } from '../store'; // Adjust the import path

// export default function useGlobalReducer() {
//   const context = useContext(StoreContext);
//   if (!context) {
//     throw new Error('useGlobalReducer must be used within a StoreProvider');
//   }
//   return context;
// }

// // Create a context to hold the global state of the application
// export const StoreContext = createContext();

// // Define a provider component that encapsulates the store
// export function StoreProvider({ children }) {
//   // Initialize reducer with the initial state
//   const [store, dispatch] = useReducer(storeReducer, initialState);

//   // Provide the store and dispatch method to all child components
//   return (
//     <StoreContext.Provider value={{ store, dispatch }}>
//       {children}
//     </StoreContext.Provider>
//   );
// }
