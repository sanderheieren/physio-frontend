import React from 'react';
import { ArrowBack, Menu, Close } from '@material-ui/icons';
import { connect } from 'react-redux';

import { useHistory, useLocation } from 'react-router-dom';

import Logo from '../../shared/Logo/Logo';
import styles from './Navbar.module.css';
import links from './links';
import NavLinks from './NavLinks/NavLinks';
import LoggedInAs from './LoggedInAs/LoggedInAs';

import * as authActions from '../../../redux/actions/auth';
import * as errorActions from '../../../redux/actions/errors';
import classes from './Navbar.module.css';


const Navbar = (props) => {
  const location = useLocation();
  const history = useHistory();

  const goToPrevPage = () => {
    Object.keys(props.formErrors).length !== 0 && props.cleanFormError('');
    history.goBack();
  };

  const link = props.isAuth ? '/dashboard' : '/';

  return (
    <div className={styles.navbarContainer}>
      {props.isAuth && (
        <div className={classes.goBack} onClick={goToPrevPage}>
          <ArrowBack />
          <p>GO BACK</p>
        </div>
      )}
      <LoggedInAs />
      {location.pathname !== '/' && location.pathname !== '/about' && (
        <Logo comp="Navbar" link={link} />
      )}
      <nav className={styles.DesktopOnly}>
        <NavLinks links={links} />
      </nav>
      <div className={styles.burger} onClick={props.toggleDrawer}>
        {props.open ? <Close /> : <Menu />}
      </div>
    </div>
  );
};

const mapStateToPros = state => {
  return {
    isAuth: state.authReducer.isAuth,
    session: state.sessionReducer,
    formErrors: state.errorReducer.formErrors,
    user: state.authReducer.user,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(authActions.logout()),
    cleanFormError: () => dispatch(errorActions.cleanFormError()),
  };
};

export default connect(mapStateToPros, mapDispatchToProps)(Navbar);
