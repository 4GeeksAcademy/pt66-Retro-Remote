import React, { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import useGlobalReducer from '../hooks/useGlobalReducer'; // Adjust the import path as necessary
import MovieDetails from '../components/MovieDetails';
import Navbar from '../components/Navbar';
import Login from './Loginform';

const Movie = () => {
  const { dispatch,store} = useGlobalReducer();
  const {id} = useParams();
  const {token} = store;
  const apiBaseUrl = import.meta.env.VITE_BACKEND_URL;

  const isAuthenticated = localStorage.getItem('isAuthenticated')
  console.log(isAuthenticated)
  console.log(token);
  const navigate = useNavigate();



  useEffect(() =>{

    async function getMovieDetails() {
        const movieDetailsResponse = await axios.get(`${apiBaseUrl}api/movieDetails?id=${id}`);
        dispatch({ type: 'set_movie_details', payload: movieDetailsResponse.data });

        const movieCastCrewResponse = await axios.get(`${apiBaseUrl}api/movieCast?id=${id}`);
        dispatch({ type: 'set_movie_cast', payload: movieCastCrewResponse.data });

        const reviews = await axios.get(`${apiBaseUrl}/api/review?id=${id}`);
        dispatch({type:'set_reviews',payload:reviews.data})

     }
       getMovieDetails();
    },[]);
 
    if(isAuthenticated && token){
      return (
        <div> 
          <Navbar></Navbar>
            <MovieDetails></MovieDetails>
        </div>
      )
    }else {
      return <Login></Login>
    }
};

export default Movie;