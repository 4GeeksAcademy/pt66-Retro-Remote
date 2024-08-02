import {  useEffect, useState } from "react";
import { useGlobalReducer } from '../store';
import { Duration } from "luxon";

const MovieDetails = () => {
    const { store } = useGlobalReducer();

    const { movie_details = []} = store;
    const { movie_cast =[]} =store;


    const [releaseYear,setReleaseYear] = useState();
    const [movieDuration,setMovieDuration] = useState({hours:'',minutes:''});
    const [actors,setActors] = useState([]);
    const [directors,setDirectors] = useState([]);
    const [writers,setWriters] = useState([]);
    const [reviewData,setReviewData] = useState();

 useEffect(() => {
    const d = new Date(movie_details.release_date)
    setReleaseYear(d.getFullYear());
        
    const duration = Duration.fromObject({ minutes: movie_details.runtime});
    const hrs_mins = duration.shiftTo('hours', 'minutes').toObject();
    setMovieDuration({'hours' : hrs_mins['hours'],'minutes':hrs_mins['minutes']})
    
    const cast = movie_cast['cast'];
    const crew = movie_cast['crew'];
    const cast_crew = cast?.concat(crew);
    cast_crew?.forEach((obj)=>{
        if(obj['known_for_department'] == 'Acting'){
            setActors((prevArray)=>[...prevArray,obj['name']]);
            } else if(obj['known_for_department'] == 'Directing'){
                setDirectors((prevArray)=>[...prevArray,obj['name']]);
            }else if(obj['known_for_department'] == 'Writing'){
                setWriters((prevArray)=>[...prevArray,obj['name']]);
            }
        })
 }, [])

  




async function handleSubmitReview(e){
    console.log(id);
     e.preventDefault();
     console.log(reviewData);
     const review_data = {
        reviewData : reviewData,
        movieId : id
     }
    const resp = await fetch("https://studious-cod-qg54wxr99gfx9pq-3001.app.github.dev/api/review", {
        method: "POST",
        body: JSON.stringify(review_data),
        headers: {
        "Content-Type": "application/json"
        }
        });
        if(resp.ok)
            {
                const response_data = await resp.json();
                setReviewData()
                console.log(response_data)
                                        
            }else{
                const error = await resp.json();
                console.log(error);
            }

}


return(
    <div className="movieDetailsContainer">
    <div className="movieDetailsWrapper">
       <h2 className="m-4 pt-1">{movie_details.original_title}</h2>
       <div className="d-flex container1 justify-content-around">
           <p> {releaseYear} </p>
           <p>
               <span> {movieDuration.hours} h</span>
               <span> {movieDuration.minutes} min</span>
           </p>
       </div>
       <div className="container2 d-flex ms-4">
       <img src={`https://image.tmdb.org/t/p/w500/${movie_details.poster_path}`}></img>
           <div className="details ps-4">
               <p className="genres">
                   {
                       movie_details.genres?.map((genre) =><span key={genre.name}>{genre.name}</span>)
                   }
               </p>
               <p className="description">
                   {movie_details.overview}
               </p>
               <p className="actors">
                   <span className="type">Actors : </span>
               {
                       actors.length>4?actors.slice(0, 4).map((actor)=> <span className="names">{actor}</span>): 
                       actors.map((actor)=> <span className="names" key={actor}>{actor}</span>)
                   }
               </p>
               <p className="directors">
                   <span className="type">Directors :  </span>
                   {
                       directors.length>4?directors.slice(0, 4).map((director)=> <span className="names">{director}</span>): 
                       directors.map((director)=> <span className="names" key={director}>{director}</span>)
                   }
               </p>
            
               <p className="writers">
                   <span className="type">Writers : </span>
                   {
                       writers.length>4?writers.slice(0, 4).map((writer)=> <span className="names">{writer}</span>): 
                       writers.map((writer)=> <span className="names" key={writer}>{writer}</span>)
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


   

export default MovieDetails;