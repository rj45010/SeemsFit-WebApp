// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "****",
  authDomain: "****",
  projectId: "****",
  storageBucket: "****",
  messagingSenderId: "****",
  appId: "****"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth();

// Firestore database
export const db = getFirestore(app);

// Firebase Firestore functions
export {
  app,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc
};

// Function to delete a plan from Firestore
export const deleteWorkoutPlan = async (planId) => {
  try {
    await deleteDoc(doc(db, "plans", planId)); // Delete the plan document by its ID
    console.log(`Plan with ID: ${planId} deleted successfully`);
  } catch (e) {
    console.error("Error deleting plan: ", e);
    throw e;
  }
};
