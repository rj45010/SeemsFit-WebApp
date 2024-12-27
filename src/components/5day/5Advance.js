import React from 'react';
import '../css/SeePlans.css';
import Dropdown from '../plans/Dropdown';
import renderWorkoutSection from '../plans/RenderWorkout';
import DownloadPDFButton from '../plans/DownloadPDF';

const FiveDaysWeek1 = () => {
  return (
    <div>
      <div className="container">
        <Dropdown />
      </div>

      <div className="container" id="workout-container">
        <p className="schedule">
          <strong>5 Days Week (Intermediate and Advanced)</strong><br />
          Monday: Chest<br />
          Tuesday: Back<br />
          Wednesday: Arms<br />
          Thursday: Legs<br />
          Friday: Shoulder<br />
          Saturday: Rest day<br />
          Sunday: Rest day
        </p>

        {renderWorkoutSection("Chest", [
          ["Flat Bench Press", "4 sets", "6-10 reps"],
          ["Flat Bench DB Fly", "3 sets", "8-10 reps"],
          ["Incline DB Bench Press", "4 sets", "8-10 reps"],
          ["Low to High Cable Fly", "3 sets", "10 reps"],
          ["Chest Dips", "3 sets", "10 reps"],
        ])}

        {renderWorkoutSection("Back", [
          ["Deadlift", "4 sets", "3-6 reps"],
          ["Pull Ups", "4 sets", "6-12 reps"],
          ["Bent Over Rows", "4 sets", "8-12 reps"],
          ["Close Grip Lat Pulldown", "3 sets", "8-12 reps"],
          ["Machine High Row", "3 sets", "10-12 reps"],
        ])}

        {renderWorkoutSection("Arms", [
          ["Barbell Curl", "3 Sets", "8-10 reps"],
          ["Alternating Hammer Curls", "3 Sets", "10 reps each arm"],
          ["Reverse Cable Curl w/ Straight Bar", "3 Sets", "10-12 reps"],
          ["Triceps Pressdown w/ Rope", "3 Sets", "10-12 reps"],
          ["Triceps Kickback", "3 Sets", "10-12 reps"],
          ["Skull Crushers", "3 Sets", "8-10 reps"],
        ])}

        {renderWorkoutSection("Legs", [
          ["Back Squat", "4 Sets", "6-10 reps"],
          ["Stiff Leg or RDL", "3 Sets", "10 reps"],
          ["Split Squat", "3 Sets", "8-12 reps each side"],
          ["Hip Thrust", "3 Sets", "8-12 reps"],
          ["Leg Curl x Leg Extension (superset)", "3 Sets", "10-15 reps"],
          ["Standing or Seated Calf Raise", "3 Sets", "Max reps"],
        ])}

        {renderWorkoutSection("Shoulder", [
          ["Seated or Standing OHP", "4 Sets", "8-12 reps"],
          ["Arnold Press", "3 Sets", "10-12 reps"],
          ["Lateral Raise", "3 Sets", "10-15 reps"],
          ["Cable Y-Raise", "3 Sets", "10-12 reps"],
          ["Rear Delt Fly", "3 Sets", "10-12 reps"],
          ["Face Pull", "3 Sets", "10-15 reps"],
        ])}

        <br />
        <p>Workout Plan from: <a href="https://advancedbodymetrics.com/" target="_blank" rel="noopener noreferrer">www.advancedbodymetrics.com</a></p>
        <br />
        <p><em>Note: Workouts may have been changed slightly.</em></p>
      </div>

      <div className='d-flex justify-content-center mt-4 mb-4'>
        <DownloadPDFButton targetId="workout-container" fileName="5DayInter-Ad.pdf" />
      </div>

    </div>
  );
};

export default FiveDaysWeek1;
