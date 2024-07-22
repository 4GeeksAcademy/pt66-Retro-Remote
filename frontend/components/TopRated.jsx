import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import '../assets/css/TopRated.css'

const apiKey = '4c82898ea005920b54c572b6a507c2fe';

function TopRated() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        // Fetch top-rated movies
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`);
        setMovies(movieResponse.data.results || []);

        // Fetch top-rated TV shows
        const showResponse = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`);
        setShows(showResponse.data.results || []);
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
