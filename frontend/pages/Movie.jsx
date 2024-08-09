import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useGlobalReducer } from '../store'; // Adjust the import path as necessary
import MovieDetails from '../components/MovieDetails';

const Movie = () => {
  const { dispatch } = useGlobalReducer();
  const {id} = useParams();


  useEffect(() =>{
    async function getMovieDetails() {

        const apiBaseUrl = "https://upgraded-goldfish-49pvxr4gx7fp45-3001.app.github.dev/api";

        const movieDetailsResponse = await axios.get(`${apiBaseUrl}/movieDetails?id=${id}`);
        dispatch({ type: 'set_movie_details', payload: movieDetailsResponse.data });

        const movieCastCrewResponse = await axios.get(`${apiBaseUrl}/movieCast?id=${id}`);
        dispatch({ type: 'set_movie_cast', payload: movieCastCrewResponse.data });
     }
       getMovieDetails();


    },[])

  return (
    <div> 
        <MovieDetails></MovieDetails>
    </div>
  )
};

export default Movie;