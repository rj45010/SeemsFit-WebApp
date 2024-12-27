import React from 'react';
import '../css/SeePlans.css';
import Dropdown from '../plans/Dropdown';
import renderWorkoutSection from '../plans/RenderWorkout';
import DownloadPDFButton from '../plans/DownloadPDF';

const FourDaysWeek = () => {
  return (
    <div>
      <div className="container">
        <Dropdown />
      </div>

      <div className="container" id="workout-container">
        <p className="schedule">
          <strong>4 Days Week (Beginner)</strong><br />
          Monday: Legs & Intervals<br />
          Tuesday: Shoulder & Abs<br />
          Wednesday: Rest Day<br />
          Thursday: Chest & Triceps<br />
          Friday: Back & Biceps<br />
          Saturday: Rest day<br />
          Sunday: Rest day
        </p>

        {renderWorkoutSection("Legs & Intervals", [
          ["Dumbbell Squat", "3 Sets", "10 reps"],
          ["Dumbbell Lunge", "3 Sets", "5 reps each leg"],
          ["Plie Squat", "3 Sets", "10 reps"],
          ["Dumbbell Step-Up", "3 Sets", "10 reps"],
          ["Burpee", "1 Set", "50 reps"],
        ])}

        {renderWorkoutSection("Shoulder & Abs", [
          ["Dumbbell Overhead Press", "3 Sets", "10 reps"],
          ["Dumbbell Lateral Raise", "3 Sets", "12-15 reps"],
          ["Dumbbell Front Raise", "3 Sets", "12-15 reps"],
          ["Rear-Delt Flye", "3 Sets", "12-15 reps"],
          ["Shrug", "3 Sets", "10 reps"],
          ["Face Pull", "3 Sets", "10 reps"],
          ["Kneeling Cable Crunch", "3 Sets", "10 reps"],
          ["Horizontal Cable Woodchop", "3 Sets", "10 reps each side"],
          ["Plank", "3 Sets", "Failure"],
        ])}

        {renderWorkoutSection("Chest & Triceps", [
          ["Dumbbell Incline Press", "2 Sets", "10 reps"],
          ["Dumbbell Flat Press", "3 Sets", "10 reps"],
          ["Dumbbell Flye", "3 Sets", "10 reps"],
          ["Pushup", "1 Set", "*AMRAP"],
          ["Close-Grip Bench Press", "3 Sets", "10 reps"],
          ["Lying Dumbbell Skull Crusher", "3 Sets", "10 reps"],
          ["Triceps Pushdown", "3 Sets", "10 reps"],
        ])}

        {renderWorkoutSection("Back & Biceps", [
          ["Trap-Bar Deadlift", "5 Sets", "10 reps"],
          ["One-Arm, Elbow-In Dumbbell Row", "3 Sets", "10 reps"],
          ["Pullup", "3 Sets", "*AMRAP"],
          ["Barbell Curl", "3 Sets", "10 reps"],
          ["Cable Curl", "3 Sets", "10 reps"],
          ["Concentration Curl", "3 Sets", "10 reps"],
        ])}

        <br />
        <p>Workout Plan from: <a href="https://www.muscleandfitness.com/" target="_blank" rel="noopener noreferrer">www.muscleandfitness.com</a></p>
        <p><em>*AMRAP = As many reps as possible</em></p>
        <p><em>Note : Workouts may have been changed slightly.</em></p>
      </div>

      <div className='d-flex justify-content-center mt-4 mb-4'>
        <DownloadPDFButton targetId="workout-container" fileName="4DayBeginner.pdf" />
      </div>

    </div>
  );
};

export default FourDaysWeek;
