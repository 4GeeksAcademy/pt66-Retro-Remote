import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Add } from "./Add.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { Favorites } from "./Favorties.jsx";
import { Watched } from "./Watched.jsx"; 
import Login from "./Login.jsx";
import "../style.css";



export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
	<div> 
		<Login />
		<Add />
		<Favorites />
		<Navbar />
		<Watched />
	</div>
	);
}; 