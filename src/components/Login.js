import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Login.css';
import { signInWithEmail } from '../utils/authUtils'; // Import the function
import SignInwithGoogle from './SignInWithGoogle';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
            <div className="card bg-dark text-white" style={{ borderRadius: '3rem' }}>
              <div className="card-body py-5 text-center">
                <div>
                  <p className="text-white-50 mb-2 pt-2">Please enter your login and password!</p>
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
                    <a className="text-white-50" href="/forgot-password">Forgot password?</a>
                  </p>

                  <button
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-outline-light btn-lg mb-3"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                </div>

                <div>
                  <p>Don't have an account? &nbsp;
                    <Link to="/get-started" className="text-white-50 fw-bold">Create New</Link>
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
