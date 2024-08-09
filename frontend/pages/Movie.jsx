import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useGlobalReducer } from '../store'; // Adjust the import path as necessary
import MovieDetails from '../components/MovieDetails';

const Movie = () => {
  const { dispatch } = useGlobalReducer();
  const {id} = useParams();
  console.log("movie page",id);

  useEffect(() =>{
    console.log('in useeffect')
    async function getMovieDetails() {
        const apiBaseUrl = "https://curly-pancake-x5rv7x5p74qrhp6w9-3001.app.github.dev/api";

        console.log('before api call');
    const movieDetailsResponse = await axios.get(`${apiBaseUrl}/movieDetails?id=${id}`);
    dispatch({ type: 'set_movie_details', payload: movieDetailsResponse.data });

    const movieCastCrewResponse = await axios.get(`${apiBaseUrl}/movieCast?id=${id}`);
    dispatch({ type: 'set_movie_cast', payload: movieCastCrewResponse.data });
 }
    getMovieDetails();
},[dispatch])

  return (
    <div>
        <MovieDetails></MovieDetails>
    </div>
  )
};

export default Movie;