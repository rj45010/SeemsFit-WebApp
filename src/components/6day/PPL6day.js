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

const PPLWorkout2 = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const startWorkout = async () => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/login', { state: { from: '/ppl-workout-2' } });
      return;
    }

    const planName = "6 Day PPL Schedule";
    const workoutDetails = {
      planName,
      userId: user.uid,
      createdAt: new Date().toISOString(),
      dayLabels: {
        Monday: "Push",
        Tuesday: "Pull",
        Wednesday: "Legs",
        Thursday: "Push",
        Friday: "Pull",
        Saturday: "Legs",
      },
      workoutPlan: {
        Monday: [
          { name: "Shoulder Press", sets: "4", reps: "12", weight: "" },
          { name: "Bench Press", sets: "4", reps: "8", weight: "" },
          { name: "Incline Bench Press", sets: "4", reps: "8", weight: "" },
          { name: "Triceps Pushdown", sets: "3", reps: "12", weight: "" },
        ],
        Tuesday: [
          { name: "Bent Over Row", sets: "3", reps: "10", weight: "" },
          { name: "Seated Row", sets: "3", reps: "10", weight: "" },
          { name: "Lat Pull Down", sets: "4", reps: "10", weight: "" },
          { name: "Biceps Curl", sets: "3", reps: "12", weight: "" },
        ],
        Wednesday: [
          { name: "Squats", sets: "3", reps: "8", weight: "" },
          { name: "Romanian Deadlift (RDL)", sets: "3", reps: "8", weight: "" },
          { name: "Hip Thrust", sets: "3", reps: "8", weight: "" },
          { name: "Calf Raise", sets: "3", reps: "12", weight: "" },
        ],
        Thursday: [
          { name: "Lateral Raise", sets: "3", reps: "15", weight: "" },
          { name: "Incline Press", sets: "3", reps: "12", weight: "" },
          { name: "Pec Fly", sets: "3", reps: "12", weight: "" },
          { name: "Triceps Pushdown", sets: "3", reps: "12", weight: "" },
        ],
        Friday: [
          { name: "Seated Row", sets: "3", reps: "12", weight: "" },
          { name: "One Arm Row", sets: "3", reps: "12", weight: "" },
          { name: "V-Bar Lat Pull Down", sets: "3", reps: "12", weight: "" },
          { name: "Biceps Curl", sets: "3", reps: "12", weight: "" },
        ],
        Saturday: [
          { name: "Leg Press", sets: "3", reps: "12", weight: "" },
          { name: "Goblet Squat", sets: "3", reps: "12", weight: "" },
          { name: "Stiff-Leg Deadlift (SLDL)", sets: "3", reps: "12", weight: "" },
          { name: "Calf Raise", sets: "3", reps: "12", weight: "" },
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
          <strong>6 Day PPL Schedule</strong><br />
          Monday: Push<br />
          Tuesday: Pull<br />
          Wednesday: Legs<br />
          Thursday: Push<br />
          Friday: Pull<br />
          Saturday: Legs<br />
        </p>

        {renderWorkoutSection("Monday (Push)", [
          ["Shoulder Press", "4 Sets", "12 reps"],
          ["Bench Press", "4 Sets", "8 reps"],
          ["Incline Bench Press", "4 Sets", "8 reps"],
          ["Triceps Pushdown", "3 Sets", "12 reps"],
        ])}

        {renderWorkoutSection("Tuesday (Pull)", [
          ["Bent Over Row", "3 Sets", "10 reps"],
          ["Seated Row", "3 Sets", "10 reps"],
          ["Lat Pull Down", "4 Sets", "10 reps"],
          ["Biceps Curl", "3 Sets", "12 reps"],
        ])}

        {renderWorkoutSection("Wednesday (Legs)", [
          ["Squats", "3 Sets", "8 reps"],
          ["Romanian Deadlift (RDL)", "3 Sets", "8 reps"],
          ["Hip Thrust", "3 Sets", "8 reps"],
          ["Calf Raise", "3 Sets", "12 reps"],
        ])}

        {renderWorkoutSection("Thursday (Push)", [
          ["Lateral Raise", "3 Sets", "15 reps"],
          ["Incline Press", "3 Sets", "12 reps"],
          ["Pec Fly", "3 Sets", "12 reps"],
          ["Triceps Pushdown", "3 Sets", "12 reps"],
        ])}

        {renderWorkoutSection("Friday (Pull)", [
          ["Seated Row", "3 Sets", "12 reps"],
          ["One Arm Row", "3 Sets", "12 reps"],
          ["V-Bar Lat Pull Down", "3 Sets", "12 reps"],
          ["Biceps Curl", "3 Sets", "12 reps"],
        ])}

        {renderWorkoutSection("Saturday (Legs)", [
          ["Leg Press", "3 Sets", "12 reps"],
          ["Goblet Squat", "3 Sets", "12 reps"],
          ["Stiff-Leg Deadlift (SLDL)", "3 Sets", "12 reps"],
          ["Calf Raise", "3 Sets", "12 reps"],
        ])}

        <p><em>Note : Workouts may have been changed slightly.</em></p>
      </div>

      <div className='row mt-3 mb-3'>
        <div className='col d-flex justify-content-center'>
          <DownloadPDFButton targetId="workout-container" fileName="6DayPPL.pdf" />
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

export default PPLWorkout2;
