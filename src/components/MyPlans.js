import { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/MyPlans.css';
import {useTheme} from './ThemeProvider';
import useTrackWoroutService from "../services/usetrackWorkOutService";
import { useContext } from 'react';
import { ApiContext } from '../context/apiContext';


const MyPlans = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const { theme } = useTheme();
  const{getplans,updatePlanData,deletePlan}= useTrackWoroutService();
  const context = useContext(ApiContext);
  const{loading,isLoggedIn}=context

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
  useEffect(() => {
    (async () => {
    const data = await getplans();
    if (Array.isArray(data)) {
      setPlans(data);
    } else {
      setPlans([]); 
    }
  })();
  }, []);
  
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
       const data = { workoutPlan: selectedPlan.workoutPlan }
       updatePlanData(selectedPlan.id,data)
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
              await deletePlan(planId)
              setPlans(plans.filter((plan) => plan.id !== planId));
              toast.dismiss(toastId); 
              setShowOverlay(false); 
              window.location.reload();
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
