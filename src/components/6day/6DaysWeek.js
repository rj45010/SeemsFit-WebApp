import React from 'react';
import '../css/SeePlans.css';
import Dropdown from '../plans/Dropdown';
import renderWorkoutSection from '../plans/RenderWorkout';
import DownloadPDFButton from '../plans/DownloadPDF';

const SixDaysWeek = () => {
  return (
    <div>
      <div className="container">
        <Dropdown />
      </div>

      <div className="container" id="workout-container">
        <p className="schedule">
          <strong>6 Days Week Schedule</strong><br />
          Monday: Back<br />
          Tuesday: Chest &amp; Abs<br />
          Wednesday: Quads<br />
          Thursday: Shoulders<br />
          Friday: Hamstrings<br />
          Saturday: Arms<br />
          Sunday: Rest day
        </p>

        {renderWorkoutSection("Back", [
          ["Pull-Up or Lat Pulldown", "4 Sets", "10 reps"],
          ["Barbell Row", "4 Sets", "10 reps"],
          ["Seated Row", "4 Sets", "10 reps"],
          ["Dumbbell Shrug", "4 Sets", "10 reps"],
          ["Back Extension", "4 Sets", "10 reps"],
        ])}

        {renderWorkoutSection("Chest & Abs", [
          ["Bench Press", "4 Sets", "10 reps"],
          ["Incline Dumbbell Press", "4 Sets", "10 reps"],
          ["Standing Cable Chest Fly", "4 Sets", "10 reps"],
          ["Push-Up", "4 Sets", "Failure"],
          ["Kneeling Ab Wheel Roll-Out", "4 Sets", "10 reps"],
          ["Hanging Knee Raise", "4 Sets", "15-20 reps"],
          ["Crunch", "4 Sets", "15-20 reps"],
        ])}

        {renderWorkoutSection("Quads", [
          ["Squat", "4 Sets", "10 reps"],
          ["Hack Squat Machine", "4 Sets", "10 reps"],
          ["Barbell Lunge", "4 Sets", "10 reps"],
          ["Leg Extension", "4 Sets", "10 reps"],
        ])}

        {renderWorkoutSection("Shoulders", [
          ["Overhead Press", "4 Sets", "10 reps"],
          ["Dumbbell Lateral Raise", "4 Sets", "10 reps"],
          ["Seated Dumbbell Shoulder Press", "4 Sets", "10 reps"],
          ["Reverse Dumbbell Flyes", "4 Sets", "10 reps"],
        ])}

        {renderWorkoutSection("Hamstrings", [
          ["Lying Leg Curl", "4 Sets", "10 reps"],
          ["Seated Leg Curl", "4 Sets", "10 reps"],
          ["Romanian Deadlift", "4 Sets", "10 reps"],
          ["Standing Calf Raise", "4 Sets", "10 reps"],
          ["Seated Calf Raise", "4 Sets", "10 reps"],
        ])}

        {renderWorkoutSection("Arms", [
          ["Barbell Curl", "4 Sets", "10 reps"],
          ["Preacher Curl", "4 Sets", "10 reps"],
          ["Cable Curl", "4 Sets", "10 reps"],
          ["Barbell Lying Triceps Extension", "4 Sets", "10 reps"],
          ["Dumbbell Triceps Extension", "4 Sets", "10 reps"],
          ["Tricep Pushdown", "4 Sets", "10 reps"],
        ])}

        <br />
        <p>Workout Plan from : <a href="https://www.strengthlog.com/">www.strengthlog.com</a></p>
        <br />
        <p><em>Note : Workouts may have been changed slightly.</em></p>
      </div>

      <div className='d-flex justify-content-center mt-4 mb-4'>
        <DownloadPDFButton targetId="workout-container" fileName="6DayWeek.pdf" />
      </div>

    </div>
  );
};

export default SixDaysWeek;
