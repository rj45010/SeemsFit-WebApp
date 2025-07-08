import { useContext } from "react";
import { toast } from 'react-toastify';
import {ApiContext} from "../context/apiContext";

export default function useTrackWoroutService() {
  const context = useContext(ApiContext);
  const table = "plans"
if (!context) {
  throw new Error("useTrackWoroutService must be used inside <ApiWrapper>");
}
  const { fetchDocs,updateDocument, setLoading,deleteDocument} = context;
  const getplans = async () => {
    setLoading(true)
    try {
      const userPlans = await fetchDocs(table,10)
      
      const newdata = userPlans.map((doc) => {
        const planData = doc.data();
        const updatedWorkoutPlan = convertWeekdaysToDays(planData.workoutPlan);
        const updatedDayLabels = convertDayLabels(planData.dayLabels);
        return {
          id: doc.id,
          ...planData,
          workoutPlan: updatedWorkoutPlan,
          dayLabels: updatedDayLabels,
        };
      });
      setLoading(false)
      return newdata;
    } catch (error) {
      console.error("Error fetching plans: ", error);
      toast.error("Failed to fetch plans. "+error);
      setLoading(false)
    }
  };
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
  }

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

  const updatePlanData = async(id,data)=>{
    setLoading(true)
    try{
       await updateDocument(table,id,data)
       toast.success("Workout plan updated successfully!", { autoClose: 2000 });
       setLoading(false)
    }catch(e){
      toast.error("There was an error Updating the plan. "+e)
      console.error("Error Updating plan: ", e);
      setLoading(false)
    }
  }

  const deletePlan = async(id)=>{
    setLoading(true)
    try{
        await deleteDocument(id,table)
        toast.success("Plan deleted successfully!", { autoClose: 2000 });
        setLoading(false)
    }catch(e){
         console.error("Error deleting plan: ", e);
         toast.error("There was an error deleting the plan. "+e);
         setLoading(false)
    }
  }

  return {
    getplans,
    updatePlanData,
    deletePlan
  };
}
