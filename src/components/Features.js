import React from 'react';
import { Link } from 'react-router-dom'; 
import {useTheme} from './ThemeProvider';

const Features = () => {
  const {theme} = useTheme();
  return (
    <section id="content">
      <div className="container py-4">
        <div className="p-5 mb-4 bg-body-tertiary rounded-3">
          <div className="container-fluid py-2">
            <h1 className="display-5 fw-bold"
              style={{color : theme === "dark" ? "white" : "black"}}>
              Create Plan</h1>
            <p className="col-md-8 fs-4">
              Allows you to personalize your fitness routines by selecting exercises, adjusting sets, reps, and rest intervals.
            </p>
            <Link to="/create-plan" className={`btn ${theme === "dark" ? "btn-light" : "btn-dark"} btn-lg`} type="button">
              Start Journey
            </Link>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-bg-dark rounded-3">
              <h2>Workout Plans</h2>
              <p>
                Start your fitness journey with expertly crafted workout plans.
              </p>
              <Link to="/workout-plans" className="btn btn-outline-light" type="button">
                See plans
              </Link>
            </div>
          </div>

          <div className="col-md-6">
            <div className="h-100 p-5 bg-body-tertiary rounded-3">
              <h2>Your Workouts</h2>
              <p>
                Track your progress and review previous workout plans. This feature helps monitor achievements, set new goals, and stay motivated by providing a comprehensive history of your fitness journey.
              </p>
              <Link to="/my-plan" className={`btn ${theme === "dark" ? "btn-light" : "btn-dark"} btn-lg`} type="button">
                My Plans
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
