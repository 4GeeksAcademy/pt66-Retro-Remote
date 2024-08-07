import React, { useEffect, useRef } from 'react';
import '../assets/css/TopRated.css';
import { Carousel } from 'react-bootstrap';
import { useGlobalReducer } from '../store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function TopRated() {
  const { store } = useGlobalReducer();
  const { movies = [], shows = [] } = store;

  console.log('Movies in TopRated:', movies); 
  console.log('Shows in TopRated:', shows); 

  useEffect(() => {
    // Any additional setup if necessary
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
      <Carousel.Item key={`${type}-${index}`}>
        <div className="d-flex justify-content-center TRated">
          {group.map(item => (
            <div key={item.id} className="p-3">
              {item.poster_path ? (
                <Link to={type === 'movie' ? `movie/${item.id}` : `show/${item.id}`}>
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                    alt={type === 'movie' ? item.title : item.name} 
                    className="imgBorder"
                    style={{ 
                      width: "300px", 
                      height: "350px",
                      cursor: "pointer"
                    }}
                  />
                </Link>
              ) : (
                <div>No image available</div>
              )}
              <div className="mt-2 movie-title text-center">
                {item.title || item.name}
              </div>
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
            <Carousel 
              interval={3000} 
              indicators={true}
              onMouseEnter={() => {
                const carouselInstance = window.bootstrap.Carousel.getInstance(movieCarouselRef.current);
                if (carouselInstance) carouselInstance.pause();
              }}
              onMouseLeave={() => {
                const carouselInstance = window.bootstrap.Carousel.getInstance(movieCarouselRef.current);
                if (carouselInstance) carouselInstance.cycle();
              }}
            >
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
          <Carousel 
            interval={3000} 
            indicators={true}
            onMouseEnter={() => {
              const carouselInstance = window.bootstrap.Carousel.getInstance(showCarouselRef.current);
              if (carouselInstance) carouselInstance.pause();
            }}
            onMouseLeave={() => {
              const carouselInstance = window.bootstrap.Carousel.getInstance(showCarouselRef.current);
              if (carouselInstance) carouselInstance.cycle();
            }}
          >
            {renderCarouselItems(shows, 'show')}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default TopRated;
