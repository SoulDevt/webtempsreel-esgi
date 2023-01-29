import { AppContext } from '../contexts/app-context';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isTokenExpired } from '../helpers';

const RequireAuth = ({ children }) => {
  const { accessToken, setAccessToken } = useContext(AppContext);
  const location = useLocation();
  if (accessToken) {
    if (isTokenExpired(accessToken.exp)) {
      localStorage.removeItem('token');
      setAccessToken(null);
    } else {
      return children;
    }
  }
  return <Navigate to="/login" replace state={{ path: location.pathname }} />;
};

export default RequireAuth;
