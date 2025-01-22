import React from 'react';
import '../css/SeePlans.css';
import Dropdown from './Dropdown';


const WorkoutPlans = () => {
  return (
    <div className='vh-100'>
    <div className="container plan-page">
      <Dropdown />
      {/* <p className="text-center mt-3">Choose a Workout Plan</p> */}
    </div>
    </div>
  );
};

export default WorkoutPlans;