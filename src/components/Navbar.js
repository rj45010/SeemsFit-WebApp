import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";
import logo from '../assests/logo_img.PNG';
import { auth } from "./firebase";
import { useTheme } from './ThemeProvider';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubDropdownOpen, setIsSubDropdownOpen] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate(); 

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen((prevState) => !prevState);
  };

  const toggleSubDropdown = () => {
    setIsSubDropdownOpen((prevState) => !prevState); // Toggle sub-dropdown
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    setIsSubDropdownOpen(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (!e.target.closest(".dropdown") && !e.target.closest(".toggle-button")) {
      closeDropdown();
    }
  };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsLoggedIn(false); // Update login status
      closeDropdown(); // Close the dropdown
      navigate("/"); // Navigate to the home page
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };  
  
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  return (
    <div className="fixed">
      <header className="home-header">
        <button
          className="toggle-button"
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="logo">
          <Link to={isLoggedIn ? "/home" : "/"} className="logo-link">
            <img src={logo} alt="Logo" className="logo-image" />
          </Link>
        </div>
        <button
          className={`toggle-button-theme ${theme}`}
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <i className="fas fa-moon"></i>
          ) : (
            <i className="fas fa-sun"></i>
          )}
        </button>
      </header>

      <div className={`dropdown ${isDropdownOpen ? "open" : ""}`}>
        <ul>
          <li>
            <button
              className="header-button btn btn-outline-none px-3 mb-2"
              onClick={(e) => { e.stopPropagation(); toggleSubDropdown(); }}
            >
              Features
              <span
                className={`toggle-arrow ${
                  isSubDropdownOpen ? "open" : "closed"
                }`}
              >
                ▶
              </span>
            </button>
            {isSubDropdownOpen && (
              <ul className="sub-dropdown">
                <li>
                  <button
                    className="btn text-black px-3 mb-2"
                    onClick={() => { navigate("/create-plan"); closeDropdown(); }}
                  >
                    <i className="fas fa-pencil-alt"></i>Create Workout
                  </button>
                </li>
                <li>
                  <button
                    className="btn text-black px-3 mb-2"
                    onClick={() => { navigate("/workout-plans"); closeDropdown(); }}
                  >
                    <i className="fas fa-search"></i>Browse Workout Plans
                  </button>
                </li>
                <li>
                  <button
                    className="btn text-black px-3 mb-2"
                    onClick={() => { navigate("/my-plan"); closeDropdown(); }}
                  >
                    <i className="fas fa-chart-line"></i>Track Workout
                  </button>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              className="header-button btn btn-outline-none px-3 mb-2"
              onClick={() => { navigate("/about-us"); closeDropdown(); }}
            >
              About Me
            </button>
          </li>
          {isLoggedIn && (
            <li>
              <button
                className="header-button btn btn-outline-none px-3 mb-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;

