import { handleAuthError } from './authUtils';

export function withAuthHandling(apiCall) {
  return async function(...args) {
    try {
      const response = await apiCall(...args);
      
      if (response.status === 401) {
        const handled = await handleAuthError(response);
        if (handled) {
          throw new Error("Authentication failed");
        } else {
          return apiCall(...args);
        }
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  };
}


export async function protectedFetch(url, options = {}) {
  const token = localStorage.getItem("accessToken");
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
  
  const response = await fetch(url, {
    ...options,
    headers
  });
  
  if (response.status === 401) {
    const handled = await handleAuthError(response);
    if (handled) {
      throw new Error("Authentication failed");
    } else {
      // Token was refreshed, retry the call
      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
    }
  }
  
  return response;
}
