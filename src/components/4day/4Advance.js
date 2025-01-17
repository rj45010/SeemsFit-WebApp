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

const FourDaysWeek2 = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const startWorkout = async () => {
    const user = auth.currentUser;
    if (!user) {
      navigate('/login', { state: { from: '/four-days-week2' } });
      return;
    }

    const planName = "4 Days Week (Intermediate and Advanced)";
    const workoutDetails = {
      planName,
      userId: user.uid,
      createdAt: new Date().toISOString(),
      dayLabels: {
        Monday: "Back & Biceps",
        Tuesday: "Chest & Triceps",
        Wednesday: "Rest Day",
        Thursday: "Quads, Hamstrings & Calves",
        Friday: "Shoulder, Traps & Forearms",
        Saturday: "Rest Day",
        Sunday: "Rest Day",
      },
      workoutPlan: {
        Monday: [
          { name: "Deadlift", sets: "2", reps: "5", weight: "" },
          { name: "One Arm Dumbbell Row", sets: "3", reps: "8-12", weight: "" },
          { name: "Wide Grip Pull Up or Lat Pull Down", sets: "3", reps: "10-12", weight: "" },
          { name: "Barbell Row", sets: "3", reps: "8-12", weight: "" },
          { name: "Seated Cable Row or Machine Row", sets: "5 Minutes", reps: "Burn", weight: "" },
        ],
        Tuesday: [
          { name: "Bench Press", sets: "3", reps: "6-10", weight: "" },
          { name: "Incline Dumbbell Bench Press", sets: "3", reps: "8-12", weight: "" },
          { name: "Chest Dip", sets: "3", reps: "AMRAP", weight: "" },
          { name: "Cable Crossover or Pec Dec", sets: "3", reps: "12-15", weight: "" },
          { name: "Machine Press or Dumbbell Bench Press", sets: "5 Minutes", reps: "Burn", weight: "" },
          { name: "EZ Bar Skullcrusher", sets: "3", reps: "8-12", weight: "" },
          { name: "Two Arm Seated Dumbbell Extension", sets: "3", reps: "8-12", weight: "" },
          { name: "Cable Tricep Extension", sets: "5 Minutes", reps: "Burn", weight: "" },
        ],
        Thursday: [
          { name: "Squat", sets: "3", reps: "6-10", weight: "" },
          { name: "Leg Press", sets: "3", reps: "15-20", weight: "" },
          { name: "Hack Squat or Dumbbell Lunge", sets: "3", reps: "8-12", weight: "" },
          { name: "Leg Extension", sets: "5 Minutes", reps: "Burn", weight: "" },
          { name: "Stiff Leg Deadlift", sets: "3", reps: "8-12", weight: "" },
          { name: "Leg Curl", sets: "5 Minutes", reps: "Burn", weight: "" },
          { name: "Standing Calf Raises", sets: "3", reps: "10-15", weight: "" },
          { name: "Seated Calf Raises", sets: "5 Minutes", reps: "Burn", weight: "" },
        ],
        Friday: [
          { name: "Seated Barbell Press", sets: "3", reps: "6-10", weight: "" },
          { name: "Seated Arnold Press", sets: "3", reps: "8-12", weight: "" },
          { name: "Dumbbell Lateral Raise", sets: "3", reps: "10-15", weight: "" },
          { name: "Hammer Strength Press or Smith Press", sets: "5 Minutes", reps: "Burn", weight: "" },
          { name: "Upright Row", sets: "3", reps: "8-12", weight: "" },
          { name: "Barbell Shrug or Dumbbell Shrug", sets: "5 Minutes", reps: "Burn", weight: "" },
          { name: "Seated Barbell Wrist Curl", sets: "3", reps: "12-15", weight: "" },
          { name: "Barbell Static Hold", sets: "5 Minutes", reps: "Burn", weight: "" },
        ],
        Wednesday: [],
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

      <div className="row mt-3 mb-3">
        <div className="col d-flex justify-content-center">
          <DownloadPDFButton targetId="workout-container" fileName="4DayInter-Ad.pdf" />
        </div>
        <div className="col d-flex justify-content-center">
          <button
            className={`btn ${theme === "dark" ? "btn-outline-light" : "btn-outline-dark"}`}
            onClick={startWorkout}
          >
            Start Workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default FourDaysWeek2;
