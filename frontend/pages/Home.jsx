// Home.js

import React from 'react';
import { useGlobalReducer } from '../store'; 
import TopRated from '../components/TopRated'; 
import FetchInitialData from '../FetchInitialData';



export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <div>
      <FetchInitialData />
      <TopRated />
    </div>
  );
};
