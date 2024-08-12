import React, { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import useGlobalReducer from '../hooks/useGlobalReducer'; // Adjust the import path as necessary
import MovieDetails from '../components/MovieDetails';

const Movie = () => {
  const { dispatch,store} = useGlobalReducer();
  const {id} = useParams();
  const {token} = store;
  const apiBaseUrl = import.meta.env.VITE_BACKEND_URL;
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  const navigate = useNavigate();



  useEffect(() =>{
    async function getMovieDetails() {
        const movieDetailsResponse = await axios.get(`${apiBaseUrl}/api/movieDetails?id=${id}`);
        dispatch({ type: 'set_movie_details', payload: movieDetailsResponse.data });

        const movieCastCrewResponse = await axios.get(`${apiBaseUrl}/api/movieCast?id=${id}`);
        dispatch({ type: 'set_movie_cast', payload: movieCastCrewResponse.data });

     }
       getMovieDetails();
    },[]);
 
    if(isAuthenticated && token){
      return (
        <div> 
            <MovieDetails></MovieDetails>
        </div>
      )
    } else {
      navigate('/login')
    }

};

export default Movie;