import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../assets/css/TopRated.css'; 
import { useGlobalReducer } from '../store';

function TopRated() {
  const { store } = useGlobalReducer();
  const { movies = [], shows = [] } = store;

  console.log('Movies in TopRated:', movies); 
  console.log('Shows in TopRated:', shows);  

  if (!movies.length && !shows.length) {
    return <div>Loading...</div>;
  }

  const renderCarouselItems = (items, type) => {
    const chunkedItems = [];
    for (let i = 0; i < items.length; i += 4) {
      chunkedItems.push(items.slice(i, i + 4));
    }

    return chunkedItems.map((group, index) => (
      <Carousel.Item key={`${type}-${index}`}>
          {group.map(item => (
            <div key={item.id}>
              {item.poster_path ? (
                <img 
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
                  alt={type === 'movie' ? item.title : item.name} 
                  className="imgBorder"
                  style={{ width: "140px", height: "210px" }}
                />
              ) : (
                <div>No image available</div>
              )}
              {/* <Carousel.Caption>
                <p className={type === 'movie' ? "movieTitle" : "showTitle"}>
                  {type === 'movie' ? item.title : item.name}
                </p>
              </Carousel.Caption> */}
            </div>
          ))}
      </Carousel.Item>
    ));
  };

  return (
    <div className="firstCon">
      <div className="carousel">
        <div className="topRated">
          <h1 className="title">Top Rated Movies</h1>
        </div>
        <Carousel  indicators={true}>
          {renderCarouselItems(movies, 'movie')}
        </Carousel>
      </div>
      <div className="carousel">
        <div className="topRated">
          <h1 className="title">Top Rated TV Shows</h1>
        </div>
        <Carousel  indicators={true}>
          {renderCarouselItems(shows, 'show')}
        </Carousel>
        {/* interval={5000}
interval={5000} */}
      </div>
    </div>
  );
}

export default TopRated;
