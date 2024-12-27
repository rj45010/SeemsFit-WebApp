import React from 'react';
import '../css/Plans.css';
import Dropdown from './Dropdown';
import DownloadPDFButton from './DownloadPDF';

const FatToFit = () => {
  return (
    <div id="workout-container">
      <div className="container">
        <Dropdown />
      </div>

      <div className="container">
        <p className="schedule">
          <strong>Fat to Fit (3 Months)</strong><br />
          Monday: Legs & Intervals<br />
          Tuesday: Shoulder & Abs<br />
          Wednesday: Rest Day<br />
          Thursday: Chest & Triceps<br />
          Friday: Back & Biceps<br />
          Saturday: Rest day<br />
          Sunday: Rest day
        </p>

        {renderWorkoutSection1("Legs & Abs", [
          ["Elliptical Training", "0", "-", "10:00", "00:15"],
          ["Bodyweight Lunge", "3 sets", "6 reps", "00:00", "00:15"],
          ["Bodyweight Rear Lunge", "3 sets", "6 reps", "00:00", "01:00"],
          ["Jump Squat", "3 sets", "8 reps", "00:00", "01:00"],
          ["Bodyweight Calf Raise", "3 sets", "15 reps", "00:00", "01:00"],
          ["Prisoner Squat", "3 sets", "12 reps", "00:00", "01:00"],
          ["Crunch", "3 sets", "15 reps", "00:00", "01:00"],
          ["Cable Wood Chop", "3 sets", "15 reps", "00:00", "01:00"],
          ["Hanging Leg Raise", "2 sets", "15 reps", "00:00", "01:00"],
          ["Elliptical Training", "0", "-", "10:00", "00:25"],
        ])}

        {renderWorkoutSection1("Cardio & Chest", [
          ["Treadmill Running", "0", "-", "10:00", "00:15"],
          ["Dumbbell Bench Press", "3 sets", "12 reps", "00:00", "01:00"],
          ["Dumbbell Incline Bench Press", "3 sets", "12 reps", "00:00", "01:00"],
          ["Dumbbell Fly", "3 sets", "12 reps", "00:00", "01:00"],
          ["Dumbbell Incline Fly", "3 sets", "12 reps", "00:00", "01:00"],
          ["Treadmill Running", "0", "-", "07:00", "01:00"],
          ["Walking", "0", "-", "07:00", "01:00"],
        ])}

        {renderWorkoutSection1("Arms & Abs", [
          ["Treadmill Running", "0", "-", "12:00", "00:15"],
          ["Dumbbell Squat", "3 sets", "12 reps", "00:00", "01:00"],
          ["Dumbbell Shoulder Press", "3 sets", "12 reps", "00:00", "01:00"],
          ["Dumbbell Seated Shoulder Press", "3 sets", "12 reps", "00:00", "01:00"],
          ["Barbell Curl", "3 sets", "12 reps", "00:00", "01:00"],
          ["Dumbbell Tricep Extension", "3 sets", "12 reps", "00:00", "01:00"],
          ["Dumbbell Lateral Raise", "3 sets", "12 reps", "00:00", "01:00"],
          ["EZ Bar Preacher Curl (Close Grip)", "3 sets", "12 reps", "00:00", "01:00"],
          ["Dip", "3 sets", "12 reps", "00:00", "01:00"],
          ["Oblique Crunch", "3 sets", "20 reps", "00:00", "01:00"],
          ["Reverse Crunch", "3 sets", "20 reps", "00:00", "01:00"],
          ["Plank", "3 sets", "-", "00:00", "01:00"],
          ["Treadmill Running", "0", "-", "00:00", "-"],
        ])}

        {renderWorkoutSection1("Cardio & Back", [
          ["Rowing", "0", "-", "06:00", "00:15"],
          ["Cable Lat Pulldown (Wide Grip)", "3 sets", "12 reps", "00:00", "01:00"],
          ["Cable Seated Row", "3 sets", "12 reps", "00:00", "01:00"],
          ["Back Hyperextension", "3 sets", "12 reps", "00:00", "01:00"],
          ["Pull-Up", "3 sets", "12 reps", "00:00", "01:00"],
          ["Hanging Leg Raise", "2 sets", "18 reps", "00:00", "01:00"],
          ["Crunch", "2 sets", "18 reps", "00:00", "01:00"],
          ["Cable Wood Chop", "2 sets", "18 reps", "00:00", "01:00"],
          ["Rowing", "0", "-", "06:00", "00:25"],
        ])}

        {renderWorkoutSection1("Legs & Abs", [
          ["Elliptical Training", "0", "-", "12:00", "00:15"],
          ["Bodyweight Rear Lunge", "2 sets", "10 reps", "00:00", "01:00"],
          ["Jump Squat", "3 sets", "5 reps", "00:00", "01:00"],
          ["Bodyweight Calf Raise", "2 sets", "15 reps", "00:00", "01:00"],
          ["Prisoner Squat", "2 sets", "12 reps", "00:00", "01:00"],
          ["Bench Weighted Decline Crunch", "2 sets", "15 reps", "00:00", "01:00"],
          ["Crunch", "2 sets", "15 reps", "00:00", "01:00"],
          ["Cable Wood Chop", "2 sets", "15 reps", "00:00", "01:00"],
          ["Elliptical Training", "0", "-", "06:00", "00:25"],
        ])}

        {renderWorkoutSection1("Chest & Abs", [
          ["Treadmill Running", "0", "-", "08:00", "00:15"],
          ["Dumbbell Bench Press", "3 sets", "12 reps", "00:00", "01:00"],
          ["Dumbbell Incline Bench Press", "3 sets", "12 reps", "00:00", "01:00"],
          ["Dumbbell Fly", "3 sets", "12 reps", "00:00", "01:00"],
          ["Dumbbell Incline Fly", "3 sets", "12 reps", "00:00", "01:00"],
          ["Push-Up", "3 sets", "12 reps", "00:00", "01:00"],
          ["Stability Ball Crunch", "3 sets", "12 reps", "00:00", "01:00"],
          ["Decline Bench Leg Raise", "3 sets", "12 reps", "00:00", "01:00"],
          ["Decline Bench Weighted Twist", "3 sets", "12 reps", "00:00", "01:00"],
          ["Treadmill Running", "0", "-", "00:00", "01:00"],
          ["Walking", "0", "-", "08:00", "01:00"],
          ["Assisted Hyperextension", "2 sets", "10 reps", "00:00", "01:00"],
        ])}

        {renderWorkoutSection1("Full Body", [
          ["Treadmill Running", "0", "-", "08:00", "00:15"],
          ["Dumbbell Squat", "3 sets", "12 reps", "00:00", "01:00"],
          ["Dumbbell Shoulder Press", "3 sets", "12 reps", "00:00", "01:00"],
          ["Dumbbell Seated Shoulder Press", "3 sets", "12 reps", "00:00", "01:00"],
          ["Barbell Curl", "3 sets", "12 reps", "00:00", "01:00"],
          ["Dumbbell Tricep Extension", "3 sets", "12 reps", "00:00", "01:00"],
          ["Dumbbell Lateral Raise", "3 sets", "12 reps", "00:00", "01:00"],
          ["EZ Bar Preacher Curl (Close Grip)", "3 sets", "12 reps", "00:00", "01:00"],
          ["Dip", "3 sets", "12 reps", "00:00", "01:00"],
          ["Oblique Crunch", "2 sets", "20 reps", "00:00", "01:00"],
          ["Reverse Crunch", "2 sets", "20 reps", "00:00", "01:00"],
          ["Treadmill Running", "0", "-", "06:00", "00:25"],
        ])}

        <br />
        <p>Workout Plan from: <a href="https://www.jefit.com/" target="_blank" rel="noopener noreferrer">www.jefit.com</a></p>
        <p><em>*AMRAP = As many reps as possible</em></p>
        <p><em>Note : Workouts may have been changed slightly.</em></p>
      </div>
      
      <div className='d-flex justify-content-center mt-4 mb-4'>
        <DownloadPDFButton targetId="workout-container" fileName="ThreeDaysWeekWorkout.pdf" />
      </div>

    </div>
  );
};

const renderWorkoutSection1 = (title, exercises) => {
  return (
    <div>
      <h3 className='bg-white text-black text-center p-1 heading'>{title}</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Duration</th>
            <th>Rest</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise, index) => (
            <tr key={index}>
              {exercise.map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FatToFit;
