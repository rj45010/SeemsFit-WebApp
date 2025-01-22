import React from 'react';
import { Link } from 'react-router-dom';
import './css/Home.css';
import workoutImage from '../assests/workout-tracker-printable.PNG';
import {useTheme} from './ThemeProvider';

const Home = () => {

  const { theme } = useTheme();

  return (
    <div>
      {/* Hero Section */}
      <section id="Hero" className={theme === 'light' ? 'gradient-background-light' : 'gradient-background-dark'}>
        <div className="container col-xxl-8 px-4 pt-5">
          <div className="row flex-lg-row-reverse align-items-center g-5">
            <div className="col-10 col-sm-8 col-lg-6 image-container">
              <img
                src={workoutImage}
                className="d-block mx-lg-auto img-fluid"
                alt="Workout Tracker"
                width="700"
                height="500"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6">
            <h1
                className="display-5 fw-bold lh-1 mb-2 text-start"
                style={{ color: theme === "light" ? "black" : "white" }}
                >Welcome
              </h1>
              <p 
                className="lead"
                style={{ color: theme === "light" ? "black" : "white" }}
                >Let's get started and get growing.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start pb-5">
                <Link 
                  to="/login" 
                  className={`btn ${theme === "dark" ? "btn-dark" : "btn-light"} btn-lg px-4 me-md-2`}
                  >
                  Log in
                </Link>
                <Link 
                  to="/get-started" 
                  className={`btn ${theme === "dark" ? "btn-outline-dark" : "btn-outline-light"} btn-lg px-4 me-md-2`}
                  >
                  Get Started
                </Link>
              </div> 
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container">
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <h3 className="fs-2 text-body-emphasis">Create Workout</h3>
            <p className='detail'>
              Whether you're a beginner or an advanced athlete, you can select
              exercises, set durations, and customize routines to match your
              needs.
            </p>
          </div>

          <div className="feature col">
            <h3 className="fs-2 text-body-emphasis">Expert workout plans</h3>
            <p className='detail'>
              Not sure where to start? We provide a variety of pre-designed
              workout plans crafted by fitness experts.
            </p>
          </div>

          <div className="feature col">
            <h3 className="fs-2 text-body-emphasis">Track workout</h3>
            <p className='detail'>
              Stay on top of your fitness journey with our comprehensive workout
              tracking feature. Log your exercises, monitor your progress, and
              analyze your performance over time.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="key-benefits">
        <div className="benefits">
          <div className="bg-body-tertiary py-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
            <div className="my-3 p-3">
              <h5 className="hdisplay">Physical Health Benefits</h5>
            </div>
            <div className="bg-body">
              <br />
              <ul>
                <li>Improved cardiovascular health</li>
                <li>Weight management</li>
                <li>Boosted immune system and more</li>
              </ul>
            </div>
          </div>
          <div className="bg-body-tertiary py-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
            <div className="my-3 py-3">
              <h5 className="hdisplay">Mental Health Benefits</h5>
            </div>
            <div className="bg-body">
              <br />
              <ul>
                <li>Reduced stress and anxiety</li>
                <li>Better sleep</li>
                <li>Boosted self-esteem and more</li>
              </ul>
            </div>
          </div>
          <div className="bg-body-tertiary py-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
            <div className="my-3 py-3">
              <h5 className="hdisplay">Emotional Health Benefits</h5>
            </div>
            <div className="bg-body">
              <br />
              <ul>
                <li>Improved mental resilience</li>
                <li>Enhanced social connections</li>
                <li>Better mental clarity and more</li>
              </ul>
            </div>
          </div>
          <div className="bg-body-tertiary py-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
            <div className="my-3 py-3">
              <h5 className="hdisplay">Long-term Health Benefits</h5>
            </div>
            <div className="bg-body">
              <br />
              <ul>
                <li>Reduced risk of chronic diseases</li>
                <li>Improved longevity</li>
                <li>Delayed aging process and more</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;