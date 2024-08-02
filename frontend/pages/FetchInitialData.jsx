import React, { useEffect } from 'react';
import axios from 'axios';
import { useGlobalReducer } from '../store'; // Adjust the import path as necessary
import TopRated from '../components/TopRated';

const FetchInitialData = () => {
  const { dispatch } = useGlobalReducer();
  const apiBaseUrl = "https://didactic-goldfish-pq5wx6vrvrh69q7-3001.app.github.dev/api";

  useEffect(() => {
    const fetchData = async () => {
      // try {
        // Fetch top-rated movies
        const movieResponse = await axios.get(`${apiBaseUrl}/top-rated/movies`);
        console.log('Movies fetched:', movieResponse.data); // Log the fetched movies
        dispatch({ type: 'set_movies', payload: movieResponse.data });

        // Fetch top-rated TV shows
        const showResponse = await axios.get(`${apiBaseUrl}/top-rated/shows`);
        console.log('Shows fetched:', showResponse.data); // Log the fetched shows
        dispatch({ type: 'set_shows', payload: showResponse.data });
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <TopRated></TopRated>
    </div>
  )
};

export default FetchInitialData;