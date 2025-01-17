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

const PPLWorkout = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const startWorkout = async () => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/login', { state: { from: '/ppl-workout' } });
      return;
    }

    const planName = "6 Day PPL Schedule (Saket Gokhale)";
    const workoutDetails = {
      planName,
      userId: user.uid,
      createdAt: new Date().toISOString(),
      dayLabels: {
        Monday: "Push",
        Tuesday: "Legs",
        Wednesday: "Pull",
        Thursday: "Push",
        Friday: "Legs",
        Saturday: "Pull",
        Sunday: "Rest day",
      },
      workoutPlan: {
        Monday: [
          { name: "Incline Bench Press", sets: "4", reps: "8", weight: "" },
          { name: "Seated Chest Press", sets: "4", reps: "8", weight: "" },
          { name: "Overhead Tricep Extension", sets: "3", reps: "10-15", weight: "" },
          { name: "Lateral Raises", sets: "5", reps: "15-20", weight: "" },
          { name: "Tricep Pushdown", sets: "3", reps: "10-15", weight: "" },
        ],
        Tuesday: [
          { name: "Leg Curls", sets: "5", reps: "10-15", weight: "" },
          { name: "Hack Squat or Leg Press", sets: "5", reps: "10-15", weight: "" },
          { name: "Calf Raises", sets: "5", reps: "10-20", weight: "" },
          { name: "Seated Dumbbell Overhead Press", sets: "2-3", reps: "8-12", weight: "" },
        ],
        Wednesday: [
          { name: "Lat Pull Down", sets: "3", reps: "8-12", weight: "" },
          { name: "Seated Row", sets: "3-4", reps: "8-12", weight: "" },
          { name: "Lat Pull Over", sets: "2-3", reps: "8-12", weight: "" },
          { name: "Reverse Pec Deck Fly", sets: "3", reps: "12-15", weight: "" },
          { name: "Bicep Curl", sets: "3-4", reps: "10-15", weight: "" },
        ],
        Thursday: [
          { name: "Incline Bench Press", sets: "4", reps: "8", weight: "" },
          { name: "Seated Chest Press", sets: "4", reps: "8", weight: "" },
          { name: "Overhead Tricep Extension", sets: "3", reps: "10-15", weight: "" },
          { name: "Lateral Raises", sets: "5", reps: "15-20", weight: "" },
          { name: "Tricep Pushdown", sets: "3", reps: "10-15", weight: "" },
        ],
        Friday: [
          { name: "Leg Curls", sets: "5", reps: "10-15", weight: "" },
          { name: "Hack Squat or Leg Press", sets: "5", reps: "10-15", weight: "" },
          { name: "Calf Raises", sets: "5", reps: "10-20", weight: "" },
          { name: "Seated Dumbbell Overhead Press", sets: "2-3", reps: "8-12", weight: "" },
        ],
        Saturday: [
          { name: "Lat Pull Down", sets: "3", reps: "8-12", weight: "" },
          { name: "Seated Row", sets: "3-4", reps: "8-12", weight: "" },
          { name: "Lat Pull Over", sets: "2-3", reps: "8-12", weight: "" },
          { name: "Reverse Pec Deck Fly", sets: "3", reps: "12-15", weight: "" },
          { name: "Bicep Curl", sets: "3-4", reps: "10-15", weight: "" },
        ],
        Sunday: [],
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
          <strong>6 Day PPL Schedule (Saket Gokhale)</strong><br />
          Monday: Push<br />
          Tuesday: Legs<br />
          Wednesday: Pull<br />
          Thursday: Push<br />
          Friday: Legs<br />
          Saturday: Pull<br />
          Sunday: Rest day
        </p>

        {renderWorkoutSection("Push", [
          ["Incline Bench Press", "4 Sets", "8 reps"],
          ["Seated Chest Press", "4 Sets", "8 reps"],
          ["Overhead Tricep Extension", "3 Sets", "10-15 reps"],
          ["Lateral Raises", "5 Sets", "15-20 reps"],
          ["Tricep Pushdown", "3 Sets", "10-15 reps"],
        ])}

        {renderWorkoutSection("Legs", [
          ["Leg Curls", "5 Sets", "10-15 reps"],
          ["Hack Squat or Leg Press", "5 Sets", "10-15 reps"],
          ["Calf Raises", "5 Sets", "10-20 reps"],
          ["Seated Dumbbell Overhead Press", "2-3 Sets", "8-12 reps"],
        ])}

        {renderWorkoutSection("Pull", [
          ["Lat Pull Down", "3 Sets", "8-12 reps"],
          ["Seated Row", "3-4 Sets", "8-12 reps"],
          ["Lat Pull Over", "2-3 Sets", "8-12 reps"],
          ["Reverse Pec Deck Fly", "3 Sets", "12-15 reps"],
          ["Bicep Curl", "3-4 Sets", "10-15 reps"],
        ])}

        <p>
          Workout Plan from : 
          <a href="https://www.youtube.com/channel/UCfgrg0SXgNkZ7rTbnZCp6tg">
            Saket Gokhale
          </a>
        </p>
        <p><em>Note : Workouts may have been changed slightly.</em></p>
      </div>

      <div className='d-flex justify-content-center mt-4 mb-4'>
        <DownloadPDFButton targetId="workout-container" fileName="6DayPPL(Saket).pdf" />
      </div>

      <div className='d-flex justify-content-center mt-4 mb-4'>
        <button className={`btn ${theme === "dark" ? "btn-outline-light" : "btn-outline-dark"}`} 
          onClick={startWorkout}>
          Start Workout
        </button>
      </div>
    </div>
  );
};

export default PPLWorkout;
