import { NavLink } from 'react-router-dom';

const Nav = () => {
  let activeStyle = {
    textDecoration: 'underline'
  };

  let activeClassName = 'underline';

  return (
    <nav className="bg-white dark:bg-slate-800 w-full h-14">
      <ul className="flex items-center h-full pl-5">
        <li className="p-5">
          <NavLink
            to="/"
            className={'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Accueil
          </NavLink>
        </li>
        <li className="p-">
          <NavLink
            to="/login"
            className={'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Login
          </NavLink>
        </li>
        <li className="p-5">
          <NavLink
            to="/test"
            className={'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}>
            Test
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
