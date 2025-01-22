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

const FourDaysWeek1 = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const startWorkout = async () => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/login', { state: { from: '/four-days-week-1' } });
      return;
    }

    const planName = "4 Days a Week (Upper/Lower Split)";
    const workoutDetails = {
      planName,
      userId: user.uid,
      createdAt: new Date().toISOString(),
      dayLabels: {
        "Day 1": "Upper Strength",
        "Day 2": "Lower Strength",
        "Day 3": "Rest Day",
        "Day 4": "Upper Hypertrophy",
        "Day 5": "Lower Hypertrophy",
        "Day 6": "Rest Day",
        "Day 7": "Rest Day",
      },
      workoutPlan: {
        "Day 1": [
          { name: "Bench Press", sets: "4", reps: "6", weight: "" },
          { name: "Dumbbell Row", sets: "4", reps: "6", weight: "" },
          { name: "Shoulder Press", sets: "4", reps: "6", weight: "" },
          { name: "Lat Pull Down", sets: "4", reps: "6", weight: "" },
          { name: "Hyperextensions", sets: "3", reps: "12-15", weight: "" },
        ],
        "Day 2": [
          { name: "Smith Squat", sets: "4", reps: "6", weight: "" },
          { name: "Deadlift", sets: "4", reps: "6", weight: "" },
          { name: "Lunges", sets: "4", reps: "6", weight: "" },
          { name: "Hip Thrust", sets: "4", reps: "6", weight: "" },
        ],
        "Day 4": [
          { name: "Incline Dumbbell Bench Press", sets: "3", reps: "12", weight: "" },
          { name: "Seated Cable Row", sets: "3", reps: "12", weight: "" },
          { name: "Shoulder Press", sets: "3", reps: "12", weight: "" },
          { name: "Lat Pull Down", sets: "3", reps: "12", weight: "" },
          { name: "Biceps Curl", sets: "2", reps: "12", weight: "" },
          { name: "Triceps Extensions", sets: "2", reps: "12", weight: "" },
        ],
        "Day 5": [
          { name: "Goblet Squat", sets: "3", reps: "12", weight: "" },
          { name: "Deadlift", sets: "3", reps: "12", weight: "" },
          { name: "Bulgarian Split Squat (Each Leg)", sets: "3", reps: "12", weight: "" },
          { name: "Hip Thrust or Hip Abductor Machine", sets: "3", reps: "12", weight: "" },
        ],
        "Day 3": [],
        "Day 6": [],
        "Day 7": [],
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
          <strong>4 Days a Week (Upper/Lower Split)</strong><br />
          Monday: Upper Strength<br />
          Tuesday: Lower Strength<br />
          Thursday: Upper Hypertrophy<br />
          Friday: Lower Hypertrophy<br />
          Saturday: Rest Day<br />
          Sunday: Rest Day<br />
        </p>

        {renderWorkoutSection("Monday (Upper Strength)", [
          ["Bench Press", "4 Sets", "6 reps"],
          ["Dumbbell Row", "4 Sets", "6 reps"],
          ["Shoulder Press", "4 Sets", "6 reps"],
          ["Lat Pull Down", "4 Sets", "6 reps"],
          ["Hyperextensions", "3 Sets", "12-15 reps"],
        ])}

        {renderWorkoutSection("Tuesday (Lower Strength)", [
          ["Smith Squat", "4 Sets", "6 reps"],
          ["Deadlift", "4 Sets", "6 reps"],
          ["Lunges", "4 Sets", "6 reps"],
          ["Hip Thrust", "4 Sets", "6 reps"],
        ])}

        {renderWorkoutSection("Thursday (Upper Hypertrophy)", [
          ["Incline Dumbbell Bench Press", "3 Sets", "12 reps"],
          ["Seated Cable Row", "3 Sets", "12 reps"],
          ["Shoulder Press", "3 Sets", "12 reps"],
          ["Lat Pull Down", "3 Sets", "12 reps"],
          ["Biceps Curl", "2 Sets", "12 reps"],
          ["Triceps Extensions", "2 Sets", "12 reps"],
        ])}

        {renderWorkoutSection("Friday (Lower Hypertrophy)", [
          ["Goblet Squat", "3 Sets", "12 reps"],
          ["Deadlift", "3 Sets", "12 reps"],
          ["Bulgarian Split Squat (Each Leg)", "3 Sets", "12 reps"],
          ["Hip Thrust or Hip Abductor Machine", "3 Sets", "12 reps"],
        ])}
        <p><em>Note: Workouts may have been changed slightly.</em></p>
      </div>

      <div className='row mt-3 mb-3'>
        <div className='col d-flex justify-content-center'>
          <DownloadPDFButton targetId="workout-container" fileName="3DayUpperLowerSplit.pdf" />
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

export default FourDaysWeek1;
