import React, { useState } from 'react';
// import './Login.css';

const Login = () => {
    const [active, setActive] = useState(false);

    const handleRegisterClick = () => {
        setActive(true);
    };

    const handleLoginClick = () => {
        setActive(false);
    };

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
                        <input type="text" required />
                        <label>Username</label>
                        <i className="bx bxs-user"></i>
                    </div>
                    <div className="input-box animation" style={{ '--i': 19, '--j': 2 }}>
                        <input type="text" required />
                        <label>Email</label>
                        <i className="bx bxs-envelope"></i>
                    </div>
                    <div className="input-box animation" style={{ '--i': 20, '--j': 3 }}>
                        <input type="password" required />
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
