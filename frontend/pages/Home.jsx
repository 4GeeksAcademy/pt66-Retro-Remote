import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect } from "react";
import Login from "./Login.jsx";
import "../style.css";
import { Navigate, useNavigate } from "react-router-dom";



export const Home = () => {

  const {store, dispatch} =useGlobalReducer()
const navigate = useNavigate();	
  useEffect(() => {if (!store.token){navigate("/Login")}} , []);
  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined)
      history("/");
  });
	return (
	<div> 
		<Login />
	</div>
	);
}; 