import { useEffect, useState } from "react";
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Duration } from "luxon";
import "../index.css";
import { Link } from "react-router-dom";

const MovieDetails = () => {
    const { store } = useGlobalReducer();
    const { movie_details = [], movie_cast = [], id, username } = store;

    const [releaseYear, setReleaseYear] = useState();
    const [movieDuration, setMovieDuration] = useState({ hours: '', minutes: '' });
    const [actors, setActors] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [writers, setWriters] = useState([]);
    const [reviewData, setReviewData] = useState("");
    const [isFavored, setIsFavored] = useState(false);
    const [favCount, setFavCount] = useState(0);

    useEffect(() => {
        const d = new Date(movie_details.release_date);
        setReleaseYear(d.getFullYear());

        const duration = Duration.fromObject({ minutes: movie_details.runtime });
        const hrs_mins = duration.shiftTo('hours', 'minutes').toObject();
        setMovieDuration({ 'hours': hrs_mins['hours'], 'minutes': hrs_mins['minutes'] });

        // Fetch favorite status and count
        const fetchFavoriteStatus = async () => {
            const token = store.token || localStorage.getItem('token');
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/favorites/${movie_details.id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            setIsFavored(data.isFavored);
            setFavCount(data.favCount);
        };

        fetchFavoriteStatus();
    }, [movie_details]);

    const toggleFavorite = async () => {
        const token = store.token || localStorage.getItem('token');
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + `/api/favorites/${movie_details.id}/toggle`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const result = await response.json();
            setIsFavored(result.isFavored);
            setFavCount(result.favCount);
        }
    };

    async function handleSubmitReview(e) {
        e.preventDefault();
        const review_data = {
            reviewData,
            movieId: movie_details.id,
            username: username
        };

        const token = store.token || localStorage.getItem('token');
        const resp = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/review', {
            method: "POST",
            body: JSON.stringify(review_data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if (resp.ok) {
            const response_data = await resp.json();
            console.log(response_data);
            setReviewData('');
        } else {
            const error = await resp.json();
            console.log('error', error);
        }
    }

    return (
        <div className="movieDetailsContainer">
            <div className="movieDetailsWrapper">
                <h2 className="m-4 pt-1">{movie_details.original_title}</h2>
                <div className="d-flex container1 justify-content-around">
                    <p>{releaseYear}</p>
                    <p>
                        <span>{movieDuration.hours} h</span>
                        <span>{movieDuration.minutes} min</span>
                    </p>
                </div>
                <div className="container2 d-flex ms-4">
                    <img src={`https://image.tmdb.org/t/p/w500/${movie_details.poster_path}`} alt={movie_details.original_title} />
                    <div className="details ps-4">
                        <p className="genres">
                            {movie_details.genres?.map((genre) => <span key={genre.name}>{genre.name}</span>)}
                        </p>
                        <p className="description">
                            {movie_details.overview}
                        </p>
                        <p className="actors">
                            <span className="type">Actors: </span>
                            {actors}
                            {movie_cast['actors']?.map((actor) => <span className="names" key={actor}>{actor}</span>)}
                        </p>
                        <p className="directors">
                            <span className="type">Directors: </span>
                            {directors}
                            {movie_cast['directors']?.map((director) => <span className="names" key={director}>{director}</span>)}
                        </p>
                        <p className="writers">
                            <span className="type">Writers: </span>
                            {writers}
                            {movie_cast['writers']?.map((writer) => <span className="names" key={writer}>{writer}</span>)}
                        </p>
                        <div className="favorites-section">
                            <button className={`btn ${isFavored ? 'btn-warning' : 'btn-outline-warning'}`} onClick={toggleFavorite}>
                                ⭐ {favCount}
                            </button>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="reviewdata" className="form-label">Write A Review:</label>
                            <textarea value={reviewData} onChange={(e) => setReviewData(e.target.value)} className="form-control" id="reviewdata" rows="3"></textarea>
                            <button type="button" className="btn btn-dark mt-3" onClick={handleSubmitReview}>Submit Review</button>
                        </div>
                    </div>
                </div>
            </div>
            <div><Link to="/home">Go to Home Page</Link></div>
        </div>
    );
};

export default MovieDetails;
