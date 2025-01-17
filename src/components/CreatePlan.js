import React, { useState, useEffect } from 'react';
import { db, addDoc, collection, auth } from './firebase';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/CreatePlan.css';
import {useTheme} from './ThemeProvider';

const WorkoutDay = ({ day, exercises, dayLabel, handleDayLabelChange, handleExerciseChange, handleAddExercise, handleDeleteExercise }) => {
  return (
    <div className="container">
      <div className="day-container">
        <div className="day-header">
          {/* Display day and editable label */}
          <span>{day} - </span>
          <input
            type="text"
            placeholder="Rest Day"
            value={dayLabel || "Rest Day"}
            onChange={(e) => handleDayLabelChange(e, day)}
            className="day-label-input"
          />
        </div>
        <table className="create-plan-table">
          {exercises.map((exercise, index) => (
            <tr key={index}>
              <td className="create-plan-td">
                <input
                  type="text"
                  placeholder="Exercise Name"
                  value={exercise.name}
                  onChange={(e) => handleExerciseChange(e, index, day, 'name')}
                />
              </td>
              <td className="create-plan-td">
                <input
                  type="text"
                  placeholder="Sets"
                  value={exercise.sets}
                  onChange={(e) => handleExerciseChange(e, index, day, 'sets')}
                />
              </td>
              <td className="create-plan-td">
                <input
                  type="text"
                  placeholder="Reps"
                  value={exercise.reps}
                  onChange={(e) => handleExerciseChange(e, index, day, 'reps')}
                />
              </td>
              <td className="create-plan-td">
                <input
                  type="text"
                  placeholder="Weight (KG)"
                  value={exercise.weight}
                  onChange={(e) => handleExerciseChange(e, index, day, 'weight')}
                />
              </td>
              <td className="create-plan-td">
                <button
                  className="delete-button"
                  onClick={() => handleDeleteExercise(day, index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </table>
        <button className="add-exercise" onClick={() => handleAddExercise(day)}>Add Exercise</button>
      </div>
    </div>
  );
};



const CreatePlan = () => {
  const { theme } = useTheme();
  const initialExercises = [
    { name: '', sets: '', reps: '', weight: '' },
  ];

  const [workoutPlan, setWorkoutPlan] = useState({
    Monday: [...initialExercises],
    Tuesday: [...initialExercises],
    Wednesday: [...initialExercises],
    Thursday: [...initialExercises],
    Friday: [...initialExercises],
    Saturday: [...initialExercises],
    Sunday: [...initialExercises],
  });

  const [dayLabels, setDayLabels] = useState({
    Monday: "Rest Day",
    Tuesday: "Rest Day",
    Wednesday: "Rest Day",
    Thursday: "Rest Day",
    Friday: "Rest Day",
    Saturday: "Rest Day",
    Sunday: "Rest Day",
  });

  const [planName, setPlanName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!auth.currentUser);
    };

    auth.onAuthStateChanged(checkAuth);
  }, []);

  const handleDayLabelChange = (e, day) => {
    setDayLabels({ ...dayLabels, [day]: e.target.value });
  };

  const handleExerciseChange = (e, index, day, field) => {
    const updatedPlan = { ...workoutPlan };
    updatedPlan[day] = updatedPlan[day].map((exercise, idx) =>
      idx === index ? { ...exercise, [field]: e.target.value } : exercise
    );
    setWorkoutPlan(updatedPlan);
  };

  const handleAddExercise = (day) => {
    const updatedPlan = { ...workoutPlan };
    updatedPlan[day].push({ name: '', sets: '', reps: '', weight: '' });
    setWorkoutPlan(updatedPlan);
  };

  const handleDeleteExercise = (day, index) => {
    const updatedPlan = { ...workoutPlan };
    updatedPlan[day].splice(index, 1);
    setWorkoutPlan(updatedPlan);
  };

  const handleSavePlan = async () => {
    if (!isLoggedIn) {
      return;
    }
  
    if (!planName.trim()) {
      toast.error("Please provide a name for your workout plan.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
  
    try {
      const planWithLabels = {
        workoutPlan,
        dayLabels,
        planName,
        userId: auth.currentUser.uid,
        createdAt: new Date().toISOString(),
      };
  
      const docRef = await addDoc(collection(db, "plans"), planWithLabels);
      console.log("Document written with ID: ", docRef.id);
  
      // Refresh the page and redirect to /my-plans
      window.location.href = "/my-plan";
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Error saving workout plan.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  if (!isLoggedIn) {
    return (
      <div>
        <h1 className="h1 text-center mt-5">Create Plan</h1>
        <div
          id="exercise-container"
          className="container d-flex flex-column justify-content-center align-items-center"
          style={{ height: "calc(100vh - 250px)" }}
        >
          <p className="text-center mb-3"
          style={{ color: theme === "light" ? "black" : "white" }}>
            Log in to create a workout plan.
          </p>
          <Link to="/login" className={`btn ${theme === "dark" ? "btn-light" : "btn-dark"}`}>
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div id="exercise-container">
      <div className="plan-name-container d-flex justify-content-center align-items-center">
        <input
          type="text"
          placeholder="Workout Plan Name"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          className="plan-name-input"
        />
      </div>
      {Object.keys(workoutPlan).map((day) => (
        <WorkoutDay 
          key={day} 
          day={day} 
          exercises={workoutPlan[day]} 
          dayLabel={dayLabels[day]} 
          handleDayLabelChange={handleDayLabelChange}
          handleExerciseChange={handleExerciseChange}
          handleAddExercise={handleAddExercise}
          handleDeleteExercise={handleDeleteExercise}
        />
      ))}
      <button className="save-button" onClick={handleSavePlan}>Save Plan</button>
    </div>
  );
};

export default CreatePlan;
