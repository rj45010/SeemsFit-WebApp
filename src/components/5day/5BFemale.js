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

const FiveDaysWeek2 = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const startWorkout = async () => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/login', { state: { from: '/five-days-week-2' } });
      return;
    }

    const planName = "5 Days Week (For Female Beginner)";
    const workoutDetails = {
      planName,
      userId: user.uid,
      createdAt: new Date().toISOString(),
      dayLabels: {
        Monday: "Legs & Glutes",
        Tuesday: "Back & Arms",
        Wednesday: "Legs & Glutes",
        Thursday: "Chest & Shoulders",
        Friday: "Legs & Arms",
        Saturday: "Rest day",
        Sunday: "Rest day",
      },
      workoutPlan: {
        Monday: [
          { name: "Squat", sets: "3", reps: "6-10", weight: "" },
          { name: "Dumbbell Lunge", sets: "3", reps: "12-15", weight: "" },
          { name: "Dumbbell Step Up", sets: "3", reps: "12-15", weight: "" },
          { name: "Hip Thrust", sets: "3", reps: "6-10", weight: "" },
          { name: "Glute Cable Kickback", sets: "2", reps: "12-15", weight: "" },
        ],
        Tuesday: [
          { name: "Pull Down", sets: "3", reps: "6-10", weight: "" },
          { name: "One Arm Dumbbell Row", sets: "3", reps: "12-15", weight: "" },
          { name: "Seated Row", sets: "3", reps: "12-15", weight: "" },
          { name: "Dumbbell Curl", sets: "3", reps: "12", weight: "" },
          { name: "Triceps Overhead Extension", sets: "3", reps: "12", weight: "" },
          { name: "Cable Curl", sets: "3", reps: "12", weight: "" },
          { name: "Cable Pressdown", sets: "3", reps: "15", weight: "" },
        ],
        Wednesday: [
          { name: "Goblet Squat", sets: "3", reps: "10", weight: "" },
          { name: "Romanian Deadlift", sets: "3", reps: "12-15", weight: "" },
          { name: "Dumbbell Stiff Leg Deadlift", sets: "3", reps: "12", weight: "" },
          { name: "Smith Machine Sumo Squat", sets: "3", reps: "8-10", weight: "" },
          { name: "Glute Kick Back", sets: "3", reps: "15", weight: "" },
        ],
        Thursday: [
          { name: "Dumbbell Bench Press", sets: "4", reps: "12", weight: "" },
          { name: "Incline Dumbbell Press", sets: "3", reps: "12", weight: "" },
          { name: "Machine Chest Fly", sets: "3", reps: "12-15", weight: "" },
          { name: "Seated Dumbbell Press", sets: "3", reps: "10", weight: "" },
          { name: "Lateral Raise", sets: "3", reps: "12-15", weight: "" },
        ],
        Friday: [
          { name: "Deadlift", sets: "3", reps: "10-12", weight: "" },
          { name: "Good Mornings", sets: "3", reps: "10-12", weight: "" },
          { name: "Leg Extensions", sets: "3", reps: "12-15", weight: "" },
          { name: "Incline Dumbbell Curl", sets: "3", reps: "12", weight: "" },
          { name: "Incline Skull Crusher", sets: "3", reps: "12", weight: "" },
        ],
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
          ["Dumbbell Step Up", "3 Sets", "12-15 reps"],
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

      <div className='row mt-3 mb-3'>
        <div className='col d-flex justify-content-center'>
          <DownloadPDFButton targetId="workout-container" fileName="5DayFemaleBeginner.pdf" />
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

export default FiveDaysWeek2;
