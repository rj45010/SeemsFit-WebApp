import React, { useEffect, useState, useCallback } from 'react';
import { db, collection, getDocs, auth, deleteDoc, doc, updateDoc } from './firebase';
import { query, where, limit } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/MyPlans.css';
import {useTheme} from './ThemeProvider';

const MyPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const { theme } = useTheme();

  const convertWeekdaysToDays = (workoutPlan) => {
    const daysOfWeekMap = {
      "Monday": "Day 1",
      "Tuesday": "Day 2",
      "Wednesday": "Day 3",
      "Thursday": "Day 4",
      "Friday": "Day 5",
      "Saturday": "Day 6",
      "Sunday": "Day 7",
    };
  
    const newWorkoutPlan = {};
    for (let day in workoutPlan) {
      const newDay = daysOfWeekMap[day] || day;
      newWorkoutPlan[newDay] = workoutPlan[day];
    }
    return newWorkoutPlan;
  };

  const convertDayLabels = (dayLabels) => {
    const dayLabelsMap = {
      "Monday": "Day 1",
      "Tuesday": "Day 2",
      "Wednesday": "Day 3",
      "Thursday": "Day 4",
      "Friday": "Day 5",
      "Saturday": "Day 6",
      "Sunday": "Day 7",
    };

    const updatedDayLabels = {};
    for (let day in dayLabels) {
      const newDay = dayLabelsMap[day] || day;
      updatedDayLabels[newDay] = dayLabels[day];
    }
    return updatedDayLabels;
  };

  const fetchPlans = useCallback(async (userId) => {
    try {
      setLoading(true);
      const plansQuery = query(
        collection(db, "plans"),
        where("userId", "==", userId),
        limit(10)
      );
      const querySnapshot = await getDocs(plansQuery);
      const userPlans = querySnapshot.docs.map((doc) => {
        const planData = doc.data();
        const updatedWorkoutPlan = convertWeekdaysToDays(planData.workoutPlan);
        const updatedDayLabels = convertDayLabels(planData.dayLabels); 
        return { id: doc.id, ...planData, workoutPlan: updatedWorkoutPlan, dayLabels: updatedDayLabels };
      });
  
      setPlans(userPlans);
    } catch (error) {
      console.error("Error fetching plans: ", error);
      toast.error("Failed to fetch plans.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      if (user) {
        fetchPlans(user.uid);
      } else {
        setPlans([]);
        setLoading(false);
      }
    });

    return () => unsubscribe(); 
  }, [fetchPlans]);
  
  const handlePlanSelect = (e) => {
    setSelectedPlanId(e.target.value);
  };

  const handleRepsChange = (day, exerciseIndex, newReps) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === selectedPlanId
          ? {
              ...plan,
              workoutPlan: {
                ...plan.workoutPlan,
                [day]: plan.workoutPlan[day].map((exercise, idx) =>
                  idx === exerciseIndex
                    ? { ...exercise, reps: newReps }
                    : exercise
                ),
              },
            }
          : plan
      )
    );
  };
  

  const handleWeightChange = (day, exerciseIndex, newWeight) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === selectedPlanId
          ? {
              ...plan,
              workoutPlan: {
                ...plan.workoutPlan,
                [day]: plan.workoutPlan[day].map((exercise, idx) =>
                  idx === exerciseIndex
                    ? { ...exercise, weight: newWeight }
                    : exercise
                ),
              },
            }
          : plan
      )
    );
  };

  const handleInputResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const saveChanges = async () => {
    const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);
    if (selectedPlan) {
      try {
        const planRef = doc(db, 'plans', selectedPlan.id);
        await updateDoc(planRef, { workoutPlan: selectedPlan.workoutPlan });
        toast.success("Workout plan updated successfully!", { autoClose: 2000 });
      } catch (error) {
        console.error("Error updating plan: ", error);
        toast.error("Failed to save changes.");
      }
    }
  };

  const handleDeletePlan = async (planId) => {
    setShowOverlay(true);

    const toastId = toast(
      <div>
        <p>Are you sure you want to delete this plan?</p>
        <div>
          <button className='toast-button-yes'
            onClick={async () => {
              try {
                await deleteDoc(doc(db, 'plans', planId));
                setPlans(plans.filter((plan) => plan.id !== planId));
                toast.success("Plan deleted successfully!", { autoClose: 2000 });
                window.location.reload();
              } catch (error) {
                console.error("Error deleting plan: ", error);
                toast.error("There was an error deleting the plan.");
              } finally {
                toast.dismiss(toastId); 
                setShowOverlay(false); 
              }
            }}>
            Yes
          </button>
          <button 
            className='toast-button-no'
            onClick={() => {
              toast.dismiss(toastId); 
              setShowOverlay(false); 
            }}>
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        hideProgressBar: true,
        draggable: false,
        closeButton: false,
      }
    );
  };

  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId);

  const daysOfWeek = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
  
  if (!isLoggedIn) {
    return (
      <div>
        <h1 className="h1 text-center mt-5" style={{ color: theme === "light" ? "black" : "white" }}>My Plans</h1>
        <div
          id="exercise-container"
          className="container d-flex flex-column justify-content-center align-items-center"
          style={{ height: "calc(100vh - 250px)" }}
        >
          <p className="text-center mb-3"
          style={{ color: theme === "light" ? "black" : "white" }}>
            Log in to see saved workout plans.
          </p>
          <Link to="/login" className={`btn ${theme === "dark" ? "btn-light" : "btn-dark"}`}>
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div id="my-plans-container">
      {loading ? (
        <p style={{ color: theme === "light" ? "black" : "white" }}>Loading plans...</p>
      ) : (
        <>
          <div className="custom-dropdown">
            <select 
              id={theme === "light" ? "plans-dropdown-light" : "plans-dropdown-dark"} 
              value={selectedPlanId} 
              onChange={handlePlanSelect} 
            >
              <option className="saved-plan-button" value="" disabled>Saved Plans ▼</option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.planName} - {plan.createdAt ? new Date(plan.createdAt).toLocaleDateString() : "Unknown"}
                </option>
              ))}
            </select>
          </div>

          {selectedPlan && (
            <div className="plan-container mt-4">
              <h2 style={{ color: theme === "light" || theme === "dark" ? "white" : "initial" }}>{selectedPlan.planName}</h2>
              {daysOfWeek.map((day, index) => {
                const dayPlan = selectedPlan.workoutPlan[day];
                const dayLabel = selectedPlan.dayLabels[day] || `Rest Day`;
                  if (!dayPlan || dayPlan.length === 0 || dayLabel === "Rest Day") {
                    return null; 
                  } 
                    return (
                      <div key={day} className="day-section">
                        <h2 className="day-heading">
                          {day} - {dayLabel}
                        </h2>
                        <table className="plans-table">
                          <thead>
                            <tr>
                              <th>Exercise Name</th>
                              <th>Sets</th>
                              <th>Reps</th>
                              <th>Weight (KG)</th>
                            </tr>
                          </thead>
                          <tbody>
                          {dayPlan.map((exercise, idx) => (
                            <tr key={idx}>
                              <td>{exercise.name}</td>
                              <td>{exercise.sets}</td>
                              <td>
                              <div className="d-flex justify-content-center reps">
                                <textarea
                                  type="text"
                                  value={exercise.reps || ''}
                                  onChange={(e) => {
                                    handleRepsChange(day, idx, e.target.value);
                                    handleInputResize(e);
                                  }}
                                  className="editable-weight-input"
                                />
                              </div>
                              </td>
                              <td>
                                <div className="d-flex justify-content-center weights">
                                  <textarea
                                    type="text"
                                    value={exercise.weight || ''}
                                    onChange={(e) => {
                                      handleWeightChange(day, idx, e.target.value);
                                      handleInputResize(e);
                                    }}
                                    className="editable-weight-input"
                                  />
                                </div>
                              </td>
                            </tr>
                          ))}
                          </tbody>
                      </table>
                      </div>
                    );
                  }
                )}
                <div className='row mt-3'>
                  <div className='col'>
                    <button className="edit-button" onClick={saveChanges}>
                      Save Changes
                    </button>
                  </div>
                  <div className='col'>
                    <button className="del-button" onClick={() => handleDeletePlan(selectedPlan.id)}>
                      Delete Plan
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      {showOverlay && <div className="overlay active"></div>}
    </div>
  );
};

export default MyPlans;
