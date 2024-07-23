// FetchInitialData.js

import React, { useEffect } from 'react';
import axios from 'axios';
import { useGlobalReducer } from './store'; // Adjust the import path as necessary

const FetchInitialData = () => {
  const { dispatch } = useGlobalReducer();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch top-rated movies
        const movieResponse = await axios.get('http://localhost:3000/api/top-rated/movies');
        dispatch({ type: 'set_movies', payload: movieResponse.data });

        // Fetch top-rated TV shows
        const showResponse = await axios.get('http://localhost:3000/api/top-rated/shows');
        dispatch({ type: 'set_shows', payload: showResponse.data });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  return null; // This component does not render anything
};

export default FetchInitialData;


