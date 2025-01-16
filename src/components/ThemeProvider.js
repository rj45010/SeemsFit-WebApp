import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    document.body.classList.add(savedTheme);
    document.body.classList.remove(savedTheme === "light" ? "dark" : "light");
  }, []); 

  useEffect(() => {
    if (theme) {
      // Update the theme and localStorage whenever it changes
      localStorage.setItem("theme", theme);
      // Apply the theme to the body
      document.body.classList.remove("light", "dark");
      document.body.classList.add(theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* Only render children when theme is set */}
      {theme && <div className={theme}>{children}</div>}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
