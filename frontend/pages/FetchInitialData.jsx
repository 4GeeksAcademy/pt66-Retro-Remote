import React, { useEffect } from 'react';
import axios from 'axios';
import useGlobalReducer from '../hooks/useGlobalReducer'; // Adjust the import path as necessary
import TopRated from '../components/TopRated';
import Navbar from '../components/Navbar';

const FetchInitialData = () => {
  const { dispatch,store } = useGlobalReducer();
  const apiBaseUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      // try {
        // Fetch top-rated movies
        const movieResponse = await axios.get(`${apiBaseUrl}/api/top-rated/movies`);
        dispatch({ type: 'set_movies', payload: movieResponse.data });

        // Fetch top-rated TV shows
        const showResponse = await axios.get(`${apiBaseUrl}/api/top-rated/shows`);
        dispatch({ type: 'set_shows', payload: showResponse.data });
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <TopRated></TopRated>
    </div>
  )
};

export default FetchInitialData;