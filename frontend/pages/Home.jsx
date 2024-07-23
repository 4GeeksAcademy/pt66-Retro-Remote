import { func } from "prop-types";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
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
	  console.log(data);
	  console.log(data.id)
	  setMovieId(data.id)
  }



	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
				<button type="button" className="btn btn-primary" onClick={()=>handleGetData()}>Get Data</button>
				<Link to={`/movie/${movieId}`}><button className="btn btn-dark">More Details</button></Link>

			</p>
		</div>
	);
}; 