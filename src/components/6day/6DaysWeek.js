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

const SixDaysWeek = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const {getSinglePlan, startWorkoutPlan} = useTrackWoroutService();
  const {isLoggedIn,user} = useContext(ApiContext)

  const startWorkout = async () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/six-days-week' } });
      return;
    }

    const planName = "6 Days Week Schedule";
    const workoutDetails = {
      planName,
      userId: user.uid,
      createdAt: new Date().toISOString(),
      dayLabels: {
        "Day 1": "Back",
        "Day 2": "Chest & Abs",
        "Day 3": "Quads",
        "Day 4": "Shoulders",
        "Day 5": "Hamstrings",
        "Day 6": "Arms",
        "Day 7": "Rest Day",
      },
      workoutPlan: {
        "Day 1": [
          { name: "Pull-Up or Lat Pulldown", sets: "4", reps: "10", weight: "" },
          { name: "Barbell Row", sets: "4", reps: "10", weight: "" },
          { name: "Seated Row", sets: "4", reps: "10", weight: "" },
          { name: "Dumbbell Shrug", sets: "4", reps: "10", weight: "" },
          { name: "Back Extension", sets: "4", reps: "10", weight: "" },
        ],
        "Day 2": [
          { name: "Bench Press", sets: "4", reps: "10", weight: "" },
          { name: "Incline Dumbbell Press", sets: "4", reps: "10", weight: "" },
          { name: "Standing Cable Chest Fly", sets: "4", reps: "10", weight: "" },
          { name: "Push-Up", sets: "4", reps: "Failure", weight: "" },
          { name: "Kneeling Ab Wheel Roll-Out", sets: "4", reps: "10", weight: "" },
          { name: "Hanging Knee Raise", sets: "4", reps: "15-20", weight: "" },
          { name: "Crunch", sets: "4", reps: "15-20", weight: "" },
        ],
        "Day 3": [
          { name: "Squat", sets: "4", reps: "10", weight: "" },
          { name: "Hack Squat Machine", sets: "4", reps: "10", weight: "" },
          { name: "Barbell Lunge", sets: "4", reps: "10", weight: "" },
          { name: "Leg Extension", sets: "4", reps: "10", weight: "" },
        ],
        "Day 4": [
          { name: "Overhead Press", sets: "4", reps: "10", weight: "" },
          { name: "Dumbbell Lateral Raise", sets: "4", reps: "10", weight: "" },
          { name: "Seated Dumbbell Shoulder Press", sets: "4", reps: "10", weight: "" },
          { name: "Reverse Dumbbell Flyes", sets: "4", reps: "10", weight: "" },
        ],
        "Day 5": [
          { name: "Lying Leg Curl", sets: "4", reps: "10", weight: "" },
          { name: "Seated Leg Curl", sets: "4", reps: "10", weight: "" },
          { name: "Romanian Deadlift", sets: "4", reps: "10", weight: "" },
          { name: "Standing Calf Raise", sets: "4", reps: "10", weight: "" },
          { name: "Seated Calf Raise", sets: "4", reps: "10", weight: "" },
        ],
        "Day 6": [
          { name: "Barbell Curl", sets: "4", reps: "10", weight: "" },
          { name: "Preacher Curl", sets: "4", reps: "10", weight: "" },
          { name: "Cable Curl", sets: "4", reps: "10", weight: "" },
          { name: "Barbell Lying Triceps Extension", sets: "4", reps: "10", weight: "" },
          { name: "Dumbbell Triceps Extension", sets: "4", reps: "10", weight: "" },
          { name: "Tricep Pushdown", sets: "4", reps: "10", weight: "" },
        ],
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
          <strong>6 Days Week Schedule</strong><br />
          Monday: Back<br />
          Tuesday: Chest &amp; Abs<br />
          Wednesday: Quads<br />
          Thursday: Shoulders<br />
          Friday: Hamstrings<br />
          Saturday: Arms<br />
          Sunday: Rest day
        </p>

        {renderWorkoutSection("Back", [
          ["Pull-Up or Lat Pulldown", "4 Sets", "10 reps"],
          ["Barbell Row", "4 Sets", "10 reps"],
          ["Seated Row", "4 Sets", "10 reps"],
          ["Dumbbell Shrug", "4 Sets", "10 reps"],
          ["Back Extension", "4 Sets", "10 reps"],
        ])}

        {renderWorkoutSection("Chest & Abs", [
          ["Bench Press", "4 Sets", "10 reps"],
          ["Incline Dumbbell Press", "4 Sets", "10 reps"],
          ["Standing Cable Chest Fly", "4 Sets", "10 reps"],
          ["Push-Up", "4 Sets", "Failure"],
          ["Kneeling Ab Wheel Roll-Out", "4 Sets", "10 reps"],
          ["Hanging Knee Raise", "4 Sets", "15-20 reps"],
          ["Crunch", "4 Sets", "15-20 reps"],
        ])}

        {renderWorkoutSection("Quads", [
          ["Squat", "4 Sets", "10 reps"],
          ["Hack Squat Machine", "4 Sets", "10 reps"],
          ["Barbell Lunge", "4 Sets", "10 reps"],
          ["Leg Extension", "4 Sets", "10 reps"],
        ])}

        {renderWorkoutSection("Shoulders", [
          ["Overhead Press", "4 Sets", "10 reps"],
          ["Dumbbell Lateral Raise", "4 Sets", "10 reps"],
          ["Seated Dumbbell Shoulder Press", "4 Sets", "10 reps"],
          ["Reverse Dumbbell Flyes", "4 Sets", "10 reps"],
        ])}

        {renderWorkoutSection("Hamstrings", [
          ["Lying Leg Curl", "4 Sets", "10 reps"],
          ["Seated Leg Curl", "4 Sets", "10 reps"],
          ["Romanian Deadlift", "4 Sets", "10 reps"],
          ["Standing Calf Raise", "4 Sets", "10 reps"],
          ["Seated Calf Raise", "4 Sets", "10 reps"],
        ])}

        {renderWorkoutSection("Arms", [
          ["Barbell Curl", "4 Sets", "10 reps"],
          ["Preacher Curl", "4 Sets", "10 reps"],
          ["Cable Curl", "4 Sets", "10 reps"],
          ["Barbell Lying Triceps Extension", "4 Sets", "10 reps"],
          ["Dumbbell Triceps Extension", "4 Sets", "10 reps"],
          ["Tricep Pushdown", "4 Sets", "10 reps"],
        ])}

        <p>Workout Plan from: <a href="https://www.strengthlog.com/" target="_blank" rel="noopener noreferrer">www.strengthlog.com</a></p>
        <p><em>Note: Workouts may have been changed slightly.</em></p>
      </div>

      <div className='row mt-3 mb-3'>
        <div className='col d-flex justify-content-center'>
          <DownloadPDFButton targetId="workout-container" fileName="6DayWeek.pdf" />
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

export default SixDaysWeek;
