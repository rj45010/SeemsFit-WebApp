import { useNavigate } from 'react-router-dom';
import '../css/SeePlans.css';
import Dropdown from '../plans/Dropdown';
import renderWorkoutSection from '../plans/RenderWorkout';
import DownloadPDFButton from '../plans/DownloadPDF';
import { useTheme } from '../ThemeProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { ApiContext } from '../../context/apiContext';
import useTrackWoroutService from '../../services/usetrackWorkOutService';

const FourDaysWeek = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const {getSinglePlan, startWorkoutPlan} = useTrackWoroutService();
  const {isLoggedIn,user} = useContext(ApiContext)

  const startWorkout = async () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/four-days-week' } });
      return;
    }

    const planName = "4 Days Week (Beginner)";
    const workoutDetails = {
      planName,
      userId: user.uid,
      createdAt: new Date().toISOString(),
      dayLabels: {
        "Day 1": "Legs & Intervals",
        "Day 2": "Shoulder & Abs",
        "Day 3": "Rest Day",
        "Day 4": "Chest & Triceps",
        "Day 5": "Back & Biceps",
        "Day 6": "Rest Day",
        "Day 7": "Rest Day",
      },
      workoutPlan: {
        "Day 1": [
          { name: "Dumbbell Squat", sets: "3", reps: "10", weight: "" },
          { name: "Dumbbell Lunge", sets: "3", reps: "5 each leg", weight: "" },
          { name: "Plie Squat", sets: "3", reps: "10", weight: "" },
          { name: "Dumbbell Step-Up", sets: "3", reps: "10", weight: "" },
          { name: "Burpee", sets: "1", reps: "50", weight: "" },
        ],
        "Day 2": [
          { name: "Dumbbell Overhead Press", sets: "3", reps: "10", weight: "" },
          { name: "Dumbbell Lateral Raise", sets: "3", reps: "12-15", weight: "" },
          { name: "Dumbbell Front Raise", sets: "3", reps: "12-15", weight: "" },
          { name: "Rear-Delt Flye", sets: "3", reps: "12-15", weight: "" },
          { name: "Shrug", sets: "3", reps: "10", weight: "" },
          { name: "Face Pull", sets: "3", reps: "10", weight: "" },
          { name: "Kneeling Cable Crunch", sets: "3", reps: "10", weight: "" },
          { name: "Horizontal Cable Woodchop", sets: "3", reps: "10 each side", weight: "" },
          { name: "Plank", sets: "3", reps: "Failure", weight: "" },
        ],
        "Day 4": [
          { name: "Dumbbell Incline Press", sets: "2", reps: "10", weight: "" },
          { name: "Dumbbell Flat Press", sets: "3", reps: "10", weight: "" },
          { name: "Dumbbell Flye", sets: "3", reps: "10", weight: "" },
          { name: "Pushup", sets: "1", reps: "*AMRAP", weight: "" },
          { name: "Close-Grip Bench Press", sets: "3", reps: "10", weight: "" },
          { name: "Lying Dumbbell Skull Crusher", sets: "3", reps: "10", weight: "" },
          { name: "Triceps Pushdown", sets: "3", reps: "10", weight: "" },
        ],
        "Day 5": [
          { name: "Trap-Bar Deadlift", sets: "5", reps: "10", weight: "" },
          { name: "One-Arm, Elbow-In Dumbbell Row", sets: "3", reps: "10", weight: "" },
          { name: "Pullup", sets: "3", reps: "*AMRAP", weight: "" },
          { name: "Barbell Curl", sets: "3", reps: "10", weight: "" },
          { name: "Cable Curl", sets: "3", reps: "10", weight: "" },
          { name: "Concentration Curl", sets: "3", reps: "10", weight: "" },
        ],
        "Day 3": [],
        "Day 6": [],
        "Day 7": [],
      },
    };    

       try {
      // Check if the plan already exists
      const querySnapshot = await getSinglePlan(planName);
      if (!querySnapshot.empty) {
        // Plan already exists
        toast.info("Plan already exists!");
        return;
      }

      // // Save the new plan
      await startWorkoutPlan(workoutDetails)
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
        <p><em>Note: Workouts may have been changed slightly.</em></p>
      </div>

      <div className='row mt-3 mb-3'>
        <div className='col d-flex justify-content-center'>
          <DownloadPDFButton targetId="workout-container" fileName="4DayBeginner.pdf" />
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

export default FourDaysWeek;
