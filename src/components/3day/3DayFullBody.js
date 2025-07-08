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

const ThreeDaysWeek1 = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const {getSinglePlan, startWorkoutPlan} = useTrackWoroutService();
  const {isLoggedIn,user} = useContext(ApiContext)

  const startWorkout = async () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/three-days-week1' } });
      return;
    }

    const planName = "3 Days Week (Full Body)";
    const workoutDetails = {
      planName,
      userId: user.uid,
      createdAt: new Date().toISOString(),
      dayLabels: {
        "Day 1": "Full Body Strength",
        "Day 2": "Rest Day",
        "Day 3": "Upper Body & Legs",
        "Day 4": "Rest Day",
        "Day 5": "Deadlift Focus & Isolation",
        "Day 6": "Rest Day",
        "Day 7": "Rest Day",
      },
      workoutPlan: {
        "Day 1": [
          { name: "Squat", sets: "5", reps: "5", weight: "" },
          { name: "Dumbbell Bench Press", sets: "4", reps: "10", weight: "" },
          { name: "Dumbbell Row", sets: "4", reps: "10", weight: "" },
          { name: "Shoulder Press", sets: "4", reps: "10", weight: "" },
          { name: "Lateral Raise", sets: "4", reps: "10", weight: "" },
          { name: "Biceps Curl", sets: "3", reps: "12", weight: "" },
        ],
        "Day 2": [],
        "Day 3": [
          { name: "Bench Press", sets: "5", reps: "5", weight: "" },
          { name: "Leg Curl", sets: "4", reps: "10", weight: "" },
          { name: "Lunges", sets: "4", reps: "10", weight: "" },
          { name: "Lat Pulldown", sets: "4", reps: "10", weight: "" },
          { name: "Lateral Raise", sets: "4", reps: "10", weight: "" },
          { name: "Bar Triceps Extension", sets: "3", reps: "12", weight: "" },
        ],
        "Day 4": [],
        "Day 5": [
          { name: "Deadlift", sets: "5", reps: "5", weight: "" },
          { name: "Incline Dumbbell Press", sets: "4", reps: "10", weight: "" },
          { name: "Biceps Curl", sets: "3", reps: "12", weight: "" },
          { name: "Leg Press", sets: "4", reps: "10", weight: "" },
          { name: "Skullcrushers", sets: "3", reps: "10", weight: "" },
          { name: "Dumbbell Shrugs", sets: "3", reps: "12", weight: "" },
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
          <strong>3 Days Week (Full Body)</strong><br />
          Day 1: Full Body Strength<br />
          Day 2: Rest Day<br />
          Day 3: Upper Body & Legs<br />
          Day 4: Rest Day<br />
          Day 5: Deadlift Focus & Isolation<br />
          Day 6: Rest Day<br />
          Day 7: Rest Day<br />
        </p>
        
        {renderWorkoutSection("Day 1: Full Body Strength", [
          ["Squat", "5 Sets", "5 reps"],
          ["Dumbbell Bench Press", "4 Sets", "10 reps"],
          ["Dumbbell Row", "4 Sets", "10 reps"],
          ["Shoulder Press", "4 Sets", "10 reps"],
          ["Lateral Raise", "4 Sets", "10 reps"],
          ["Biceps Curl", "3 Sets", "12 reps"],
        ])}

        {renderWorkoutSection("Day 3: Upper Body & Legs", [
          ["Bench Press", "5 Sets", "5 reps"],
          ["Leg Curl", "4 Sets", "10 reps"],
          ["Lunges", "4 Sets", "10 reps"],
          ["Lat Pulldown", "4 Sets", "10 reps"],
          ["Lateral Raise", "4 Sets", "10 reps"],
          ["Bar Triceps Extension", "3 Sets", "12 reps"],
        ])}

        {renderWorkoutSection("Day 5: Deadlift Focus & Isolation", [
          ["Deadlift", "5 Sets", "5 reps"],
          ["Incline Dumbbell Press", "4 Sets", "10 reps"],
          ["Biceps Curl", "3 Sets", "12 reps"],
          ["Leg Press", "4 Sets", "10 reps"],
          ["Skullcrushers", "3 Sets", "10 reps"],
          ["Dumbbell Shrugs", "3 Sets", "12 reps"],
        ])}

        <p><em>Note: Workouts may have been changed slightly.</em></p>
      </div>

      <div className='row mt-3 mb-3'>
        <div className='col d-flex justify-content-center'>
          <DownloadPDFButton targetId="workout-container" fileName="3DayFullBody.pdf" />
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

export default ThreeDaysWeek1;
