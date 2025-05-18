// Responsivity context to provide device information throughout the app
import React, { createContext, useContext, useState, useEffect } from "react";

// Create context for device type information
const ResponsiveContext = createContext({
  isMobile: false,
  isTablet: false,
  isLandscape: false,
});

// Breakpoints matching our responsive.js file
const BREAKPOINTS = {
  mobile: 425,
  tablet: 768,
};

export const ResponsiveProvider = ({ children }) => {
  // Initialize responsive state
  const [state, setState] = useState({
    isMobile: false,
    isTablet: false,
    isLandscape: window.innerWidth > window.innerHeight,
  });

  useEffect(() => {
    // Function to update state based on window dimensions
    const updateDimensions = () => {
      const width = window.innerWidth;
      setState({
        isMobile: width <= BREAKPOINTS.mobile,
        isTablet: width > BREAKPOINTS.mobile && width <= BREAKPOINTS.tablet,
        isLandscape: window.innerWidth > window.innerHeight,
      });
    };

    // Initialize state
    updateDimensions();

    // Add resize listener
    window.addEventListener("resize", updateDimensions);
    window.addEventListener("orientationchange", updateDimensions);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("orientationchange", updateDimensions);
    };
  }, []);

  return (
    <ResponsiveContext.Provider value={state}>
      {children}
    </ResponsiveContext.Provider>
  );
};

// Custom hook to use the responsive context
export const useResponsive = () => useContext(ResponsiveContext);

export default ResponsiveContext;
