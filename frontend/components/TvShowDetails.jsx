import {  useEffect, useState } from "react";
import { useGlobalReducer } from '../store';
import { Duration } from "luxon";
import "../index.css"
import { object } from "prop-types";

const TvShow_details = () => {
    const { store } = useGlobalReducer();

    const { tvShow_details = []} = store;
    const { tvShow_cast =[]} =store;


    const [airedYear,setAiredYear] = useState();
    const [seasonsEpisodes,setSeasonsEpisodes] = useState({'seasons':'','episodes':''});
    const [actors,setActors] = useState([]);
    const [directors,setDirectors] = useState([]);
    const [writers,setWriters] = useState([]);
    const [reviewData,setReviewData] = useState();

 useEffect(() => {
    //get year
    var d = new Date(tvShow_details.first_air_date)
    setAiredYear(d.getFullYear());

    setSeasonsEpisodes({
        'seasons' : tvShow_details.number_of_seasons,
        'episodes': tvShow_details.number_of_episodes
    })
 }, [tvShow_details])

  




 return(
    <div className="movieDetailsContainer">
         <div className="movieDetailsWrapper">
            <h2 className="m-4 pt-1">{tvShow_details.original_name}</h2>
            <div className="d-flex container1 justify-content-around">
                <p className="ms-3"> {airedYear} </p>
                <p>Seasons : <span className="tvShowNo">{seasonsEpisodes['seasons']} </span> </p>
                 <p>Episodes : <span className="tvShowNo">{seasonsEpisodes['episodes']}</span> </p>   
            </div>
            <div className="container2 d-flex ms-4">
            <img src={`https://image.tmdb.org/t/p/w500/${tvShow_details.poster_path}`}></img>
                <div className="details ps-4">
                    <p className="genres">
                        {
                            tvShow_details.genres?.map((genre) =><span key={genre.name}>{genre.name}</span>)
                        }
                    </p>
                    <p className="description">
                        {tvShow_details.overview}
                    </p>
                    <p className="actors">
                        <span className="type">Actors : </span>
                    {
                            tvShow_cast['actors']?.map((actor)=> <span className="names" key={actor}>{actor}</span>)
                        }
                    </p>
                    <p className="directors">
                        <span className="type">Directors :  </span>
                        {
                            tvShow_cast['directors']?.map((director)=> <span className="names" key={director}>{director}</span>)
                        }
                    </p>
                 
                    <p className="writers">
                        <span className="type">Writers : </span>
                        {
                            tvShow_cast['writers']?.map((writer)=> <span className="names" key={writer}>{writer}</span>)
                        }
                    </p>
                    <div className="mb-3">
                    <label htmlFor="reviewdata" className="form-label">Write A Review :</label>

                    <textarea value={reviewData} onChange={(e)=>setReviewData(e.target.value)} className="form-control" id="reviewdata" rows="3"></textarea>
                    <button type="button" className="btn btn-dark mt-3" onClick={(e)=>handleSubmitReview(e)}>Submit Review</button>
                </div>
                </div>
            
            </div> 
         </div> 
    </div>
)

}


   

export default TvShow_details;