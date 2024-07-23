import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DateTime,Duration } from "luxon";

export const MovieDetails = () => {
    const {id} = useParams();
    const [movieDetails,setMovieDetails] = useState({})
    const [releaseYear,setReleaseYear] = useState();
    const [movieDuration,setMovieDuration] = useState({hours:'',minutes:''});
    const [actors,setActors] = useState([]);
    const [directors,setDirectors] = useState([]);
    const [writers,setWriters] = useState([]);
    const [reviewData,setReviewData] = useState();

    useEffect(() =>{
        async function handleGetMovieDetails() {
        const urls = ['https://api.themoviedb.org/3/movie/1022789?language=en-US&api_key=f0d14b30a61125698e4990acdb103e21', 'https://api.themoviedb.org/3/movie/1022789/credits?language=en-US&api_key=f0d14b30a61125698e4990acdb103e21'];
        const fetchPromises = urls.map(url => fetch(url));
        Promise.all(fetchPromises)
        .then(responses => Promise.all(responses.map(response => response.json())))
            .then(data => {
                // Process the data 
                setMovieDetails(data[0]);
                var d = new Date(data[0].release_date)
                setReleaseYear(d.getFullYear());
                const duration = Duration.fromObject({ minutes: data[0].runtime});
                const hrs_mins = duration.shiftTo('hours', 'minutes').toObject();
                setMovieDuration({'hours' : hrs_mins['hours'],'minutes':hrs_mins['minutes']})
                const cast = data[1]['cast'];
                const crew = data[1]['crew'];
                const cast_crew = cast.concat(crew);
                cast_crew.map((obj)=>{
                    if(obj['known_for_department'] == 'Acting'){
                    setActors((prevArray)=>[...prevArray,obj['name']]);
                    } else if(obj['known_for_department'] == 'Directing'){
                        setDirectors((prevArray)=>[...prevArray,obj['name']]);
                    }else if(obj['known_for_department'] == 'Writing'){
                        setWriters((prevArray)=>[...prevArray,obj['name']]);
                    }
                })
            })
        .catch(error => {
         // Handle any errors
         console.log(error);
         });
     }
         handleGetMovieDetails();
},[])

        async function handleSubmitReview(e){
             e.preventDefault();
             console.log(reviewData);
            // const resp = await fetch("https://supreme-potato-jwp7xg67qqcx99-3001.app.github.dev/api/signup", {
            //     method: "POST",
            //     body: JSON.stringify(formData),
            //     headers: {
            //     "Content-Type": "application/json"
            //     }
            //     });
            //     if(resp.ok)
            //         {
            //             const response_from = await resp.json();
            //             setFormData({email: "",password: ""})
            //             console.log(response_from)
                                                
            //         }else{
            //             const error = await resp.json();
            //             console.log(error);
            //         }

        }

    return(
    <div className="movieDetailsContainer">
         <div className="movieDetailsWrapper">
            <h2 className="m-4 pt-1">{movieDetails.original_title}</h2>
            <div className="d-flex container1 justify-content-around">
                <p> {releaseYear} </p>
                <p>
                    <span> {movieDuration.hours} h</span>
                    <span> {movieDuration.minutes} min</span>
                </p>
            </div>
            <div className="container2 d-flex ms-4">
                <img src="https://image.tmdb.org/t/p/w500/Apr19lGxP7gm6y2HQX0kqOXTtqC.jpg"></img>
                <div className="details ps-4">
                    <p className="genres">
                        {
                            movieDetails.genres?.map((genre) =><span key={genre.name}>{genre.name}</span>)
                        }
                    </p>
                    <p className="description">
                        {movieDetails.overview}
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

   

