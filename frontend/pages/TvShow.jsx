import React, { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import useGlobalReducer from '../hooks/useGlobalReducer'; // Adjust the import path as necessary
import TvShowDetails from '../components/TvShowDetails';
import Navbar from '../components/Navbar';
import Login from './Loginform';

const TvShow = () => {
  const { dispatch,store } = useGlobalReducer();
  const {id} = useParams();
  const {token} = store;
  const apiBaseUrl = import.meta.env.VITE_BACKEND_URL;
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const navigate = useNavigate();


  useEffect(() =>{

      async function getTvShowDetails() {

        const tvShowDetailsResponse = await axios.get(`${apiBaseUrl}/api/tvShowDetails?id=${id}`);
        dispatch({ type: 'set_tvShow_details', payload: tvShowDetailsResponse.data });

        const tvShowCastCrewResponse = await axios.get(`${apiBaseUrl}/api/tvShowCast?id=${id}`);
        dispatch({ type: 'set_tvShow_cast', payload: tvShowCastCrewResponse.data });

        const reviews = await axios.get(`${apiBaseUrl}/api/review?id=${id}`);
        dispatch({type:'set_reviews',payload:reviews.data})
      }
        getTvShowDetails();
    },[])

    if(isAuthenticated && token){
      return (
        <div>
          <Navbar></Navbar>
           <TvShowDetails></TvShowDetails>
        </div>
      )
    }else {
      return <Login></Login>
    }

};

export default TvShow;