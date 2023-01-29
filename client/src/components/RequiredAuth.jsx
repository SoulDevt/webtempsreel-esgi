import { AppContext } from '../contexts/app-context';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isTokenExpired } from '../helpers';
import { toast } from 'react-toastify';
import { Loader } from '../components';

const RequireAuth = ({ children }) => {
  const { accessToken, loading, setAccessToken } = useContext(AppContext);
  const location = useLocation();
  if (!loading) {
    if (accessToken) {
      if (isTokenExpired(accessToken.exp)) {
        localStorage.removeItem('token');
        setAccessToken(null);
        toast.error('Your session has expired, please login again');
      } else {
        if (accessToken.isAdmin) {
          return children;
        } else {
          toast.error('You must be an admin to access this page');
        }
      }
    } else {
      toast.error('You must be logged in to access this page');
    }
    return <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }
  return <Loader />;
};

export default RequireAuth;
