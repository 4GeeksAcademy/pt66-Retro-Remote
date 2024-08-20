import {  useEffect, useState } from "react";
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Duration } from "luxon";
import "../assets/css/details.css"
import { Link } from "react-router-dom";
import { object } from "prop-types";


const MovieDetails = (type) => {
    const { store } = useGlobalReducer();

    const { movie_details=[],movie_cast=[],id,username,reviews} = store;
    const [releaseYear,setReleaseYear] = useState();
    const [movieDuration,setMovieDuration] = useState({hours:'',minutes:''});
    const [actors,setActors] = useState([]);
    const [directors,setDirectors] = useState([]);
    const [writers,setWriters] = useState([]);
    const [reviewData,setReviewData] = useState();
    const [pageReviews,setpageReviews] = useState([]);

 useEffect(() => {
    const d = new Date(movie_details.release_date)
    setReleaseYear(d.getFullYear());
        
    const duration = Duration.fromObject({ minutes: movie_details.runtime});
    const hrs_mins = duration.shiftTo('hours', 'minutes').toObject();
    setMovieDuration({'hours' : hrs_mins['hours'],'minutes':hrs_mins['minutes']})
        setpageReviews(reviews);
    
 }, [movie_details,reviews])

  




async function handleSubmitReview(e){
     e.preventDefault();

     const review_data = {
        reviewData : reviewData,
        id : movie_details.id,
        username:username

     }
    const resp = await fetch(import.meta.env.VITE_BACKEND_URL  + '/api/review', {
        method: "POST",
        body: JSON.stringify(review_data),
        headers: {
        "Content-Type": "application/json"
        }
        });
        if(resp.ok)
            {
                const response_data = await resp.json();
                setReviewData('')
                setpageReviews((prevReviews)=>{
                    console.log('prevReviews',prevReviews)
                    if(prevReviews['msg']) {
                        return [response_data]
                    }
                    else {
                        return [...prevReviews,response_data]
                    }
                    
                });
                     
              
            }else{
                const error = await resp.json();
                console.log('error',error)
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
                   {actors}
               {
                       movie_cast['actors']?.map((actor)=> <span className="names" key={actor}>{actor}</span>)
                   }
               </p>
               <p className="directors">
                   <span className="type">Directors :  </span>
                   {directors}
                   {
                       movie_cast['directors']?.map((director)=> <span className="names" key={director}>{director}</span>)
                   }
               </p>
            
               <p className="writers">
                   <span className="type">Writers : </span>
                   {writers}
                   {
                  
                       movie_cast['writers']?.map((writer)=> <span className="names" key={writer}>{writer}</span>)
                   }
               </p>
               <div className="mb-3">
               <label htmlFor="reviewdata" className="form-label">Write A Review :</label>

               <textarea value={reviewData} onChange={(e)=>setReviewData(e.target.value)} className="form-control" id="reviewdata" rows="3"></textarea>
               <button type="button" className="btn btn-dark mt-3" onClick={(e)=>handleSubmitReview(e)}>Submit Review</button>
           </div>
           </div>
       
       </div> 
       <div className="reviewsContainer">
       <span className="reviewTitle">Reviews : </span>
        <ul class="list-group d-flex justify-content-between align-items-center me-3 ms-3">
                   {                   
                    pageReviews && pageReviews.length >0 ? pageReviews.map((review)=>{
                       return (
                        <li class="list-group-item w-100" key={review.id}>
                        <div class="ms-2 me-auto">
                         <div class="fw-bold">{review.username}</div>
                          {review.review}
                        </div>
                      </li>
                       ) 
                       
                    }) 
                    :
                    <li class="list-group-item w-100">
                        <div class="ms-2 me-auto">
                         {
                            reviews?.msg ? reviews.msg : ''
                         }
                        
                        </div>
                      </li>
                   
                }
        </ul>
    </div>
    </div> 

</div>
)

}


   

export default MovieDetails;