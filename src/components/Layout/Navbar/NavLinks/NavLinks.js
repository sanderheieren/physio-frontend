import React from 'react';
import { ExitToApp } from '@material-ui/icons';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import NavLink from '../NavLink/NavLink';
import classes from './NavLinks.module.css';
import links from '../links';

import * as authActions from '../../../../redux/actions/auth';

const NavLinks = ({ isAuth, logout }) => {
  const history = useHistory();

  let navLinks;
  if (isAuth) {
    navLinks = links.authorized.map(l => (
      <NavLink key={l.text} link={l.path}>
        {l.text}
      </NavLink>
    ));
  }
  if (!isAuth) {
    navLinks = links.notAuthorized.map(l => (
      <NavLink key={l.text} exact={l.exact} link={l.path}>
        {l.text}
      </NavLink>
    ));
  }

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  const logoutBtnSideBar = isAuth && (
    <li onClick={handleLogout} className={classes.exitToAppSideBar}>
      Logout <ExitToApp />
    </li>
  );
  const logoutBtnTopNav = isAuth && (
    <li onClick={handleLogout} className={classes.exitToAppNavBar}>
      <ExitToApp />
      <p>LOGOUT</p>
    </li>
  );

  return (
    <div className={classes.NavbarContainer}>
      <ul className={classes.NavLinks}>
        {navLinks}
        {logoutBtnSideBar}
        {logoutBtnTopNav}
      </ul>
    </div>
  );
};

const mapStateToPros = state => {
  return {
    isAuth: state.authReducer.isAuth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authActions.logout()),
    // cleanFormError: () => dispatch(errorActions.cleanFormError()),
  };
};
export default connect(mapStateToPros, mapDispatchToProps)(NavLinks);
