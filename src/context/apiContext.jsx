import { useState, useEffect, createContext } from "react";
import {
  db,
  collection,
  getDocs,
  auth,
  deleteDoc,
  doc,
  updateDoc,
} from "../components/firebase";
import { query, where, limit } from "firebase/firestore";

const ApiContext = createContext(null);

const ApiWrapper = ({ children }) => {
  const [user, setUser] = useState(auth.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(!!auth.currentUser);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      setUser(user);
    });

    return () => unsubscribe();
  }, []);
  const isLogin = () => !!auth.currentUser;

  const fetchDocs = async (table,lim) => {
    if (!isLogin()) {
      throw new Error("User not logged in");
    }
    try {
    const plansQuery = query(
                collection(db, table),
                where("userId", "==", user.uid),
                limit(lim)
        );
      const querySnapshot = await getDocs(plansQuery);
      const userPlans = querySnapshot.docs;
      return userPlans;
    } catch (e) {
      throw new Error(e + "Something went wrong");
    }
  };

  const updateDocument = async (table, id, data) => {
    if (!isLogin()) {
      throw new Error("User not logged in");
    }
    try {
      await updateDoc(doc(db, table, id), data);
    } catch (e) {
      throw new Error(e + "Something Went wrong");
    }
  };
  const deleteDocument = async (id,table) => {
    if(!isLogin()){
         throw new Error("User needs to Log in again");
    }
    try {
         await deleteDoc(doc(db, table , id));
    } catch (e) {
      throw new Error(e + "Something went wrong");
    }
  };
  const contextValue = {
    fetchDocs,
    user,
    isLogin,
    isLoggedIn,
    loading,
    updateDocument,
    setLoading,
    deleteDocument
  };

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
};

export { ApiWrapper, ApiContext };
