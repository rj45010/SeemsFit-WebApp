import React from 'react';
import '../css/SeePlans.css';
import Dropdown from '../plans/Dropdown';
import renderWorkoutSection from '../plans/RenderWorkout';
import DownloadPDFButton from '../plans/DownloadPDF';

const FiveDaysWeek2 = () => {
  return (
    <div>
      <div className="container">
        <Dropdown />
      </div>

      <div className="container" id="workout-container">
        <p className="schedule">
          <strong>5 Days Week (For Female Beginner)</strong><br />
          Monday: Legs & Glutes<br />
          Tuesday: Back & Arms<br />
          Wednesday: Legs & Glutes<br />
          Thursday: Chest & Shoulders<br />
          Friday: Legs & Arms<br />
          Saturday: Rest day<br />
          Sunday: Rest day
        </p>

        {renderWorkoutSection("Legs & Glutes", [
          ["Squat", "3 Sets", "6-10 reps"],
          ["Dumbbell Lunge", "3 Sets", "12-15 reps"],
          ["Dumnnell Step UP", "3 Sets", "12-15 reps"],
          ["Hip Thrust", "3 Sets", "6-10 reps"],
          ["Glute Cable Kickback", "2 Set", "12-15 reps"],
        ])}

        {renderWorkoutSection("Back & Arms", [
          ["Pull Down", "3 Sets", "6-10 reps"],
          ["One Arm Dumbbell Row", "3 Sets", "12-15 reps"],
          ["Seated Row", "3 Sets", "12-15 reps"],
          ["Dumbbell Curl", "3 Sets", "12 reps"],
          ["Triceps Overhead Extension", "3 Sets", "12 reps"],
          ["Cable Curl", "3 Sets", "12 reps"],
          ["Cable Pressdown", "3 Sets", "15 reps"],
        ])}

        {renderWorkoutSection("Legs & Glutes", [
          ["Goblet Squat", "3 Sets", "10 reps"],
          ["Romanian Deadlift", "3 Sets", "12-15 reps"],
          ["Dumbbell Stiff Leg Deadlift", "3 Sets", "12 reps"],
          ["Smith Machine Sumo Squat", "3 Set", "8-10 reps"],
          ["Glute Kick Back", "3 Sets", "15 reps"],
        ])}

        {renderWorkoutSection("Chest & Shoulders", [
          ["Dumbbell Bench Press", "4 Sets", "12 reps"],
          ["Incline Dumbbell Press", "3 Sets", "12 reps"],
          ["Machine Chest Fly", "3 Sets", "12-15"],
          ["Seated Dumbbell Press", "3 Sets", "10 reps"],
          ["Lateral Raise", "3 Sets", "12-15 reps"],
        ])}

        {renderWorkoutSection("Legs & Arms", [
          ["Deadlift", "3 Sets", "10-12 reps"],
          ["Good Mornings", "3 Sets", "10-12 reps"],
          ["Leg Extensions", "3 Sets", "12-15 reps"],
          ["Incline Dumbbell Curl", "3 Sets", "12 reps"],
          ["Incline Skull Crusher", "3 Sets", "12 reps"],
        ])}
        <br />
        <p>Workout Plan from: <a href="https://www.muscleandstrength.com/" target="_blank" rel="noopener noreferrer">www.muscleandstrength.com</a></p>
        <p><em>*AMRAP = As many reps as possible</em></p>
        <p><em>Note : Workouts may have been changed slightly.</em></p>
      </div>

      <div className='d-flex justify-content-center mt-4 mb-4'>
        <DownloadPDFButton targetId="workout-container" fileName="5DayFemaleBeginner.pdf" />
      </div>

    </div>
  );
};

export default FiveDaysWeek2;
