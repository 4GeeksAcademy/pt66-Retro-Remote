import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/Login.css';
import { useGlobalReducer } from '../store';

const Login = () => {
  const { store, dispatch } = useGlobalReducer();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setError('');
    // Implement your actual login logic here
    // On success, dispatch the token
    const fakeToken = 'your_real_token_from_api';
    dispatch({ type: 'set_token', payload: fakeToken });
  };

  const setTestToken = () => {
    const newToken = store.token === null ? 'your_test_token' : null;
    dispatch({ type: 'set_token', payload: newToken });
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h2 className="text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <div className="text-danger mt-2">{error}</div>}
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
          <div className="text-center mt-3">
            <button className="btn btn-primary" onClick={setTestToken}>
              {store.token ? 'Clear Test Token' : 'Set Test Token'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
