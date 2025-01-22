import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { registerUser } from '../utils/authUtils';  
import SignInwithGoogle from './SignInWithGoogle';
import {useTheme} from './ThemeProvider';

const GetStartedPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const { theme } = useTheme();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await registerUser(email, password, fname, lname);

    if (response.success) {
      setSuccessMessage(response.message);
      setEmail('');
      setPassword('');
      setFname('');
      setLname('');
      setError('');
      setTimeout(() => {
        setRedirectToLogin(true);
      }, 2000);
    } else {
      setError(response.message);
    }
  };

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="gradient-background-login">
      <div className="container vh-100 pt-4">
        <div className="login_form">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card" style={{ borderRadius: '2rem' }}>
              <div className="card-body p-5 text-center">
                <h5 className='mb-3'>Fill in details to sign up</h5>

                <form onSubmit={handleRegister}>
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  {successMessage && (
                    <div className="alert alert-success" role="alert">
                      {successMessage}
                    </div>
                  )}

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="First Name"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Last Name"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className={`btn ${theme === "dark" ? "btn-outline-light" : "btn-outline-dark"} btn-lg px-4 me-md-2`}
                    >
                      Register
                    </button>
                  </div>

                  <p className="text-center text-muted mt-5 mb-0">
                    Already have an account?{' '}
                    <Link to="/login" className="fw-bold text-body">
                      <u>Login here</u>
                    </Link>
                  </p>
                  <br />
                  <SignInwithGoogle />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedPage;
