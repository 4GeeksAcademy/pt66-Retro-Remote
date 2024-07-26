import { func } from "prop-types";
// Home.js

import React from 'react';
import { useGlobalReducer } from '../store'; 
import TopRated from '../components/TopRated'; 
import FetchInitialData from '../FetchInitialData';


import { useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()
  const [movieId,setMovieId] = useState();

  async function handleGetData(){
	const options = {
		method: 'GET',
		headers: {
		  accept: 'application/json',
		}
	  };
	  const resp = await fetch('https://api.themoviedb.org/3/movie/1022789?language=en-US&api_key=f0d14b30a61125698e4990acdb103e21')
	  const data = await resp.json();
	  setMovieId(data.id)
  }



	return (
		<div className="text-center mt-5">
			 <FetchInitialData />
			 <TopRated />
		</div>
	);
}; 