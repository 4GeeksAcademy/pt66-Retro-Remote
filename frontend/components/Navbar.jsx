import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../assets/css/Navbar.css';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const {username} = store;
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const dropdownRef = useRef(null);

  const apiBaseUrl = import.meta.env.VITE_BACKEND_URL;
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w92';

  const fetchSuggestions = async (query) => {
    try {
      console.log('fetch suggestions');
      console.log(query);
      const response = await axios.get(`${apiBaseUrl}/api/search`, { params: { query } });
     

      setSuggestions(response.data.results || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    console.log('in handle Search');
    if (query.length > 2) {
      try {

        const response = await axios.get(`${apiBaseUrl}/search`, { params: { query } });
        setResults(response.data.results || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    if (newQuery.length > 2) {
      fetchSuggestions(newQuery);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title || suggestion.name);
    console.log(suggestion);
    setResults([suggestion]);
    setSuggestions([]);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
  };

  useEffect(() => {
    const dropdown = dropdownRef.current;

    const showDropdown = () => console.log('Dropdown is shown');
    const hideDropdown = () => console.log('Dropdown is hidden');

    if (dropdown) {
      dropdown.addEventListener('show.bs.dropdown', showDropdown);
      dropdown.addEventListener('hide.bs.dropdown', hideDropdown);
    }

    return () => {
      if (dropdown) {
        dropdown.removeEventListener('show.bs.dropdown', showDropdown);
        dropdown.removeEventListener('hide.bs.dropdown', hideDropdown);
      }
    };
  }, []);

  const handleSignOut = () => {
    
    dispatch({ type: 'LOGOUT' });
    window.location.href = '/'; 
  };

  return (
    <div>
      {
        !store.token ?
        (<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid ps-5">
               <ul className="navbar-nav d-flex w-100 justify-content-between">
                  <li className="nav-item">
                  <p className="navbar-brand" href="#">Welcome To Retro Remote</p>

                  </li>
                  <li className="nav-item m-4">
                    <Link className="nav-link nav-login-link" to="/login">Login</Link>
                  </li>
                </ul>         
          </div>
        </nav> )
        :
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid ps-5">
          <a className="navbar-brand" href="#">Welcome {username}</a>
          <button className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <form className="d-flex me-auto" onSubmit={handleSearch}>
                <div style={{ position: 'relative' }}>
                  <input
                    className="form-control me-2 search-bar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={query}
                    onChange={handleInputChange}
                    style={{ width: '400px' }}
                  />
                  {query && (
                    <button
                      type="button"
                      className="btn btn-clear clear"
                      onClick={clearSearch}
                    >
                      &times;
                    </button>
                  )}
                  {suggestions.length > 0 && (
                    <ul className="list-group position-absolute" style={{ width: '400px', zIndex: 1000 }}>
                      {suggestions.slice(0, 10).map((suggestion) => (
                      <Link to={suggestion.media_type === 'movie' ? `movie/${suggestion.id}` : `show/${suggestion.id}`}>
                      <li
                          key={suggestion.id}
                          className="list-group-item list-group-item-action d-flex align-items-center suggestion-item"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <img
                            src={`${imageBaseUrl}${suggestion.poster_path}`}
                            alt={suggestion.title || suggestion.name}
                            className="me-2"
                            style={{ width: '40px', height: '60px', objectFit: 'cover' }}
                          />
                          <span>{suggestion.title || suggestion.name}</span>
                        </li>
                        </Link>
                      ))}
                    </ul>
                  )}
                </div>
                <button className="btn search" type="submit">Search</button>
              </form>
              <ul className="navbar-nav ms-auto menu">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle pe-5" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" ref={dropdownRef}>
                    Menu
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><a className="dropdown-item" href="#">Favorites</a></li>
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><a className="dropdown-item" href="#" onClick={handleSignOut}>Sign out</a></li>
                  </ul>
                </li>
              </ul>
        </div>
      </div>
    </nav>
      }
    </div>
  );
};


export default Navbar;