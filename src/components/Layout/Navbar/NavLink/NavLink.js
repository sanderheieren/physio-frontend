import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavLink.module.css';

const NavItem = ({ link, exact, children }) => {
  let attachedClasses = classes.NavLink;

  return (
    <li className={attachedClasses}>
      <NavLink exact={exact} to={link} activeClassName={classes.activeLink}>
        {children}
      </NavLink>
    </li>
  );
};

export default NavItem;
