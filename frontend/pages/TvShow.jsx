import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useGlobalReducer } from '../store'; // Adjust the import path as necessary
import TvShowDetails from '../components/TvShowDetails';

const TvShow = () => {
  const { dispatch } = useGlobalReducer();
  const {id} = useParams();

  useEffect(() =>{
      async function getTvShowDetails() {
        const apiBaseUrl = "https://upgraded-goldfish-49pvxr4gx7fp45-3001.app.github.dev/api";

        const tvShowDetailsResponse = await axios.get(`${apiBaseUrl}/tvShowDetails?id=${id}`);
        dispatch({ type: 'set_tvShow_details', payload: tvShowDetailsResponse.data });

        const tvShowCastCrewResponse = await axios.get(`${apiBaseUrl}/tvShowCast?id=${id}`);
        dispatch({ type: 'set_tvShow_cast', payload: tvShowCastCrewResponse.data });
      }
        getTvShowDetails();
    },[dispatch])

  return (
    <div>
       <TvShowDetails></TvShowDetails>
    </div>
  )
};

export default TvShow;