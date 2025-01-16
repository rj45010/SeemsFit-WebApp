import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css";
import logo from '../assests/IMG_3205.png';
import { auth } from "./firebase";
import { useTheme } from './ThemeProvider';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen((prevState) => !prevState);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
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
          ☰
        </button>
        <div className="logo">
          <Link to={isLoggedIn ? "/home" : "/"} className="logo-link">
            <img src={logo} alt="Logo" className="logo-image" />
          </Link>
        </div>
      </header>

      <div className={`dropdown ${isDropdownOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link
              to="/features"
              className="btn btn-outline-none px-3"
              onClick={closeDropdown}
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              to="/about-us"
              className="btn btn-outline-none px-3"
              onClick={closeDropdown}
            >
              About Me
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link
                to="/accounts"
                className="btn btn-outline-none px-3"
                onClick={closeDropdown}
              >
                Account
              </Link>
            </li>
          )}
          <li>
          <button
              className={`toggle-button-theme ${theme}`}
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <>
                  <i className="fas fa-sun"></i> Theme Light
                </>
              ) : (
                <>
                  <i className="fas fa-moon"></i> Theme Dark
                </>
              )}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

