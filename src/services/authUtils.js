import { isAuthenticated, refreshToken, logout } from './api';
import { toast } from 'react-toastify';


export async function handleAuthError(response) {
  if (response.status === 401) {
    const refreshSuccess = await refreshToken();
    
    if (!refreshSuccess) {
      logout();
      toast.error("Sua sessão expirou. Por favor, faça login novamente.");
      return true;
    }
    
    return false; 
  }
  
  return false; 
}

export async function withAuth(apiFn, ...args) {
  try {
    if (!isAuthenticated()) {
      logout();
      toast.error("Sua sessão expirou. Por favor, faça login novamente.");
      throw new Error("Not authenticated");
    }
    
    const response = await apiFn(...args);
    return response;
  } catch (error) {
    throw error;
  }
}

export function saveUserPreference(cpf, remember) {
  if (remember) {
    localStorage.setItem("rememberedUser", cpf);
  } else {
    localStorage.removeItem("rememberedUser");
  }
}


export function getRememberedUser() {
  return localStorage.getItem("rememberedUser");
}
