import React from 'react';
import '../css/Plans.css';
import Dropdown from '../plans/Dropdown';
import renderWorkoutSection from '../plans/RenderWorkout';
import DownloadPDFButton from '../plans/DownloadPDF';

const ThreeDaysWeek = () => {
  return (
    <div>
      <div className="container">
        <Dropdown />
      </div>

      <div className="container" id="workout-container">
        <p className="schedule">
          <strong>3 Days Week Schedule</strong><br />
          Monday: Chest Shoulders & Triceps<br />
          Tuesday: Rest day<br />
          Wednesday: Back and Biceps<br />
          Thursday: Rest day<br />
          Friday: Legs and Core<br />
          Saturday: Rest Day<br />
          Sunday: Rest Day
        </p>


        {renderWorkoutSection("Chest Shoulders & Triceps", [
          ["Bench Press", "3 sets", "6-8 reps"],
          ["Incline Dumbbell Bench Press", "3 sets", "8-12 reps"],
          ["Cable Crossover", "3 sets", "8-12 reps"],
          ["Overhead Press", "3 sets", "8-12 reps"],
          ["Lateral Raises", "3 sets", "8-12 reps"],
          ["Skullcrushers", "3 sets", "8-12 reps"],
          ["Triceps Rope Pushdown", "3 sets", "8-12 reps"],
        ])}

        {renderWorkoutSection("Back and Biceps", [
          ["Seated Cable Row", "3 sets", "8-12 reps"],
          ["Lat Pulldown", "3 sets", "8-12 reps"],
          ["Bent-Over Fly Dumbbell", "3 sets", "8-12 reps"],
          ["Back Hyperextension", "3 sets", "8-12 reps"],
          ["Biceps Barbell Curls", "3 sets", "8-12 reps"],
          ["Hammer Curls", "3 sets", "8-12 reps"],
        ])}

        {renderWorkoutSection("Legs & Core", [
          ["Barbell Squat", "3 sets", "8-12 reps"],
          ["Leg Press", "3 sets", "8-12 reps"],
          ["Leg Extension", "3 sets", "8-12 reps"],
          ["Leg Curl", "3 sets", "8-12 reps"],
          ["Standing Calf Raises", "3 sets", "8-12 reps"],
          ["Plank", "3 sets", "30-60 sec"],
          ["Crunch", "3 sets", "15-20 reps"],
        ])}

        <br />
        <p>
          Workout Plan from :{' '}
          <a href="https://www.hevyapp.com/" target="_blank" rel="noopener noreferrer">
            www.hevyapp.com
          </a>
        </p>
        <br />
        <p>
          <em>Note: Workouts may have been changed slightly.</em>
        </p>
      </div>

      <div className='d-flex justify-content-center mt-4 mb-4'>
        <DownloadPDFButton targetId="workout-container" fileName="3DayWeek.pdf" />
      </div>

    </div>
  );
};

export default ThreeDaysWeek;
