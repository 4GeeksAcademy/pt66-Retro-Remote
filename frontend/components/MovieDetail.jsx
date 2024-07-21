// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const apiKey = '3a3e3e64a22e810b08f4fe90fde7867e';
// const baseImageUrl = 'https://image.tmdb.org/t/p/w500'; 

// const MovieDetails = ({ match }) => {
//   const [movie, setMovie] = useState(null);
//   const movieId = match.params.id;

//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
//         );
//         setMovie(response.data);
//       } catch (error) {
//         console.error('Error fetching movie details:', error);
//       }
//     };

//     fetchMovieDetails();
//   }, [movieId]);

//   if (!movie) return <div>Loading...</div>;

//   return (
//     <div className="container mt-4">
//       <div className="row">
//         <div className="col-md-4">
//           <img src={`${baseImageUrl}${movie.poster_path}`} className="img-fluid" alt={movie.title} />
//         </div>
//         <div className="col-md-8">
//           <h1>{movie.title}</h1>
//           <p>{movie.overview}</p>
//           <p><strong>Release Date:</strong> {movie.release_date}</p>
//           <p><strong>Rating:</strong> {movie.vote_average}</p>
//           {/* Add more movie details as needed */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;
