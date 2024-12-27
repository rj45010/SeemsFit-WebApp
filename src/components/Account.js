import React, { useState, useEffect } from "react"; 
import { auth, db } from "./firebase";
import { doc, deleteDoc, collection, query, where, getDocs, getDoc } from "firebase/firestore"; 
import { deleteUser } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import './css/Account.css';  

const Account = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate(); 

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true); 
        
        // Fetch the user's document reference
        const docRef = doc(db, "Users", user.uid);
        
        // Use getDoc instead of getDocs for fetching a single document
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log("User data not found in Firestore.");
        }
      } else {
        setIsLoggedIn(false); 
        console.log("No user is logged in.");
      }
    });
  };
  

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsLoggedIn(false);
      navigate("/"); 
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const handleSignIn = () => {
    navigate("/login");
  };
  
  const handleDeleteAccount = async () => {
    setShowOverlay(true);
    const user = auth.currentUser;
    if (user) {
      const toastId = toast(
        <div>
          <p>This will delete your account and your saved plans. Do you want to proceed?</p>
          <div className="d-flex justify-content-center align-items-center gap-5">
            <button 
              className="account-toast-button-yes"
              onClick={async () => {
                try {
                  // Delete user data from Firestore
                  const userRef = doc(db, "Users", user.uid);
                  await deleteDoc(userRef);
  
                  // Delete all plans associated with the user
                  const plansRef = collection(db, "plans");
                  const plansQuery = query(plansRef, where("userId", "==", user.uid));
                  const querySnapshot = await getDocs(plansQuery); // Use getDocs instead of getDoc
                  querySnapshot.forEach(async (doc) => {
                    await deleteDoc(doc.ref); // Delete each plan
                  });
  
                  // Delete the user from Firebase Auth
                  await deleteUser(user);
  
                  // Log out the user and redirect
                  await auth.signOut();
                  setIsLoggedIn(false);
                  navigate("/");
  
                  toast.success("Account and plans deleted successfully!", {
                    position: "top",
                    autoClose: 2000,
                  });
                } catch (error) {
                  console.error("Error deleting account and plans:", error);
                  toast.error("There was an error deleting your account and plans.", {
                    position: "top",
                    autoClose: 2000,
                  });
                } finally {
                  toast.dismiss(toastId);
                  setShowOverlay(false);
                }
              }}
            >
              Yes
            </button>
            <button 
              className="account-toast-button-no"
              onClick={() => {
                toast.dismiss(toastId);
                setShowOverlay(false);
              }}
            >
              No
            </button>
          </div>
        </div>,
        {
          position: "top-center", // Corrected toast position usage
          autoClose: false,
          closeOnClick: false,
          hideProgressBar: true,
          draggable: false,
          closeButton: false,
        }
      );
    }
  };
  
  return (
    <div className="page-content page-container account-page" id="page-content">
      <div className="padding">
        <div className="row container d-flex justify-content-center">
          <div className="col-xl-6 col-md-12">
            <div className="card user-card-full">
              <div className="row m-l-0 m-r-0">
                <div className="col-sm-4 bg-c-lite-green user-profile">
                  <div className="card-block text-center text-white">
                    <h6 className="f-w-600">Hello, {userDetails ? userDetails.firstName : "Loading..."}</h6>
                    <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="card-block">
                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Email</p>
                        <h6 className="text-muted f-w-400">{userDetails ? userDetails.email : "Loading..."}</h6>
                      </div>
                    </div>
                    {/* more details will come here if we decided to add */}
                    {isLoggedIn ? (
                      <div className="d-flex justify-content-between">
                      <button className="btn btn-primary mt-4 btn-sm" onClick={handleLogout}>
                        Logout
                      </button>
                      <button className="btn btn-danger mt-4 btn-sm" onClick={handleDeleteAccount}>
                        Delete Account
                      </button>
                    </div>                    
                    ) : (
                      <button className="btn btn-primary mt-4 btn-sm" onClick={handleSignIn}>
                        Sign In
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showOverlay && <div className="overlay active"></div>}
    </div>
  );
};

export default Account;
