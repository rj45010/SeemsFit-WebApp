import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/SeePlans.css';

const Dropdown = () => {
  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null); 

  const dropdownRef = useRef(null);

  // Toggle main menu
  const toggleMainMenu = () => {
    setIsMainMenuOpen(prevState => !prevState);
    console.log("Main Menu Open: ", !isMainMenuOpen);
  };

  // Handle submenu toggling
  const toggleSubmenu = (submenuId) => {
    setActiveSubmenu(prevState => (prevState === submenuId ? null : submenuId));
    console.log("Active Submenu: ", submenuId);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMainMenuOpen(false);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="container dropdown-container" ref={dropdownRef}>
      <br />
      <h1 className="h1 text-center">Workout Plans</h1>
      {/* Main Menu Toggle */}
      <button className="form-select text-center select-plan" onClick={toggleMainMenu}>
        Browse Plans
      </button>
      <br />

      {/* Main Menu */}
      <ul className={`dropdown-menu ${isMainMenuOpen ? 'show' : ''}`}>
        {/* Menu Option */}
        <li>
          <Link className="btn px-3 main-dropdown-item" to="/ftf">
            Fat To Fit
          </Link>
        </li>

        {/* 3 Day Workout Plans */}
        <li>
          <button className="btn px-3 main-dropdown-item" onClick={() => toggleSubmenu(1)}>
            3 Day Workout Plans
          </button>
          {activeSubmenu === 1 && (
            <ul className="submenu">
              <li>
                <Link className="btn text-black px-3" to="/3day">
                  3 Days Week Schedule
                </Link>
              </li>
              <li>
                <Link className="btn text-black px-3" to="/3day-fullbody">
                  3 Days Week (Full Body Strength)
                </Link>
              </li>
              <li>
                <Link className="btn text-black px-3" to="/ppl3">
                  3 Day Push Pull Legs
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* 4 Day Workout Plans */}
        <li>
          <button className="btn px-3 main-dropdown-item" onClick={() => toggleSubmenu(2)}>
            4 Day Workout Plans
          </button>
          {activeSubmenu === 2 && (
            <ul className="submenu">
              <li>
                <Link className="btn text-black px-3" to="/4daybeginner">
                  4 Days Week (Beginner)
                </Link>
              </li>
              <li>
                <Link className="btn text-black px-3" to="/4dayadvance">
                  4 Days Week (Inter and Adv)
                </Link>
              </li>
              <li>
                <Link className="btn text-black px-3" to="/4day-upper-lower-split">
                  4 Days a Week (Upper/Lower Split)
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* 5 Day Workout Plans */}
        <li>
          <button className="btn px-3 main-dropdown-item" onClick={() => toggleSubmenu(3)}>
            5 Day Workout Plans
          </button>
          {activeSubmenu === 3 && (
            <ul className="submenu">
              <li>
                <Link className="btn text-black px-3" to="/5daybeginner">
                  5 Days Week (Beginner)
                </Link>
              </li>
              <li>
                <Link className="btn text-black px-3" to="/5dayadvance">
                  5 Days Week (Inter and Adv)
                </Link>
              </li>
              <li>
                <Link className="btn text-black px-3" to="/5daybeginnerfemale">
                  5 Days Week (Female Beginner)
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* 6 Day Workout Plans */}
        <li>
          <button className="btn px-3 main-dropdown-item" onClick={() => toggleSubmenu(4)}>
            6 Day Workout Plans
          </button>
          {activeSubmenu === 4 && (
            <ul className="submenu">
              <li>
                <Link className="btn text-black px-3" to="/ppl6day">
                  6 Day Push Pull Legs
                </Link>
              </li>
              <li>
                <Link className="btn text-black px-3" to="/ppl6Saket">
                6 Day PPL (Saket Gokhale)
                </Link>
              </li>
              <li>
                <Link className="btn text-black px-3" to="/6day">
                6 Days Week
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;