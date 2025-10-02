import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import style from './Header.module.css';
import { useLocation } from 'react-router';

const Header = () => {
  const location = useLocation();
  const [title, setTitle] = useState('Todo List');

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setTitle('Todo List');
        break;
      case '/about':
        setTitle('About');
        break;
      case '/*':
        setTitle('Not Found');
        break;
      default:
        setTitle('Not Found');
        break;
    }
  }, [location]);

  return (
    <div>
      <h1>{title}</h1>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? style.active : style.inActive
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? style.active : style.inActive
          }
        >
          About
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
