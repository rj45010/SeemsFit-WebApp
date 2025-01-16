import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { PrivateRoute } from './utils/authUtils';
import HeaderWithSidebar from './components/Navbar';
import EmptyHeader from './components/EmptyHeader';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import ScrollToTop from './ScrollToTop';
import Home from './components/Home';
import Login from './components/Login';
import GetStarted from './components/GetStarted';
import Features from './components/Features';
import CreatePlan from './components/CreatePlan';
import MyPlans from './components/MyPlans';
import AboutUs from './components/AboutUs';
import Account from './components/Account';
import WorkoutPlans from './components/plans/SeePlans';
import FatToFit from './components/plans/FatToFit';
import ThreeDaysWeek from './components/3day/3DaysWeek';
import ThreeDaysWeek1 from './components/3day/3DayFullBody';
import FourDaysWeek from "./components/4day/4DaysWeek";
import FourDaysWeek1 from './components/4day/4UpperLower';
import FourDaysWeek2 from './components/4day/4Advance';
import FiveDaysWeek from "./components/5day/5DaysWeek";
import FiveDaysWeek1 from './components/5day/5Advance';
import FiveDaysWeek2 from './components/5day/5BFemale';
import SixDaysWeek from './components/6day/6DaysWeek';
import PPLWorkout from './components/6day/PPL6';
import PPLWorkout1 from './components/3day/PPL3';
import PPLWorkout2 from './components/6day/PPL6day';
import HomeLoggedIn from './components/HomeLoggedinPage';
import ForgotPassword from "./components/ForgotPassword";

const hideFooterRoutes = [
  '/my-plan',
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setIsAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div>
        <ScrollToTop />
        <HeaderWithSidebar />
        <EmptyHeader />
        <Content isLoggedIn={isLoggedIn} />
        <ToastContainer />
      </div>
    </Router>
  );
}

const Content = ({ isLoggedIn }) => {
  const location = useLocation();
  const shouldRenderFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <div>
      <Routes>
        <Route path="/" element={isLoggedIn ? <HomeLoggedIn /> : <Home />} />
        <Route path="/home" element={<PrivateRoute><HomeLoggedIn /></PrivateRoute>} />
        <Route path="/features" element={<Features />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/accounts" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/create-plan" element={<CreatePlan />} />
        <Route path="/my-plan" element={<MyPlans />} />
        <Route path="/workout-plans" element={<WorkoutPlans />} />
        <Route path="/ftf" element={<FatToFit />} />
        <Route path="/3day" element={<ThreeDaysWeek />} />
        <Route path="/3day-fullbody" element={<ThreeDaysWeek1 />} />
        <Route path="/4daybeginner" element={<FourDaysWeek />} />
        <Route path="/4day-upper-lower-split" element={<FourDaysWeek1 />} />
        <Route path="/4dayadvance" element={<FourDaysWeek2 />} />
        <Route path="/5daybeginner" element={<FiveDaysWeek />} />
        <Route path="/5dayadvance" element={<FiveDaysWeek1 />} />
        <Route path="/5daybeginnerfemale" element={<FiveDaysWeek2 />} />
        <Route path='/6day' element={<SixDaysWeek />} />
        <Route path='/ppl6Saket' element={<PPLWorkout />} />
        <Route path='/ppl3' element={<PPLWorkout1 />} />
        <Route path='/ppl6day' element={<PPLWorkout2 />} />
      </Routes>
      {shouldRenderFooter && <Footer />}
    </div>
  );
}

export default App;
