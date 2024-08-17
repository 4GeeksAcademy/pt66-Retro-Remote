import React, { useEffect, useRef } from 'react';
import '../assets/css/TopRated.css';
import { Carousel, Navbar } from 'react-bootstrap';
import useGlobalReducer from '../hooks/useGlobalReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function TopRated() {
  const { store } = useGlobalReducer();
  const { movies = [], shows = [] ,token } = store;
  const carouselRef = useRef(null);
  const isAuthenticated = localStorage.getItem('isAuthenticated')

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
            <div key={item.id} className="p-3 topRated-item">
              {
                isAuthenticated && item.poster_path && token ?  
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
              :
              <Link to="/login">
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

              }
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
                const carouselInstance = window.bootstrap.Carousel.getInstance(carouselRef.current.element);
                if (carouselInstance) carouselInstance.pause();
              }}
              onMouseLeave={() => {
                const carouselInstance = window.bootstrap.Carousel.getInstance(carouselRef.current.element);
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




