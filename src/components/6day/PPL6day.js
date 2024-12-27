import React from 'react';
import '../css/SeePlans.css';
import Dropdown from '../plans/Dropdown';
import renderWorkoutSection from '../plans/RenderWorkout';
import DownloadPDFButton from '../plans/DownloadPDF';

const PPLWorkout2 = () => {
  return (
    <div>
      <div className="container">
        <Dropdown />
      </div>

      <div className="container" id="workout-container">
        <p className="schedule">
          <strong>6 Day PPL Schedule</strong><br />
          Monday: Push<br />
          Tuesday: Pull<br />
          Wednesday: Legs<br />
          Thursday: Push<br />
          Friday: Pull<br />
          Saturday: Legs<br />
        </p>

        {renderWorkoutSection("Monday (Push)", [
          ["Shoulder Press", "4 Sets", "12 reps"],
          ["Bench Press", "4 Sets", "8 reps"],
          ["Incline Bench Press", "4 Sets", "8 reps"],
          ["Triceps Pushdown", "3 Sets", "12 reps"],
        ])}

        {renderWorkoutSection("Tuesday (Pull)", [
          ["Bent Over Row", "3 Sets", "10 reps"],
          ["Seated Row", "3 Sets", "10 reps"],
          ["Lat Pull Down", "4 Sets", "10 reps"],
          ["Biceps Curl", "3 Sets", "12 reps"],
        ])}

        {renderWorkoutSection("Wednesday (Legs)", [
          ["Squats", "3 Sets", "8 reps"],
          ["Romanian Deadlift (RDL)", "3 Sets", "8 reps"],
          ["Hip Thrust", "3 Sets", "8 reps"],
          ["Calf Raise", "3 Sets", "12 reps"],
        ])}

        {renderWorkoutSection("Thursday (Push)", [
          ["Lateral Raise", "3 Sets", "15 reps"],
          ["Incline Press", "3 Sets", "12 reps"],
          ["Pec Fly", "3 Sets", "12 reps"],
          ["Triceps Pushdown", "3 Sets", "12 reps"],
        ])}

        {renderWorkoutSection("Friday (Pull)", [
          ["Seated Row", "3 Sets", "12 reps"],
          ["One Arm Row", "3 Sets", "12 reps"],
          ["V-Bar Lat Pull Down", "3 Sets", "12 reps"],
          ["Biceps Curl", "3 Sets", "12 reps"],
        ])}

        {renderWorkoutSection("Saturday (Legs)", [
          ["Leg Press", "3 Sets", "12 reps"],
          ["Goblet Squat", "3 Sets", "12 reps"],
          ["Stiff-Leg Deadlift (SLDL)", "3 Sets", "12 reps"],
          ["Calf Raise", "3 Sets", "12 reps"],
        ])}
        <p><em>Note : Workouts may have been changed slightly.</em></p>
      </div>

      <div className='d-flex justify-content-center mt-4 mb-4'>
        <DownloadPDFButton targetId="workout-container" fileName="6DayPPL.pdf" />
      </div>

    </div>
  );
};

export default PPLWorkout2;
