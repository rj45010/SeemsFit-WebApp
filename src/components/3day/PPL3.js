import React from 'react';
import '../css/SeePlans.css';
import Dropdown from '../plans/Dropdown';
import renderWorkoutSection from '../plans/RenderWorkout';
import DownloadPDFButton from '../plans/DownloadPDF';

const PPLWorkout1 = () => {
  return (
    <div>
      <div className="container">
        <Dropdown />
      </div>

      {/* 3-Day PPL Schedule */}
      <div className="container" id="workout-container">
        <p className="schedule">
          <strong>3 Day PPL Schedule</strong><br />
          Monday: Push<br />
          Tuesday: Rest day<br />
          Wednesday: Pull<br />
          Thursday: Rest day<br />
          Friday: Legs<br />
          Saturday: Rest day<br />
          Sunday: Rest day
        </p>

        {renderWorkoutSection("Push", [
          ["Bench Press", "3 Sets", "6-8 reps"],
          ["Seated Shoulder Press", "3 Sets", "8-12 reps"],
          ["Incline Dumbbell Press", "3 Sets", "8-12 reps"],
          ["Lateral Raises", "3 Sets", "8-12 reps"],
          ["Triceps Dumbbell Extension", "3 Sets", "8-12 reps"],
          ["Triceps Rope Pressdown", "3 Sets", "8-12 reps"],
        ])}

        {renderWorkoutSection("Pull", [
          ["Lat Pulldown", "3 Sets", "8-12 reps"],
          ["Bent Over Row", "3 Sets", "8-12 reps"],
          ["Face Pulls", "3 Sets", "8-12 reps"],
          ["Dumbbell Shrugs", "3 Sets", "8-12 reps"],
          ["Bicep Barbell Curls", "3 Sets", "8-12 reps"],
          ["Hammer Curls", "3 Sets", "8-12 reps"],
        ])}

        {renderWorkoutSection("Legs", [
          ["Squat Barbell", "3 Sets", "8-12 reps"],
          ["Leg Press", "3 Sets", "8-12 reps"],
          ["Leg Extension", "3 Sets", "8-12 reps"],
          ["Seated Leg Curl", "3 Sets", "8-12 reps"],
          ["Standing Calf Raises", "3 Sets", "8-12 reps"],
        ])}

        <p>
          Workout Plan from : <a href="https://www.hevyapp.com/">www.hevyapp.com</a>
        </p>
        <p><em>Note : Workouts may have been changed slightly.</em></p>
      </div>
      
      <div className='d-flex justify-content-center mt-4 mb-4'>
        <DownloadPDFButton targetId="workout-container" fileName="3DayPPL.pdf" />
      </div>

    </div>
  );
};

export default PPLWorkout1;
