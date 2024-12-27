import React from 'react';
import '../css/SeePlans.css';
import Dropdown from '../plans/Dropdown';
import renderWorkoutSection from '../plans/RenderWorkout';
import DownloadPDFButton from '../plans/DownloadPDF';

const FourDaysWeek2 = () => {
  return (
    <div>
      <div className="container">
        <Dropdown />
      </div>

      <div className="container" id="workout-container">
          <p className="schedule">
          <strong>4 Days Week (Intermediate and Advanced)</strong><br />
          Monday: Back & Biceps<br />
          Tuesday: Chest & Triceps<br />
          Wednesday: Rest Day<br />
          Thursday: Quads, Hamstrings & Calves<br />
          Friday: Shoulder, Traps & Forearms<br />
          Saturday: Rest day<br />
          Sunday: Rest day
        </p>

        {renderWorkoutSection("Back & Biceps", [
          ["Deadlift", "2 Sets", "5 reps"],
          ["One Arm Dumbbell Row", "3 Sets", "8-12 reps"],
          ["Wide Grip Pull Up or Lat Pull Down", "3 Sets", "10-12 reps"],
          ["Barbell Row", "3 Sets", "8-12 reps"],
          ["Seated Cable Row or Machine Row", "5 Minutes", "Burn"],
        ])}

        {renderWorkoutSection("Chest & Triceps", [
          ["Bench Press", "3 Sets", "6-10 reps"],
          ["Incline Dumbbell Bench Press", "3 Sets", "8-12 reps"],
          ["Chest Dip", "3 Sets", "*AMRAP"],
          ["Cable Crossover or Pec Dec", "3 Sets", "12-15 reps"],
          ["Machine Press or Dumbbell Bench Press", "5 Minutes", "Burn"],
          ["EZ Bar Skullcrusher", "3 Sets", "8-12 reps"],
          ["Two Arm Seated Dumbbell Extension", "3 Sets", "8-12 reps"],
          ["Cable Tricep Extension", "5 Minutes", "Burn"],
        ])}

        {renderWorkoutSection("Quads Hamstrings & Calves", [
          ["Squat", "3 Sets", "6-10 reps"],
          ["Leg Press", "3 Sets", "15-20 reps"],
          ["Hack Squat or Dumbbell Lunge", "3 Sets", "8-12 reps"],
          ["Leg Extension", "5 Minutes", "Burn"],
          ["Stiff Leg Deadlift", "3 Sets", "8-12 reps"],
          ["Leg Curl", "5 Minutes", "Burn"],
          ["Standing Calf Raises", "3 Sets", "10-15 reps"],
          ["Seated Calf Raises", "5 Minutes", "Burn"],
        ])}

        {renderWorkoutSection("Shoulder Traps & Forearms", [
          ["Seated Barbell Press", "3 Sets", "6-10 reps"],
          ["Seated Arnold Press", "3 Sets", "8-12 reps"],
          ["Dumbbell Lateral Raise", "3 Sets", "10-15 reps"],
          ["Hammer Strength Press or Smith Press", "5 Minutes", "Burn"],
          ["Upright Row", "3 Sets", "8-12 reps"],
          ["Barbell Shrug or Dumbbell Shrug", "5 Minutes", "Burn"],
          ["Seated Barbell Wrist Curl", "3 Sets", "12-15 reps"],
          ["Barbell Static Hold", "5 Minutes", "Burn"],
        ])}

        <br />
        <p>Workout Plan from: <a href="https://www.muscleandstrength.com/" target="_blank" rel="noopener noreferrer">www.muscleandstrength.com</a></p>
        <p><em>*AMRAP = As many reps as possible</em></p>
        <p><em>Note : Workouts may have been changed slightly.</em></p>
      </div>

      <div className='d-flex justify-content-center mt-4 mb-4'>
        <DownloadPDFButton targetId="workout-container" fileName="4DayInter-Ad.pdf" />
      </div>

    </div>
  );
};

export default FourDaysWeek2;
