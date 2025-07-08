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

const FiveDaysWeek1 = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const {getSinglePlan, startWorkoutPlan} = useTrackWoroutService();
  const {isLoggedIn,user} = useContext(ApiContext)

  const startWorkout = async () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/five-days-week-1' } });
      return;
    }

    const planName = "5 Days Week (Intermediate and Advanced)";
    const workoutDetails = {
      planName,
      userId: user.uid,
      createdAt: new Date().toISOString(),
      dayLabels: {
        "Day 1": "Chest",
        "Day 2": "Back",
        "Day 3": "Arms",
        "Day 4": "Legs",
        "Day 5": "Shoulder",
        "Day 6": "Rest Day",
        "Day 7": "Rest Day",
      },
      workoutPlan: {
        "Day 1": [
          { name: "Flat Bench Press", sets: "4", reps: "6-10", weight: "" },
          { name: "Flat Bench DB Fly", sets: "3", reps: "8-10", weight: "" },
          { name: "Incline DB Bench Press", sets: "4", reps: "8-10", weight: "" },
          { name: "Low to High Cable Fly", sets: "3", reps: "10", weight: "" },
          { name: "Chest Dips", sets: "3", reps: "10", weight: "" },
        ],
        "Day 2": [
          { name: "Deadlift", sets: "4", reps: "3-6", weight: "" },
          { name: "Pull Ups", sets: "4", reps: "6-12", weight: "" },
          { name: "Bent Over Rows", sets: "4", reps: "8-12", weight: "" },
          { name: "Close Grip Lat Pulldown", sets: "3", reps: "8-12", weight: "" },
          { name: "Machine High Row", sets: "3", reps: "10-12", weight: "" },
        ],
        "Day 3": [
          { name: "Barbell Curl", sets: "3", reps: "8-10", weight: "" },
          { name: "Alternating Hammer Curls", sets: "3", reps: "10 each arm", weight: "" },
          { name: "Reverse Cable Curl w/ Straight Bar", sets: "3", reps: "10-12", weight: "" },
          { name: "Triceps Pressdown w/ Rope", sets: "3", reps: "10-12", weight: "" },
          { name: "Triceps Kickback", sets: "3", reps: "10-12", weight: "" },
          { name: "Skull Crushers", sets: "3", reps: "8-10", weight: "" },
        ],
        "Day 4": [
          { name: "Back Squat", sets: "4", reps: "6-10", weight: "" },
          { name: "Stiff Leg or RDL", sets: "3", reps: "10", weight: "" },
          { name: "Split Squat", sets: "3", reps: "8-12 each side", weight: "" },
          { name: "Hip Thrust", sets: "3", reps: "8-12", weight: "" },
          { name: "Leg Curl x Leg Extension (superset)", sets: "3", reps: "10-15", weight: "" },
          { name: "Standing or Seated Calf Raise", sets: "3", reps: "Max", weight: "" },
        ],
        "Day 5": [
          { name: "Seated or Standing OHP", sets: "4", reps: "8-12", weight: "" },
          { name: "Arnold Press", sets: "3", reps: "10-12", weight: "" },
          { name: "Lateral Raise", sets: "3", reps: "10-15", weight: "" },
          { name: "Cable Y-Raise", sets: "3", reps: "10-12", weight: "" },
          { name: "Rear Delt Fly", sets: "3", reps: "10-12", weight: "" },
          { name: "Face Pull", sets: "3", reps: "10-15", weight: "" },
        ],
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
          <strong>5 Days Week (Intermediate and Advanced)</strong><br />
          Monday: Chest<br />
          Tuesday: Back<br />
          Wednesday: Arms<br />
          Thursday: Legs<br />
          Friday: Shoulder<br />
          Saturday: Rest day<br />
          Sunday: Rest day
        </p>

        {renderWorkoutSection("Chest", [
          ["Flat Bench Press", "4 sets", "6-10 reps"],
          ["Flat Bench DB Fly", "3 sets", "8-10 reps"],
          ["Incline DB Bench Press", "4 sets", "8-10 reps"],
          ["Low to High Cable Fly", "3 sets", "10 reps"],
          ["Chest Dips", "3 sets", "10 reps"],
        ])}

        {renderWorkoutSection("Back", [
          ["Deadlift", "4 sets", "3-6 reps"],
          ["Pull Ups", "4 sets", "6-12 reps"],
          ["Bent Over Rows", "4 sets", "8-12 reps"],
          ["Close Grip Lat Pulldown", "3 sets", "8-12 reps"],
          ["Machine High Row", "3 sets", "10-12 reps"],
        ])}

        {renderWorkoutSection("Arms", [
          ["Barbell Curl", "3 Sets", "8-10 reps"],
          ["Alternating Hammer Curls", "3 Sets", "10 reps each arm"],
          ["Reverse Cable Curl w/ Straight Bar", "3 Sets", "10-12 reps"],
          ["Triceps Pressdown w/ Rope", "3 Sets", "10-12 reps"],
          ["Triceps Kickback", "3 Sets", "10-12 reps"],
          ["Skull Crushers", "3 Sets", "8-10 reps"],
        ])}

        {renderWorkoutSection("Legs", [
          ["Back Squat", "4 Sets", "6-10 reps"],
          ["Stiff Leg or RDL", "3 Sets", "10 reps"],
          ["Split Squat", "3 Sets", "8-12 reps each side"],
          ["Hip Thrust", "3 Sets", "8-12 reps"],
          ["Leg Curl x Leg Extension (superset)", "3 Sets", "10-15 reps"],
          ["Standing or Seated Calf Raise", "3 Sets", "Max reps"],
        ])}

        {renderWorkoutSection("Shoulder", [
          ["Seated or Standing OHP", "4 Sets", "8-12 reps"],
          ["Arnold Press", "3 Sets", "10-12 reps"],
          ["Lateral Raise", "3 Sets", "10-15 reps"],
          ["Cable Y-Raise", "3 Sets", "10-12 reps"],
          ["Rear Delt Fly", "3 Sets", "10-12 reps"],
          ["Face Pull", "3 Sets", "10-15 reps"],
        ])}

        <br />
        <p>Workout Plan from: <a href="https://advancedbodymetrics.com/" target="_blank" rel="noopener noreferrer">www.advancedbodymetrics.com</a></p>
        <br />
        <p><em>Note: Workouts may have been changed slightly.</em></p>
      </div>

      <div className='row mt-3 mb-3'>
        <div className='col d-flex justify-content-center'>
          <DownloadPDFButton targetId="workout-container" fileName="5DayInter-Ad.pdf" />
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

export default FiveDaysWeek1;
