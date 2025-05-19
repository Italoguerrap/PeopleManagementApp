import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { isAuthenticated, logout, refreshToken } from "../services/api";
import { toast } from "react-toastify";

const AuthContext = createContext({
  isLoggedIn: false,
  userCpf: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userCpf, setUserCpf] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const getTimeUntilRefresh = () => {
    const expiration = localStorage.getItem("tokenExpiration");
    if (!expiration) return null;
    
    const expirationDate = new Date(expiration);
    const now = new Date();
    
    const refreshTime = new Date(expirationDate);
    refreshTime.setMinutes(refreshTime.getMinutes() - 5);
    
    const timeUntilRefresh = refreshTime.getTime() - now.getTime();
    return Math.max(timeUntilRefresh, 0);
  };

  const handleTokenRefresh = useCallback(async () => {
    if (refreshing) return;
    
    try {
      setRefreshing(true);
      const success = await refreshToken();
      
      if (success) {
        scheduleTokenRefresh();
      } else {
        handleLogout();
        toast.error("Sua sessão expirou. Por favor, faça login novamente.");
      }
    } catch (error) {
      handleLogout();
    } finally {
      setRefreshing(false);
    }
  }, [refreshing]);

  const scheduleTokenRefresh = useCallback(() => {
    const timeUntilRefresh = getTimeUntilRefresh();
    
    if (timeUntilRefresh === null) return;
    
    const refreshTimer = setTimeout(() => {
      handleTokenRefresh();
    }, timeUntilRefresh);
    
    return refreshTimer;
  }, [handleTokenRefresh]);

  useEffect(() => {
    const checkAuth = () => {
      const authed = isAuthenticated();
      setIsLoggedIn(authed);
      setUserCpf(localStorage.getItem("userCpf"));
      
      if (authed) {
        const refreshTimer = scheduleTokenRefresh();
        return () => {
          if (refreshTimer) clearTimeout(refreshTimer);
        };
      }
    };

    const authCheckResult = checkAuth();
    
    const interval = setInterval(() => {
      const authed = isAuthenticated();
      if (isLoggedIn !== authed) {
        setIsLoggedIn(authed);
        if (!authed) {
          setUserCpf(null);
          toast.error("Sua sessão expirou. Por favor, faça login novamente.");
        }
      }
    }, 60000);

    return () => {
      clearInterval(interval);
      if (authCheckResult && typeof authCheckResult === 'function') {
        authCheckResult();
      }
    };
  }, [isLoggedIn, scheduleTokenRefresh]);

  const handleLogin = (authData) => {
    setIsLoggedIn(true);
    setUserCpf(authData.cpf);
    scheduleTokenRefresh();
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUserCpf(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userCpf,
        login: handleLogin,
        logout: handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
