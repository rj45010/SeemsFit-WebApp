import React from 'react';
import '../css/SeePlans.css';
import Dropdown from '../plans/Dropdown';
import renderWorkoutSection from '../plans/RenderWorkout';
import DownloadPDFButton from '../plans/DownloadPDF';

const FiveDaysWeek = () => {
  return (
    <div>
      <div className="container">
        <Dropdown />
      </div>

      <div className="container" id="workout-container">
        <p className="schedule">
          <strong>5 Days Week (Beginner)</strong><br />
          Monday: Chest & Triceps<br />
          Tuesday: Back & Biceps<br />
          Wednesday: Rest Day<br />
          Thursday: Shoulder & Triceps<br />
          Friday: Legs & Biceps<br />
          Saturday: Rest day<br />
          Sunday: Cardio & Core
        </p>

        {renderWorkoutSection("Chest & Triceps", [
          ["Chest Press", "4 sets", "8 reps"],
          ["Triceps Pushdown", "4 sets", "10 reps"],
          ["Chest Fly", "4 sets", "12 reps"],
          ["Skull Crusher", "4 sets", "12 reps"],
          ["Pushups", "4 sets", "Till Failure"],
        ])}

        {renderWorkoutSection("Back & Biceps", [
          ["Standing Rows", "4 sets", "10 reps"],
          ["Lat Pulldown", "4 sets", "10 reps"],
          ["Standing Pullover", "4 sets", "10 reps"],
          ["Lateral Raises", "4 sets", "10 reps"],
          ["Bicep Curl", "4 sets", "12 reps"],
        ])}

        {renderWorkoutSection("Shoulder & Triceps", [
          ["Shoulder press", "4 Sets", "10 reps"],
          ["Dips", "4 Sets", "10 reps"],
          ["Standing Tricep Kickback", "4 Sets", "10 reps"],
          ["Underhand flys", "4 Sets", "12 reps"],
          ["Reverse flys", "4 Sets", "12 reps"],
          ["Overhead Tricep Extension", "4 Sets", "12 reps"],
        ])}

        {renderWorkoutSection("Legs & Biceps", [
          ["Lunges", "4 Sets", "10 reps each side"],
          ["Seated Calf Raise", "4 Sets", "12 reps"],
          ["Lying alternating leg curls", "4 Sets", "12 reps"],
          ["Biceps curls", "4 Sets", "12 reps"],
          ["Squats", "4 Sets", "12 reps"],
        ])}

        {renderWorkoutSection("Cardio & Core", [
          ["Running/Biking/Jumping Rope/Aerobics", "-", "30 Min"],
          ["Crunches", "4 Sets", "12 reps"],
          ["Mountain climbers", "4 Sets", "12 reps"],
          ["Side Knee Drops", "4 Sets", "12 reps"],
          ["Bicycle crunches", "4 Sets", "12 reps"],
          ["Glute bridges", "4 Sets", "12 reps"],
        ])}
        <br />
        <p>Workout Plan from: <a href="https://hygearfit.com/" target="_blank" rel="noopener noreferrer">www.hygearfit.com</a></p>
        <br />
        <p><em>Note : Workouts may have been changed slightly.</em></p>
      </div>

      <div className='d-flex justify-content-center mt-4 mb-4'>
        <DownloadPDFButton targetId="workout-container" fileName="5DayBeginner.pdf" />
      </div>

    </div>
  );
};

export default FiveDaysWeek;
