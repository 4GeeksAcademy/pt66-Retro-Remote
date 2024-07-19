import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiKey = '906a1422e70c3c8ba8e832c96e9b90d7';
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

  return (
      <div style={{ fontFamily: "lato, san serif", display: "flex", paddingLeft: "30px", width: "100%", height: "auto", backgroundColor: "#59788e" }}>
        <div style={{ width: "50%" }}>
          <h1>Top Rated Movies</h1>
          <ul style={{ listStyleType: "none" }}>
            {movies.map((movie) => (
              <li key={movie.id}>
                <div style={{ width: "219px", marginLeft: "50px", marginTop: "30px", border: "10px #8e6f59 solid" }}>
                  <img src={`${baseImageUrl}${movie.poster_path}`} alt={movie.title} width="200" height="300" />
                </div>        
                {movie.title}
              </li>
            ))}
          </ul>
        </div>  
        <div styles={{ marginLeft: "20px" }}>
          <h1>Top Rated TV Shows</h1>
          <ul style={{ listStyleType: "none" }}>
          {shows.map((show) => (
            <li key={show.id}>
              <div style={{ width: "219px", marginLeft: "50px", marginTop: "30px", border: "10px #8e6f59 solid" }}>
                <img src={`${baseImageUrl}${show.poster_path}`} alt={show.name} width="200" height="300" />
              </div>
              {show.name}
              </li>
             ))}
          </ul>
          </div>
      </div>
  );
}

export default TopRated;