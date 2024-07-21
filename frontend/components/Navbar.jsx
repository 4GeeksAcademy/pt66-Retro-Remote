import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../assets/css/Navbar.css';

const apiKey = 'a7ba0658cfc3a38d6d91557702b4f43a';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (query.length > 2) {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}`);
        setResults(response.data.results || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const handleInputChange = async (event) => {
    const query = event.target.value;
    setQuery(query);

    if (query.length > 2) {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}`);
        setSuggestions(response.data.results || []);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title || suggestion.name);
    setResults([suggestion]);
    setSuggestions([]);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid welcome">
          <a className="navbar-brand" href="#">Welcome to:____________</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse searchbar" id="navbarNavDropdown">
            <form className="d-flex me-auto searchBar" onSubmit={handleSearch}>
              <div style={{ position: 'relative' }}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={query}
                  onChange={handleInputChange}
                  style={{ width: '400px' }} // Adjust the width as needed
                />
                {suggestions.length > 0 && (
                  <ul className="list-group position-absolute" style={{ width: '400px', zIndex: 1000 }}>
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.id}
                        className="list-group-item list-group-item-action"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion.title || suggestion.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button className="btn" type="submit">Search</button>
            </form>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Menu
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a className="dropdown-item" href="#">Sign in</a></li>
                  <li><a className="dropdown-item" href="#">Favorites</a></li>
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="row">
          {results.map((item) => (
            <div className="col-md-3 mb-4" key={item.id}>
              <div className="card">
                <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className="card-img-top" alt={item.title || item.name} />
                <div className="card-body">
                  <h5 className="card-title">{item.title || item.name}</h5>
                  <p className="card-text">{item.release_date || item.first_air_date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;





