import React, { useEffect, useState } from 'react';
import { db, collection, getDocs, auth, deleteDoc, doc } from './firebase'; 
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/MyPlans.css';

const MyPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!auth.currentUser);
    };

    auth.onAuthStateChanged(checkAuth);
  }, []);

  useEffect(() => {
    const fetchPlans = async () => {
      if (!auth.currentUser) {
        setLoading(false);
        return;
      }

      try {
        const querySnapshot = await getDocs(collection(db, 'plans'));
        const userPlans = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((plan) => plan.userId === auth.currentUser.uid);

        console.log("Fetched Plans: ", userPlans);
        setPlans(userPlans);
      } catch (error) {
        console.error("Error fetching plans: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handlePlanSelect = (e) => {
    setSelectedPlanId(e.target.value);
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

  // Days of the week in correct order
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  if (!isLoggedIn) {
    return (
      <div>
        <h1 className="h1 text-center mt-5">My Plans</h1>
        <div
          id="exercise-container"
          className="container d-flex flex-column justify-content-center align-items-center"
          style={{ height: "calc(100vh - 250px)" }}
        >
          <p className="text-center mb-3">
            Log in to see saved workout plans.
          </p>
          <Link to="/login" className="btn btn-outline-light">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div id="my-plans-container">
      <h1>My Workout Plans</h1>
      {loading ? (
        <p>Loading plans...</p>
      ) : (
        <>
          <div className="custom-dropdown">
            <select 
              id="plans-dropdown" 
              value={selectedPlanId} 
              onChange={handlePlanSelect} 
            >
              <option value="" disabled>Your Saved Plans ▼</option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {/* EDIT: Display creation date in the dropdown */}
                  {plan.planName} - {plan.createdAt ? new Date(plan.createdAt).toLocaleDateString() : "Unknown"}
                </option>
              ))}
            </select>
          </div>

          {selectedPlan && (
            <div className="plan-container mt-4">
              <h2>{selectedPlan.planName}</h2>
              {daysOfWeek.map((day) => {
                // Check if there's a plan for this day
                const dayPlan = selectedPlan.workoutPlan[day];
                if (dayPlan && dayPlan.length > 0) {
                  return (
                    <div key={day} className="day-section">
                      <h2 className="day-heading">
                        {day} - {selectedPlan.dayLabels[day] || "Rest Day"}
                      </h2>
                      {selectedPlan.dayLabels[day] !== "Rest Day" && (
                        <table className="plans-table">
                          <thead>
                            <tr>
                              <th>Exercise Name</th>
                              <th>Sets</th>
                              <th>Reps</th>
                              <th>Weight</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dayPlan.map((exercise, idx) => (
                              <tr key={idx}>
                                <td>{exercise.name}</td>
                                <td>{exercise.sets}</td>
                                <td>{exercise.reps}</td>
                                <td>{exercise.weight}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  );
                }
                return null;
              })}
              <button className="delete-plan-button" onClick={() => handleDeletePlan(selectedPlan.id)}>
                Delete Plan
              </button>
            </div>
          )}
        </>
      )}

      {/* Overlay for background blur */}
      {showOverlay && <div className="overlay active"></div>}
    </div>
  );
};

export default MyPlans;
