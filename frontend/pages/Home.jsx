import React, { useEffect, useState } from 'react';
import { useGlobalReducer } from '../store'; 
import TopRated from '../components/TopRated'; 
import { useLocation } from 'react-router-dom';

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const location = useLocation();
  const [movieId, setMovieId] = useState();

  useEffect(() => {
    console.log('Location changed:', location);
    async function fetchInitialData() {
      try {
        console.log('Fetching initial data...');
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
          }
        };
        const resp = await fetch('https://api.themoviedb.org/3/movie/1022789?language=en-US&api_key=f0d14b30a61125698e4990acdb103e21', options);
        const data = await resp.json();
        console.log('Fetched data:', data);
        setMovieId(data.id);
        dispatch({ type: 'set_movies', payload: data.results ? data.results : [data] });
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    }

    fetchInitialData();
  }, [dispatch, location.key]);

  return (
    <div className="text-center mt-5">
      <TopRated />
    </div>
  );
};
