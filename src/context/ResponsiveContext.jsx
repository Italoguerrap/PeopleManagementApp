import React, { createContext, useContext, useState, useEffect } from "react";

const ResponsiveContext = createContext({
  isMobile: false,
  isTablet: false,
  isLandscape: false,
});

const BREAKPOINTS = {
  mobile: 425,
  tablet: 768,
};

export const ResponsiveProvider = ({ children }) => {
  const [state, setState] = useState({
    isMobile: false,
    isTablet: false,
    isLandscape: window.innerWidth > window.innerHeight,
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      setState({
        isMobile: width <= BREAKPOINTS.mobile,
        isTablet: width > BREAKPOINTS.mobile && width <= BREAKPOINTS.tablet,
        isLandscape: window.innerWidth > window.innerHeight,
      });
    };

    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    window.addEventListener("orientationchange", updateDimensions);

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

export const useResponsive = () => useContext(ResponsiveContext);

export default ResponsiveContext;
