import React, { useEffect, useRef } from 'react';
import '../assets/css/TopRated.css';
import { Carousel } from 'react-bootstrap';
import useGlobalReducer from '../hooks/useGlobalReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function TopRated() {
  const { store } = useGlobalReducer();
  const { movies = [], shows = [], token } = store;
  const movieCarouselRef = useRef(null);
  const showCarouselRef = useRef(null);
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  useEffect(() => {
    const handleMouseEnter = (carouselElement) => {
      const carouselInstance = window.bootstrap.Carousel.getInstance(carouselElement);
      if (carouselInstance) carouselInstance.pause();
    };

    const handleMouseLeave = (carouselElement) => {
      const carouselInstance = window.bootstrap.Carousel.getInstance(carouselElement);
      if (carouselInstance) carouselInstance.cycle();
    };

    const movieCarouselElement = movieCarouselRef.current;
    const showCarouselElement = showCarouselRef.current;

    if (movieCarouselElement) {
      movieCarouselElement.addEventListener('mouseenter', () => handleMouseEnter(movieCarouselElement));
      movieCarouselElement.addEventListener('mouseleave', () => handleMouseLeave(movieCarouselElement));
    }

    if (showCarouselElement) {
      showCarouselElement.addEventListener('mouseenter', () => handleMouseEnter(showCarouselElement));
      showCarouselElement.addEventListener('mouseleave', () => handleMouseLeave(showCarouselElement));
    }

    return () => {
      if (movieCarouselElement) {
        movieCarouselElement.removeEventListener('mouseenter', () => handleMouseEnter(movieCarouselElement));
        movieCarouselElement.removeEventListener('mouseleave', () => handleMouseLeave(movieCarouselElement));
      }
      if (showCarouselElement) {
        showCarouselElement.removeEventListener('mouseenter', () => handleMouseEnter(showCarouselElement));
        showCarouselElement.removeEventListener('mouseleave', () => handleMouseLeave(showCarouselElement));
      }
    };
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
            <div key={item.id} className="p-3 topRated-item">
              <Link to={isAuthenticated && token ? `/${type}/${item.id}` : "/login"}>
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
          <Carousel 
            ref={movieCarouselRef} 
            interval={3000} 
            indicators={true}
          >
            {renderCarouselItems(movies, 'movie')}
          </Carousel>
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
            ref={showCarouselRef} 
            interval={3000} 
            indicators={true}
          >
            {renderCarouselItems(shows, 'show')}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default TopRated;
