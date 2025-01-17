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

const PPLWorkout1 = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const startWorkout = async () => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/login', { state: { from: '/ppl-workout1' } });
      return;
    }

    const planName = "3 Day PPL Schedule";
    const workoutDetails = {
      planName,
      userId: user.uid,
      createdAt: new Date().toISOString(),
      dayLabels: {
        Monday: "Push",
        Tuesday: "Rest Day",
        Wednesday: "Pull",
        Thursday: "Rest Day",
        Friday: "Legs",
        Saturday: "Rest Day",
        Sunday: "Rest Day",
      },
      workoutPlan: {
        Monday: [
          { name: "Bench Press", sets: "3", reps: "6-8", weight: "" },
          { name: "Seated Shoulder Press", sets: "3", reps: "8-12", weight: "" },
          { name: "Incline Dumbbell Press", sets: "3", reps: "8-12", weight: "" },
          { name: "Lateral Raises", sets: "3", reps: "8-12", weight: "" },
          { name: "Triceps Dumbbell Extension", sets: "3", reps: "8-12", weight: "" },
          { name: "Triceps Rope Pressdown", sets: "3", reps: "8-12", weight: "" },
        ],
        Wednesday: [
          { name: "Lat Pulldown", sets: "3", reps: "8-12", weight: "" },
          { name: "Bent Over Row", sets: "3", reps: "8-12", weight: "" },
          { name: "Face Pulls", sets: "3", reps: "8-12", weight: "" },
          { name: "Dumbbell Shrugs", sets: "3", reps: "8-12", weight: "" },
          { name: "Bicep Barbell Curls", sets: "3", reps: "8-12", weight: "" },
          { name: "Hammer Curls", sets: "3", reps: "8-12", weight: "" },
        ],
        Friday: [
          { name: "Squat Barbell", sets: "3", reps: "8-12", weight: "" },
          { name: "Leg Press", sets: "3", reps: "8-12", weight: "" },
          { name: "Leg Extension", sets: "3", reps: "8-12", weight: "" },
          { name: "Seated Leg Curl", sets: "3", reps: "8-12", weight: "" },
          { name: "Standing Calf Raises", sets: "3", reps: "8-12", weight: "" },
        ],
        Tuesday: [],
        Thursday: [],
        Saturday: [],
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

      {/* 3-Day PPL Schedule */}
      <div className="container" id="workout-container">
        <p className="schedule">
          <strong>3 Day PPL Schedule</strong><br />
          Monday: Push<br />
          Tuesday: Rest day<br />
          Wednesday: Pull<br />
          Thursday: Rest day<br />
          Friday: Legs<br />
          Saturday: Rest day<br />
          Sunday: Rest day
        </p>

        {renderWorkoutSection("Push", [
          ["Bench Press", "3 Sets", "6-8 reps"],
          ["Seated Shoulder Press", "3 Sets", "8-12 reps"],
          ["Incline Dumbbell Press", "3 Sets", "8-12 reps"],
          ["Lateral Raises", "3 Sets", "8-12 reps"],
          ["Triceps Dumbbell Extension", "3 Sets", "8-12 reps"],
          ["Triceps Rope Pressdown", "3 Sets", "8-12 reps"],
        ])}

        {renderWorkoutSection("Pull", [
          ["Lat Pulldown", "3 Sets", "8-12 reps"],
          ["Bent Over Row", "3 Sets", "8-12 reps"],
          ["Face Pulls", "3 Sets", "8-12 reps"],
          ["Dumbbell Shrugs", "3 Sets", "8-12 reps"],
          ["Bicep Barbell Curls", "3 Sets", "8-12 reps"],
          ["Hammer Curls", "3 Sets", "8-12 reps"],
        ])}

        {renderWorkoutSection("Legs", [
          ["Squat Barbell", "3 Sets", "8-12 reps"],
          ["Leg Press", "3 Sets", "8-12 reps"],
          ["Leg Extension", "3 Sets", "8-12 reps"],
          ["Seated Leg Curl", "3 Sets", "8-12 reps"],
          ["Standing Calf Raises", "3 Sets", "8-12 reps"],
        ])}

        <p>
          Workout Plan from : <a href="https://www.hevyapp.com/">www.hevyapp.com</a>
        </p>
        <p><em>Note : Workouts may have been changed slightly.</em></p>
      </div>
      
      <div className='row mt-3 mb-3'>
        <div className='col d-flex justify-content-center'>
          <DownloadPDFButton targetId="workout-container" fileName="3DayPPL.pdf" />
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

export default PPLWorkout1;
