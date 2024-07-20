import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "react-slick";

const apiKey = 'a68e3a95bccd13e0bbb80357ef4b13bf';
const baseImageUrl = 'https://image.tmdb.org/t/p/w500'; // Base URL for the poster images

function TopRated() {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
        );
        setMovies(movieResponse.data.results);

        const showResponse = await axios.get(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`
        );
        setShows(showResponse.data.results);
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
    <div style={{ fontFamily: "lato, sans serif", paddingLeft: "20px", backgroundColor: "#59788e" }}>
      <div style={{ width: "75%", margin: "0 auto" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontWeight: "700", padding: "30px" }}>Top Rated Movies</h1>
        </div>
        <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie.id}>
              <div style={{ cursor: "grab" }}>
                <img src={`${baseImageUrl}${movie.poster_path}`} 
                alt={movie.title} 
                width="140" 
                height="210" 
                border="10px solid #111111"
                 />
              </div>  
            </div>
          ))}
        </Slider>
      </div>
      <div style={{ width: "75%", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1 style={{ fontWeight: "700", padding: "30px" }}>Top Rated TV Shows</h1>
        </div>
        <Slider {...settings}>
          {shows.map((show) => (
            <div key={show.id}>
              <div style= {{cursor: "grab" }}>
                <img src={`${baseImageUrl}${show.poster_path}`} alt={show.name} width="140" height="210" border="10px solid #111111"/>
                <p style={{ textAlign: "center" }}>{show.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default TopRated;
