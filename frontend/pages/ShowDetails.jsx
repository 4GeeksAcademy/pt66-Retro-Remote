import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowDetails = () => {
    const {id} = useParams();
    const [showDetails,setShowDetails] = useState({})
    const [airedYear,setAiredYear] = useState();
    const [seasonsEpisodes,setSeasonsEpisodes] = useState({'seasons':'','episodes':''});
    const [actors,setActors] = useState([]);
    const [directors,setDirectors] = useState([]);
    const [writers,setWriters] = useState([]);
    const [reviewData,setReviewData] = useState();

      useEffect(() =>{
        async function handleGetMovieDetails() {

        const urls = [`https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=f0d14b30a61125698e4990acdb103e21`, `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US&api_key=f0d14b30a61125698e4990acdb103e21`];
        const fetchPromises = urls.map(url => fetch(url));
        Promise.all(fetchPromises)
        .then(responses => Promise.all(responses.map(response => response.json())))
            .then(data => {
                console.log('data',data)

                setShowDetails(data[0]);
                var d = new Date(data[0].first_air_date)
                console.log(data);
                setAiredYear(d.getFullYear());
                console.log(data[0].number_of_episodes)
                console.log(data[0].number_of_seasons)
                setSeasonsEpisodes({'seasons' : data[0].number_of_seasons,'episodes':data[0].number_of_episodes})
                const cast = data[1]['cast'];
                const crew = data[1]['crew'];
                const cast_crew = cast.concat(crew);
                cast_crew.forEach((obj)=>{
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
                    <h2 className="m-4 pt-1">{showDetails.original_name}</h2>
                    <div className="d-flex container1 justify-content-around">
                        <p> {airedYear} </p>
                        <p>
                            <span>Seasons :  {seasonsEpisodes['seasons']} </span>
                            <span> Episodes :  {seasonsEpisodes['episodes']} </span>
                        </p>
                    </div>
                    <div className="container2 d-flex ms-4">
                    <img src={`https://image.tmdb.org/t/p/w500/${showDetails.poster_path}`}></img>
                        <div className="details ps-4">
                            <p className="genres">
                                {
                                    showDetails.genres?.map((genre) =><span key={genre.name}>{genre.name}</span>)
                                }
                            </p>
                            <p className="description">
                                {showDetails.overview}
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

   

export default ShowDetails;