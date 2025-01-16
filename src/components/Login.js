import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Login.css';
import { signInWithEmail } from '../utils/authUtils'; // Import the function
import SignInwithGoogle from './SignInWithGoogle';
import {useTheme} from './ThemeProvider';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signInWithEmail(email, password);

    if (success) {
      navigate('/home');
    } else {
      setError('Login failed. Please check your credentials or verify your email.');
    }
  };

  return (
    <section className="loginbg">
      <div className="container pt-5">
        <div className="login_form">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card text-white" style={{ borderRadius: '3rem' }}>
              <div className="card-body py-5 text-center">
                <div>
                  <p className="text-50 mb-2 pt-2" style={{ color: theme === 'dark' ? 'white' : 'black'}}>Please enter your login and password!</p>
                  <br />
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <p className="small">
                    <a className="text-50" 
                    style={{ color: theme === "light" ? "black" : "white" }}
                    href="/forgot-password">
                      Forgot password?</a>
                  </p>

                  <button
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className={`btn ${theme === "dark" ? "btn-outline-light" : "btn-outline-dark"} btn-lg mb-3`}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                </div>

                <div>
                  <p style={{ color: theme === 'dark' ? 'white' : 'black'}}>Don't have an account? &nbsp;
                    <Link 
                      to="/get-started" 
                      className="fw-bold"
                      style={{ color: theme === 'dark' ? 'white' : 'black'}}>
                        Create New
                      </Link>
                  </p>
                  <SignInwithGoogle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
