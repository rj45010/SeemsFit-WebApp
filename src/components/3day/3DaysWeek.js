import { useNavigate } from 'react-router-dom';
import '../css/Plans.css';
import Dropdown from '../plans/Dropdown';
import renderWorkoutSection from '../plans/RenderWorkout';
import DownloadPDFButton from '../plans/DownloadPDF';
import { useTheme } from '../ThemeProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { ApiContext } from '../../context/apiContext';
import useTrackWoroutService from '../../services/usetrackWorkOutService';

const ThreeDaysWeek = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const {getSinglePlan, startWorkoutPlan} = useTrackWoroutService();
  const {isLoggedIn,user} = useContext(ApiContext)

  const startWorkout = async () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/three-days-week' } });
      return;
    }

    const planName = "3 Days Week Schedule";
    const workoutDetails = {
      planName,
      userId: user.uid,
      createdAt: new Date().toISOString(),
      dayLabels: {
        "Day 1": "Chest Shoulders & Triceps",
        "Day 2": "Rest day",
        "Day 3": "Back and Biceps",
        "Day 4": "Rest day",
        "Day 5": "Legs and Core",
        "Day 6": "Rest Day",
        "Day 7": "Rest Day",
      },
      workoutPlan: {
        "Day 1": [
          { name: "Bench Press", sets: "3", reps: "6-8", weight: "" },
          { name: "Incline Dumbbell Bench Press", sets: "3", reps: "8-12", weight: "" },
          { name: "Cable Crossover", sets: "3", reps: "8-12", weight: "" },
          { name: "Overhead Press", sets: "3", reps: "8-12", weight: "" },
          { name: "Lateral Raises", sets: "3", reps: "8-12", weight: "" },
          { name: "Skullcrushers", sets: "3", reps: "8-12", weight: "" },
          { name: "Triceps Rope Pushdown", sets: "3", reps: "8-12", weight: "" },
        ],
        "Day 3": [
          { name: "Seated Cable Row", sets: "3", reps: "8-12", weight: "" },
          { name: "Lat Pulldown", sets: "3", reps: "8-12", weight: "" },
          { name: "Bent-Over Fly Dumbbell", sets: "3", reps: "8-12", weight: "" },
          { name: "Back Hyperextension", sets: "3", reps: "8-12", weight: "" },
          { name: "Biceps Barbell Curls", sets: "3", reps: "8-12", weight: "" },
          { name: "Hammer Curls", sets: "3", reps: "8-12", weight: "" },
        ],
        "Day 5": [
          { name: "Barbell Squat", sets: "3", reps: "8-12", weight: "" },
          { name: "Leg Press", sets: "3", reps: "8-12", weight: "" },
          { name: "Leg Extension", sets: "3", reps: "8-12", weight: "" },
          { name: "Leg Curl", sets: "3", reps: "8-12", weight: "" },
          { name: "Standing Calf Raises", sets: "3", reps: "8-12", weight: "" },
          { name: "Plank", sets: "3", reps: "30-60 sec", weight: "" },
          { name: "Crunch", sets: "3", reps: "15-20", weight: "" },
        ],
        "Day 2": [],
        "Day 4": [],
        "Day 6": [],
        "Day 7": [],
      },
    };

    try {
        const querySnapshot = await getSinglePlan(planName);
        console.log(querySnapshot);
        
      if (!querySnapshot.empty) {
        toast.info("Plan already exists!");
        return;
      }

      // // Save the new plan
       await startWorkoutPlan(workoutDetails);
       setTimeout(() => navigate("/my-plan"), 1000);
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
          <strong>3 Days Week Schedule</strong><br />
          Monday: Chest Shoulders & Triceps<br />
          Tuesday: Rest day<br />
          Wednesday: Back and Biceps<br />
          Thursday: Rest day<br />
          Friday: Legs and Core<br />
          Saturday: Rest Day<br />
          Sunday: Rest Day
        </p>

        {renderWorkoutSection("Chest Shoulders & Triceps", [
          ["Bench Press", "3 sets", "6-8 reps"],
          ["Incline Dumbbell Bench Press", "3 sets", "8-12 reps"],
          ["Cable Crossover", "3 sets", "8-12 reps"],
          ["Overhead Press", "3 sets", "8-12 reps"],
          ["Lateral Raises", "3 sets", "8-12 reps"],
          ["Skullcrushers", "3 sets", "8-12 reps"],
          ["Triceps Rope Pushdown", "3 sets", "8-12 reps"],
        ])}

        {renderWorkoutSection("Back and Biceps", [
          ["Seated Cable Row", "3 sets", "8-12 reps"],
          ["Lat Pulldown", "3 sets", "8-12 reps"],
          ["Bent-Over Fly Dumbbell", "3 sets", "8-12 reps"],
          ["Back Hyperextension", "3 sets", "8-12 reps"],
          ["Biceps Barbell Curls", "3 sets", "8-12 reps"],
          ["Hammer Curls", "3 sets", "8-12 reps"],
        ])}

        {renderWorkoutSection("Legs & Core", [
          ["Barbell Squat", "3 sets", "8-12 reps"],
          ["Leg Press", "3 sets", "8-12 reps"],
          ["Leg Extension", "3 sets", "8-12 reps"],
          ["Leg Curl", "3 sets", "8-12 reps"],
          ["Standing Calf Raises", "3 sets", "8-12 reps"],
          ["Plank", "3 sets", "30-60 sec"],
          ["Crunch", "3 sets", "15-20 reps"],
        ])}

        <br />
        <p>
          Workout Plan from:{' '}
          <a href="https://www.hevyapp.com/" target="_blank" rel="noopener noreferrer">
            www.hevyapp.com
          </a>
        </p>
        <br />
        <p><em>Note: Workouts may have been changed slightly.</em></p>
      </div>

      <div className='row mt-3 mb-3'>
        <div className='col d-flex justify-content-center'>
          <DownloadPDFButton targetId="workout-container" fileName="3DayWeek.pdf" />
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

export default ThreeDaysWeek;
