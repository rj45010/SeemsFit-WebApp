import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/SeePlans.css';
import Dropdown from '../plans/Dropdown';
import renderWorkoutSection from '../plans/RenderWorkout';
import DownloadPDFButton from '../plans/DownloadPDF';
import { db, auth } from '../firebase';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useTheme } from '../ThemeProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FiveDaysWeek = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const startWorkout = async () => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/login', { state: { from: '/five-days-week' } });
      return;
    }

    const planName = "5 Days Week (Beginner)";
    const workoutDetails = {
      planName,
      userId: user.uid,
      createdAt: new Date().toISOString(),
      dayLabels: {
        "Day 1": "Chest & Triceps",
        "Day 2": "Back & Biceps",
        "Day 3": "Rest Day",
        "Day 4": "Shoulder & Triceps",
        "Day 5": "Legs & Biceps",
        "Day 6": "Rest day",
        "Day 7": "Cardio & Core",
      },
      workoutPlan: {
        "Day 1": [
          { name: "Chest Press", sets: "4", reps: "8", weight: "" },
          { name: "Triceps Pushdown", sets: "4", reps: "10", weight: "" },
          { name: "Chest Fly", sets: "4", reps: "12", weight: "" },
          { name: "Skull Crusher", sets: "4", reps: "12", weight: "" },
          { name: "Pushups", sets: "4", reps: "Till Failure", weight: "" },
        ],
        "Day 2": [
          { name: "Standing Rows", sets: "4", reps: "10", weight: "" },
          { name: "Lat Pulldown", sets: "4", reps: "10", weight: "" },
          { name: "Standing Pullover", sets: "4", reps: "10", weight: "" },
          { name: "Lateral Raises", sets: "4", reps: "10", weight: "" },
          { name: "Bicep Curl", sets: "4", reps: "12", weight: "" },
        ],
        "Day 3": [],
        "Day 4": [
          { name: "Shoulder press", sets: "4", reps: "10", weight: "" },
          { name: "Dips", sets: "4", reps: "10", weight: "" },
          { name: "Standing Tricep Kickback", sets: "4", reps: "10", weight: "" },
          { name: "Underhand flys", sets: "4", reps: "12", weight: "" },
          { name: "Reverse flys", sets: "4", reps: "12", weight: "" },
          { name: "Overhead Tricep Extension", sets: "4", reps: "12", weight: "" },
        ],
        "Day 5": [
          { name: "Lunges", sets: "4", reps: "10", weight: "" },
          { name: "Seated Calf Raise", sets: "4", reps: "12", weight: "" },
          { name: "Lying alternating leg curls", sets: "4", reps: "12", weight: "" },
          { name: "Biceps curls", sets: "4", reps: "12", weight: "" },
          { name: "Squats", sets: "4", reps: "12", weight: "" },
        ],
        "Day 6": [],
        "Day 7": [
          { name: "Running/Biking/Jumping Rope/Aerobics", sets: "-", reps: "30 Min", weight: "" },
          { name: "Crunches", sets: "4", reps: "12", weight: "" },
          { name: "Mountain climbers", sets: "4", reps: "12", weight: "" },
          { name: "Side Knee Drops", sets: "4", reps: "12", weight: "" },
          { name: "Bicycle crunches", sets: "4", reps: "12", weight: "" },
          { name: "Glute bridges", sets: "4", reps: "12", weight: "" },
        ],
      },
    };    

    try {
      const plansCollection = collection(db, "plans");
      const q = query(plansCollection, where("planName", "==", planName), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.info("Plan already exists!");
        return;
      }

      await addDoc(plansCollection, workoutDetails);
      toast.success("Workout plan saved successfully!");
      setTimeout(() => navigate('/my-plan'), 1000);
    } catch (error) {
      console.error("Error saving workout:", error);
      toast.error("Failed to save workout. Please try again.");
    }
  };

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
        <p><em>Note: Workouts may have been changed slightly.</em></p>
      </div>

      <div className='row mt-3 mb-3'>
        <div className='col d-flex justify-content-center'>
          <DownloadPDFButton targetId="workout-container" fileName="5DayBeginner.pdf" />
        </div>
        <div className='col d-flex justify-content-center'>
          <button className={`btn ${theme === "dark" ? "btn-outline-light" : "btn-outline-dark"}`} 
            onClick={startWorkout}>
            Start Workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiveDaysWeek;
