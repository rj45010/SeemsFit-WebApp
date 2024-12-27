import React from 'react';
import '../css/SeePlans.css';
import Dropdown from '../plans/Dropdown';
import renderWorkoutSection from '../plans/RenderWorkout';
import DownloadPDFButton from '../plans/DownloadPDF';

const ThreeDaysWeek1 = () => {
  return (
    <div>
      <div className="container">
        <Dropdown />
      </div>

      <div className="container" id="workout-container">
        <p className="schedule">
          <strong>3 Days Week (Full Body)</strong><br />
          Day 1: Full Body Strength<br />
          Day 2: Rest Day<br />
          Day 3: Upper Body & Legs<br />
          Day 4: Rest Day<br />
          Day 5: Deadlift Focus & Isolation<br />
          Day 6: Rest Day<br />
        </p>
        
        {renderWorkoutSection("Day 1: Full Body Strength", [
          ["Squat", "5 Sets", "5 reps"],
          ["Dumbbell Bench Press", "4 Sets", "10 reps"],
          ["Dumbbell Row", "4 Sets", "10 reps"],
          ["Shoulder Press", "4 Sets", "10 reps"],
          ["Lateral Raise", "4 Sets", "10 reps"],
          ["Biceps Curl", "3 Sets", "12 reps"],
        ])}

        {renderWorkoutSection("Day 3: Upper Body & Legs", [
          ["Bench Press", "5 Sets", "5 reps"],
          ["Leg Curl", "4 Sets", "10 reps"],
          ["Lunges", "4 Sets", "10 reps"],
          ["Lat Pulldown", "4 Sets", "10 reps"],
          ["Lateral Raise", "4 Sets", "10 reps"],
          ["Bar Triceps Extension", "3 Sets", "12 reps"],
        ])}

        {renderWorkoutSection("Day 5: Deadlift Focus & Isolation", [
          ["Deadlift", "5 Sets", "5 reps"],
          ["Incline Dumbbell Press", "4 Sets", "10 reps"],
          ["Biceps Curl", "3 Sets", "12 reps"],
          ["Leg Press", "4 Sets", "10 reps"],
          ["Skullcrushers", "3 Sets", "10 reps"],
          ["Dumbbell Shrugs", "3 Sets", "12 reps"],
        ])}

        <p><em>Note : Workouts may have been changed slightly.</em></p>
      </div>

      <div className='d-flex justify-content-center mt-4 mb-4'>
        <DownloadPDFButton targetId="workout-container" fileName="3DayFullBody.pdf" />
      </div>

    </div>
  );
};

export default ThreeDaysWeek1;
