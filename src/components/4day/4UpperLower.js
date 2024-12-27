import React from 'react';
import '../css/SeePlans.css'
import Dropdown from '../plans/Dropdown';
import renderWorkoutSection from '../plans/RenderWorkout';
import DownloadPDFButton from '../plans/DownloadPDF';

const FourDaysWeek1 = () => {
  return (
    <div>
      <div className="container">
        <Dropdown />
      </div>

      <div className="container" id="workout-container">
        <p className="schedule">
          <strong>4 Days a Week (Upper/Lower Split)</strong><br />
          Monday: Upper Strength<br />
          Tuesday: Lower Strength<br />
          Thursday: Upper Hypertrophy<br />
          Friday: Lower Hypertrophy<br />
          Saturday: Rest Day<br />
          Sunday: Rest Day<br />
        </p>

        {renderWorkoutSection("Monday (Upper Strength)", [
          ["Bench Press", "4 Sets", "6 reps"],
          ["Dumbbell Row", "4 Sets", "6 reps"],
          ["Shoulder Press", "4 Sets", "6 reps"],
          ["Lat Pull Down", "4 Sets", "6 reps"],
          ["Hyperextensions", "3 Sets", "12-15 reps"],
        ])}

        {renderWorkoutSection("Tuesday (Lower Strength)", [
          ["Smith Squat", "4 Sets", "6 reps"],
          ["Deadlift", "4 Sets", "6 reps"],
          ["Lunges", "4 Sets", "6 reps"],
          ["Hip Thrust", "4 Sets", "6 reps"],
        ])}

        {renderWorkoutSection("Thursday (Upper Hypertrophy)", [
          ["Incline Dumbbell Bench Press", "3 Sets", "12 reps"],
          ["Seated Cable Row", "3 Sets", "12 reps"],
          ["Shoulder Press", "3 Sets", "12 reps"],
          ["Lat Pull Down", "3 Sets", "12 reps"],
          ["Biceps Curl", "2 Sets", "12 reps"],
          ["Triceps Extensions", "2 Sets", "12 reps"],
        ])}

        {renderWorkoutSection("Friday (Lower Hypertrophy)", [
          ["Goblet Squat", "3 Sets", "12 reps"],
          ["Deadlift", "3 Sets", "12 reps"],
          ["Bulgarian Split Squat (Each Leg)", "3 Sets", "12 reps"],
          ["Hip Thrust or Hip Abductor Machine", "3 Sets", "12 reps"],
        ])}
        <p><em>Note : Workouts may have been changed slightly.</em></p>
      </div>

      <div className='d-flex justify-content-center mt-4 mb-4'>
        <DownloadPDFButton targetId="workout-container" fileName="3DayUpperLowerSplit.pdf" />
      </div>

    </div>
  );
};

export default FourDaysWeek1;
