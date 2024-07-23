import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import '../assets/css/TopRated.css'; 

function TopRated() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const apiBaseUrl = "https://symmetrical-goggles-976jrw75rxr6hpp5p-3001.app.github.dev/api"
  // need to get rid this, calls are being made in the store so i should get it from there
  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const movieResponse = await axios.get(apiBaseUrl+'/top-rated/movies');
        setMovies(movieResponse.data || []);

        const showResponse = await axios.get(apiBaseUrl+'/top-rated/shows');
        setShows(showResponse.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTopRated();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4
  };

  return (
    <div className="firstCon">
      <div className="carousel">
        <div className="topRated">
          <h1 className="title">Top Rated Movies</h1>
        </div>
        <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie.id}>
              <div className="thirdCon">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                     alt={movie.title} 
                     width="140" 
                     height="210" 
                     className="imgBorder"/>
                <p className="movieTitle">{movie.title}</p>
              </div>  
            </div>
          ))}
        </Slider>
      </div>
      <div className="carousel">
        <div className="topRated">
          <h1 className="title">Top Rated TV Shows</h1>
        </div>
        <Slider {...settings}>
          {shows.map((show) => (
            <div key={show.id}>
              <div style={{cursor: "grab"}}>
                <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} 
                     alt={show.name} 
                     width="140" 
                     height="210"
                     className="imgBorder"/>
                <p className="showTitle">{show.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default TopRated;


