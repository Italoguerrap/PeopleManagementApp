import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function ProtectedRoute({ component: Component, redirectTo = '/auth', ...rest }) {
  const { isLoggedIn } = useAuth();
  
  return isLoggedIn ? (
    <Component {...rest} />
  ) : (
    <Navigate to={redirectTo} replace />
  );
}

export function AuthOnlyRoute({ component: Component, redirectTo = '/', ...rest }) {
  const { isLoggedIn } = useAuth();
  
  return !isLoggedIn ? (
    <Component {...rest} />
  ) : (
    <Navigate to={redirectTo} replace />
  );
}
