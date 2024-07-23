// Home.js

import React from 'react';
import { useGlobalReducer } from '../store'; // Adjust the import path as necessary
import TopRated from '../components/TopRated'; // Adjust the import path as necessary

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <div>
      <TopRated />
    </div>
  );
};
