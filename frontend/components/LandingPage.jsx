import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalReducer } from '../hooks/useGlobalReducer';

const apiKey = 'c9dd0b4c6d583f819a3c2b070cdbbcc9';

function TopRatedMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching top-rated movies:', error);
      }
    };

    fetchTopRatedMovies();
  }, []);

  return (
    <div>
      <h1>Top Rated Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            <p>{movie.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopRatedMovies;