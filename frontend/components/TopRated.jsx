import React from 'react';
import Slider from "react-slick";
import '../assets/css/TopRated.css'; 
import { useGlobalReducer } from '../store';

function TopRated() {
  const { store } = useGlobalReducer();
  const { movies = [], shows = [] } = store;

  console.log('Movies in TopRated:', movies); // Log movies in TopRated
  console.log('Shows in TopRated:', shows);   // Log shows in TopRated

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4
  };

  if (!movies.length && !shows.length) {
    return <div>Loading...</div>;
  }

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
                <p>{movie.title}</p>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                     alt={movie.title} 
                     width="140" 
                     height="210" 
                     className="imgBorder"/>
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
              <div className="thirdCon">
                <p>{show.name}</p>
                <img src={`https://image.tmdb.org/t/p/w500${show.poster_path}`} 
                     alt={show.name} 
                     width="140" 
                     height="210"
                     className="imgBorder"/>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default TopRated;