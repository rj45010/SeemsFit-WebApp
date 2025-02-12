import React, { useState, useEffect } from 'react';
import { db, addDoc, collection, auth } from './firebase';
import { Timestamp } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/CreatePlan.css';
import {useTheme} from './ThemeProvider';
// import exerciseOptions from './ExerciseList';

const WorkoutDay = ({ day, exercises, dayLabel, handleDayLabelChange, handleExerciseChange, handleAddExercise, handleDeleteExercise }) => {
  const { theme } = useTheme();
  return (
    <div className="container">
      <div className="day-container">
        <div className="day-header">
          {/* Display day and editable label */}
          <span>{day} - </span>
          <input
            type="text"
            placeholder="Rest Day"
            value={dayLabel || ""}
            onChange={(e) => handleDayLabelChange(e, day)}
            className="day-label-input"
          />
        </div>
        <table className="create-plan-table">
          {exercises.map((exercise, index) => (
            <tr key={index}>
              <td className={`${theme === "light" ? "create-plan-td-light" : "create-plan-td-dark"} create-plan-td`}>
                <input
                  type="text"
                  placeholder="Exercise Name"
                  value={exercise.name}
                  onChange={(e) => handleExerciseChange(e, index, day, 'name')}
                />
              </td>
              <td className={`${theme === "light" ? "create-plan-td-light" : "create-plan-td-dark"} create-plan-td`}>
                <input
                  type="text"
                  placeholder="Sets"
                  value={exercise.sets}
                  onChange={(e) => handleExerciseChange(e, index, day, 'sets')}
                />
              </td>
              <td className={`${theme === "light" ? "create-plan-td-light" : "create-plan-td-dark"} create-plan-td`}>
                <input
                  type="text"
                  placeholder="Reps"
                  value={exercise.reps}
                  onChange={(e) => handleExerciseChange(e, index, day, 'reps')}
                />
              </td>
              <td className={`${theme === "light" ? "create-plan-td-light" : "create-plan-td-dark"} create-plan-td`}>
                <input
                  type="text"
                  placeholder="Weight (KG)"
                  value={exercise.weight}
                  onChange={(e) => handleExerciseChange(e, index, day, 'weight')}
                />
              </td>
              <td className={`${theme === "light" ? "create-plan-td-light" : "create-plan-td-dark"} create-plan-td`}>
                <button
                  className="btn btn-danger delete-button"
                  onClick={() => handleDeleteExercise(day, index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </table>
        <button className={`btn ${theme === "dark" ? "btn-light" : "btn-dark"} add-exercise`} onClick={() => handleAddExercise(day)}>Add Exercise</button>
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
    "Day 1": [...initialExercises],
    "Day 2": [...initialExercises],
    "Day 3": [...initialExercises],
    "Day 4": [...initialExercises],
    "Day 5": [...initialExercises],
    "Day 6": [...initialExercises],
    "Day 7": [...initialExercises],
  });

  const [dayLabels, setDayLabels] = useState({
    "Day 1": "",
    "Day 2": "",
    "Day 3": "",
    "Day 4": "",
    "Day 5": "",
    "Day 6": "",
    "Day 7": "",
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
        createdAt: Timestamp.now(),
      };
  
      const docRef = await addDoc(collection(db, "plans"), planWithLabels);
      console.log("Document written with ID: ", docRef.id);
  
      // Refresh the page and redirect to my-plan
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
      <div className={` ${theme === "light" ? "plan-name-container-light" : "plan-name-container-dark"} d-flex justify-content-center align-items-center`}>
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
      <div className='d-flex justify-content-center'>
        <button 
          className={`btn ${theme === "dark" ? "btn-light" : "btn-dark"} save-button`}
          onClick={handleSavePlan}>
            Save Plan
        </button>
      </div>
    </div>
  );
};

export default CreatePlan;
