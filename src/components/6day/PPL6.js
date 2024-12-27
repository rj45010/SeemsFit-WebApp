import React from 'react';
import '../css/SeePlans.css';
import Dropdown from '../plans/Dropdown';
import renderWorkoutSection from '../plans/RenderWorkout';
import DownloadPDFButton from '../plans/DownloadPDF';

const PPLWorkout = () => {
  return (
    <div>
      <div className="container">
        <Dropdown />
      </div>

      <div className="container" id="workout-container">
        <p className="schedule">
          <strong>6 Day PPL Schedule (Saket Gokhale)</strong><br />
          Monday: Push<br />
          Tuesday: Legs<br />
          Wednesday: Pull<br />
          Thursday: Push<br />
          Friday: Legs<br />
          Saturday: Pull<br />
          Sunday: Rest day
        </p>

        {renderWorkoutSection("Push", [
          ["Incline Bench Press", "4 Sets", "8 reps"],
          ["Seated Chest Press", "4 Sets", "8 reps"],
          ["Overhead Tricep Extension", "3 Sets", "10-15 reps"],
          ["Lateral Raises", "5 Sets", "15-20 reps"],
          ["Tricep Pushdown", "3 Sets", "10-15 reps"],
        ])}

        {renderWorkoutSection("Legs", [
          ["Leg Curls", "5 Sets", "10-15 reps"],
          ["Hack Squat or Leg Press", "5 Sets", "10-15 reps"],
          ["Calf Raises", "5 Sets", "10-20 reps"],
          ["Seated Dumbbell Overhead Press", "2-3 Sets", "8-12 reps"],
        ])}

        {renderWorkoutSection("Pull", [
          ["Lat Pull Down", "3 Sets", "8-12 reps"],
          ["Seated Row", "3-4 Sets", "8-12 reps"],
          ["Lat Pull Over", "2-3 Sets", "8-12 reps"],
          ["Reverse Pec Deck Fly", "3 Sets", "12-15 reps"],
          ["Bicep Curl", "3-4 Sets", "10-15 reps"],
        ])}

        <p>
          Workout Plan from : 
          <a href="https://www.youtube.com/channel/UCfgrg0SXgNkZ7rTbnZCp6tg">
            Saket Gokhale
          </a>
        </p>
        <p><em>Note : Workouts may have been changed slightly.</em></p>
      </div>

      <div className='d-flex justify-content-center mt-4 mb-4'>
        <DownloadPDFButton targetId="workout-container" fileName="6DayPPL(Saket).pdf" />
      </div>

    </div>
  );
};

export default PPLWorkout;
