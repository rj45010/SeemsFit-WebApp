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


const PPLWorkout1 = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { getSinglePlan, startWorkoutPlan } = useTrackWoroutService();
  const { isLoggedIn, user } = useContext(ApiContext);

  const startWorkout = async () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/ppl-workout1' } });
      return;
    }

    const planName = "3 Day PPL Schedule";
    const workoutDetails = {
      planName,
      userId: user.uid,
      createdAt: new Date().toISOString(),
      dayLabels: {
        "Day 1": "Push",
        "Day 2": "Rest Day",
        "Day 3": "Pull",
        "Day 4": "Rest Day",
        "Day 5": "Legs",
        "Day 6": "Rest Day",
        "Day 7": "Rest Day",
      },
      workoutPlan: {
        "Day 1": [
          { name: "Bench Press", sets: "3", reps: "6-8", weight: "" },
          { name: "Seated Shoulder Press", sets: "3", reps: "8-12", weight: "" },
          { name: "Incline Dumbbell Press", sets: "3", reps: "8-12", weight: "" },
          { name: "Lateral Raises", sets: "3", reps: "8-12", weight: "" },
          { name: "Triceps Dumbbell Extension", sets: "3", reps: "8-12", weight: "" },
          { name: "Triceps Rope Pressdown", sets: "3", reps: "8-12", weight: "" },
        ],
        "Day 3": [
          { name: "Lat Pulldown", sets: "3", reps: "8-12", weight: "" },
          { name: "Bent Over Row", sets: "3", reps: "8-12", weight: "" },
          { name: "Face Pulls", sets: "3", reps: "8-12", weight: "" },
          { name: "Dumbbell Shrugs", sets: "3", reps: "8-12", weight: "" },
          { name: "Bicep Barbell Curls", sets: "3", reps: "8-12", weight: "" },
          { name: "Hammer Curls", sets: "3", reps: "8-12", weight: "" },
        ],
        "Day 5": [
          { name: "Squat Barbell", sets: "3", reps: "8-12", weight: "" },
          { name: "Leg Press", sets: "3", reps: "8-12", weight: "" },
          { name: "Leg Extension", sets: "3", reps: "8-12", weight: "" },
          { name: "Seated Leg Curl", sets: "3", reps: "8-12", weight: "" },
          { name: "Standing Calf Raises", sets: "3", reps: "8-12", weight: "" },
        ],
        "Day 2": [],
        "Day 4": [],
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
        <p><em>Note: Workouts may have been changed slightly.</em></p>
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
