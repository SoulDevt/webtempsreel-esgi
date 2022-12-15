import { NavLink, useNavigate } from 'react-router-dom';
import { useCallback, useContext } from 'react';
import { AppContext } from '../contexts/app-context';

const Nav = () => {
  const activeStyle = {
    textDecoration: 'underline'
  };

  const { accessToken, setAccessToken } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = useCallback((e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAccessToken(null);
    navigate('/login');
  }, [accessToken]);

  return (
    <nav className="bg-white dark:bg-slate-800 w-full h-14">
      <ul className="flex items-center h-full">
        <li className="p-5">
          <NavLink
            to="/"
            className={'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Accueil
          </NavLink>
        </li>
        {accessToken ? (
          <>
            <li className="p-5">
              <NavLink
                to="/admin/notification"
                className={'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                Notification
              </NavLink>
            </li>
            <li className="p-5">
              <button
                onClick={logout}
                className={'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="p-5">
              <NavLink
                to="/login"
                className={'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                Login
              </NavLink>
            </li>
            <li className="p-5">
              <NavLink
                to="/register"
                className={'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}>
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
