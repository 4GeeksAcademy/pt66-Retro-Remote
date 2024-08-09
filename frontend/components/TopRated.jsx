import React, { useEffect, useRef } from 'react';
import '../assets/css/TopRated.css';
import { Carousel } from 'react-bootstrap';
import { useGlobalReducer } from '../store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';




function TopRated() {
  const { store } = useGlobalReducer();
  const { movies = [], shows = [] } = store;
  const carouselRef = useRef();

  
  useEffect(() => {
    const carouselElement = carouselRef.current; 
    if (carouselElement) {
      const handleMouseEnter = () => {
        const carouselInstance = window.bootstrap.Carousel.getInstance(carouselElement.element);
        carouselInstance.pause();
      };

      const handleMouseLeave = () => {
        const carouselInstance = window.bootstrap.Carousel.getInstance(carouselElement.element);
        carouselInstance.cycle();
      };
      carouselElement.element.addEventListener('mouseenter', handleMouseEnter);
      carouselElement.element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        if (carouselElement) {
          carouselElement.element.removeEventListener('mouseenter', handleMouseEnter);
          carouselElement.element.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
    }
  }, []);

  if (!movies.length && !shows.length) {
    return <div>Loading...</div>;
  }

  const renderCarouselItems = (items, type) => {
    const chunkedItems = [];
    for (let i = 0; i < items.length; i += 5) {
      chunkedItems.push(items.slice(i, i + 5));
    }

    return chunkedItems.map((group, index) => (
      <Carousel.Item 
        key={`${type}-${index}`}
        >
        <div className="d-flex justify-content-center TRated">
          {group.map(item => (
           
            <div key={item.id} className="p-3">
              {item.poster_path ? (
               
                <>
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                    alt={type === 'movie' ? item.title : item.name} 
                    className="imgBorder"
                    style={{ 
                      width: "300px", 
                      height: "350px",
                    }}
                  />
                  <ul className="d-flex w-100  justify-content-around">
                  <li className="mt-2 movie-title">
                    {item.title || item.name}
                  </li>
                  
                  <li><Link to={type == 'movie' ?`movie/${item.id}` : `show/${item.id}`}><button className="btn btn-dark">More Details</button></Link></li>
                  </ul>
                
                </>
              ) : (
                <div>No image available</div>
              )}
            
            </div>   
          ))}
        </div>
      </Carousel.Item>
    ));
  };

  return (
    <div className="containers">
      <div className="conA">
        <div className="carousel">
          <div className="col-12 text-center topRated">
            <h1 className="title">
                Top 20 Rated Movies
            </h1>
          </div>
          <div>
            <Carousel ref={carouselRef} interval={3000} indicators={true}>
              {renderCarouselItems(movies, 'movie')}
            </Carousel>
          </div>
        </div>
      </div>
      <div className="ConB">
        <div className="carousel">
          <div className="col-12 text-center topRated">
            <h1 className="title">
              Top 20 Rated TV Shows
            </h1> 
          </div>
          <Carousel  ref={carouselRef} interval={3000} indicators={true}>
            {renderCarouselItems(shows, 'show')}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default TopRated;
