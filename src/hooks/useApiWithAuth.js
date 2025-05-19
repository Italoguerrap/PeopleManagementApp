import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { refreshToken } from '../services/api';

export function useApiWithAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { logout } = useAuth();

  const callApi = useCallback(
    async (apiCall, args = [], options = {}) => {
      const { 
        showSuccessToast = false, 
        successMessage = 'Operation successful',
        showErrorToast = true,
        handleFieldErrors = true
      } = options;
      
      setLoading(true);
      setError(null);

      try {
        const result = await apiCall(...args);
        
        if (showSuccessToast) {
          toast.success(successMessage);
        }
        
        return result;
      } catch (err) {
        if (err.message === 'Authentication failed' || 
            (err.response && err.response.status === 401)) {
          const refreshed = await refreshToken();
          if (refreshed) {
            try {
              const result = await apiCall(...args);
              return result;
            } catch (retryErr) {
              handleApiError(retryErr, showErrorToast, handleFieldErrors);
              throw retryErr;
            }
          } else {
            logout();
            toast.error('Sua sessão expirou. Por favor, faça login novamente.');
            throw err;
          }
        } else {
          handleApiError(err, showErrorToast, handleFieldErrors);
          throw err;
        }
      } finally {
        setLoading(false);
      }
    },
    [logout]
  );

  const handleApiError = (err, showToast, handleFieldErrors) => {
    setError(err);
    
    if (!showToast) return;
    
    if (err.fieldErrors && handleFieldErrors) {
      if (err.global) {
        toast.error(err.global);
      }
    } else if (err.global) {
      toast.error(err.global);
    } else if (err.message) {
      toast.error(err.message);
    } else {
      toast.error('An unexpected error occurred');
    }
  };

  return {
    callApi,
    loading,
    error,
    setError
  };
}
