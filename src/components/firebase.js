// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc, 
  getDoc, 
  enableIndexedDbPersistence 
} from "firebase/firestore";
import { toast } from "react-toastify"; // For user notifications

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyyxYn4znZ4Wap1KuGSQDUJCWbE05T4vA",
  authDomain: "seemsfit-login.firebaseapp.com",
  projectId: "seemsfit-login",
  storageBucket: "seemsfit-login.firebasestorage.app",
  messagingSenderId: "63838699450",
  appId: "1:63838699450:web:688c401104ff6c294b6783"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth(app);

// Firestore database
export const db = getFirestore(app);

// Enable offline persistence for Firestore
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    console.error("Multiple tabs open, persistence can only be enabled in one tab.");
  } else if (err.code === "unimplemented") {
    console.error("Persistence is not available in this browser.");
  } else {
    console.error("Firestore persistence failed: ", err);
  }
});

// Helper function to get the cached user
export const getCachedUser = () => auth.currentUser;

// Firebase Firestore functions
export {
  app,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc
};

// Function to delete a plan from Firestore with error handling
export const deleteWorkoutPlan = async (planId) => {
  try {
    await deleteDoc(doc(db, "plans", planId)); // Delete the plan document by its ID
    console.log(`Plan with ID: ${planId} deleted successfully`);
    toast.success("Workout plan deleted successfully!");
  } catch (e) {
    console.error("Error deleting plan: ", e);
    toast.error("Failed to delete the workout plan. Try again later.");
    throw e;
  }
};

// Function to add a new plan to Firestore
export const addWorkoutPlan = async (planData) => {
  try {
    const docRef = await addDoc(collection(db, "plans"), planData);
    console.log("Workout plan added with ID: ", docRef.id);
    toast.success("Workout plan added successfully!");
    return docRef.id;
  } catch (e) {
    console.error("Error adding plan: ", e);
    toast.error("Failed to add the workout plan. Try again later.");
    throw e;
  }
};

// Function to fetch all plans from Firestore
export const fetchWorkoutPlans = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "plans"));
    const plans = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Fetched plans: ", plans);
    return plans;
  } catch (e) {
    console.error("Error fetching plans: ", e);
    toast.error("Failed to fetch workout plans. Try again later.");
    throw e;
  }
};

// Function to update a plan in Firestore
export const updateWorkoutPlan = async (planId, updatedData) => {
  try {
    await updateDoc(doc(db, "plans", planId), updatedData);
    console.log(`Plan with ID: ${planId} updated successfully`);
    toast.success("Workout plan updated successfully!");
  } catch (e) {
    console.error("Error updating plan: ", e);
    toast.error("Failed to update the workout plan. Try again later.");
    throw e;
  }
};

// Function to fetch a specific plan by ID
export const fetchWorkoutPlanById = async (planId) => {
  try {
    const docRef = doc(db, "plans", planId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Fetched plan data: ", docSnap.data());
      return { id: planId, ...docSnap.data() };
    } else {
      console.error("No such plan exists!");
      toast.error("Workout plan not found.");
      return null;
    }
  } catch (e) {
    console.error("Error fetching plan by ID: ", e);
    toast.error("Failed to fetch the workout plan. Try again later.");
    throw e;
  }
};
