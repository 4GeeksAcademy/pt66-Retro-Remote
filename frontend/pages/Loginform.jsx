import React, { useState } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer';
// import './Login.css';

// Import necessary hooks and functions from React.
import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store"  // Import the reducer and the initial state.




const Login = async () => {
    const [active, setActive] = useState(false);
    const {dispatch} = useGlobalReducer();

    const handleRegisterClick = () => {
        setActive(true);
    };

    const handleLoginClick = () => {
        setActive(false);
    };
    const handleLoginSubmit = async (formData) => {
        const resp = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        } )
        if (resp.ok) {
        const data = await resp.json();
        dispatch({ type: 'LOGIN_SUCCESS', payload: data });
        } else {
            dispatch({ type: 'LOGIN_FAILURE', payload: 'Login failed' });
        }
        
    }

   
   
    
    

 


    return <>
        <div className={`wrapper ${active ? 'active' : ''}`}>
            <div className="form-box login">
                <h2 className="animation" style={{ '--i': 0, '--j': 21 }}>Login</h2>
                <form action="#">
                    <div className="input-box animation" style={{ '--i': 1, '--j': 22 }}>
                        <input type="text" required />
                        <label>Username</label>
                        <i className="bx bxs-user"></i>
                    </div>
                    <div className="input-box animation" style={{ '--i': 2, '--j': 23 }}>
                        <input type="password" required />
                        <label>Password</label>
                        <i className="bx bxs-lock-alt"></i>
                    </div>
                    <button type="submit" className="btn animation" style={{ '--i': 3, '--j': 24 }}>Login</button>
                    <div className="logreg-link animation" style={{ '--i': 4, '--j': 25 }}>
                        <p>Don't have an account? <a href="#" className="register-link" onClick={handleRegisterClick}>Sign Up</a></p>
                    </div>
                </form>
            </div>
            <div className="info-text login">
                <h2 className="animation" style={{ '--i': 0, '--j': 20 }}>A Retro Welcome!</h2>
                <p className="animation" style={{ '--i': 1, '--j': 21 }}>Welcome back to Retro Remote enjoy your stay</p>
            </div>

            <div className="form-box register">
                <h2 className="animation" style={{ '--i': 17, '--j': 0 }}>Sign Up</h2>
                <form action="#">
                    <div className="input-box animation" style={{ '--i': 18, '--j': 1 }}>
                        <input 
                        type="text" 
                        value={username}
                        onChange={(ev) => setUsername(ev.target.value)}
                        placeholder='username'
                        />
                        <i className="bx bxs-user"></i>
                    </div>
                    <div className="input-box animation" style={{ '--i': 19, '--j': 2 }}>
                        <input 
                        type="text" 
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                        placeholder='email'
                        required />
                        <label>Email</label>
                        <i className="bx bxs-envelope"></i>
                    </div>
                    <div className="input-box animation" style={{ '--i': 20, '--j': 3 }}>
                        <input 
                        type="password"
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)}
                        placeholder='password'
                        required />
                        <label>Password</label>
                        <i className="bx bxs-lock-alt"></i>
                    </div>
                    <button type="submit" className="btn animation" style={{ '--i': 21, '--j': 4 }}>Sign Up</button>
                    <div className="logreg-link animation" style={{ '--i': 22, '--j': 5 }}>
                        <p>Already have an account? <a href="#" className="login-link" onClick={handleLoginClick}>Login</a></p>
                    </div>
                </form>
            </div>
            <div className="info-text register">
                <h2 className="animation" style={{ '--i': 17, '--j': 0 }}>Welcome Back!</h2>
                <p className="animation" style={{ '--i': 18, '--j': 1 }}>Please sign up to view all our amazing content</p>
            </div>
        </div>
    </>
};

export default Login;
