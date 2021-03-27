import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './LoggedInAs.module.css';

const LoggedInAs = ({ user, comp, isAuth }) => {
  const attachedStyles =
    comp === 'SideDrawer'
      ? [styles.colorDark, styles.navNameContainerSideDrawer]
      : [styles.colorLight];
  return (
    isAuth && (
      <Link to="/account">
        <div className={[styles.navNameContainer, ...attachedStyles].join(' ')}>
          <div className={styles.navNameSmall}>Logged in as</div>
          <div className={styles.navName}>{user.name}</div>
        </div>
      </Link>
    )
  );
};
const mapStateToPros = state => {
  return {
    user: state.authReducer.user,
    isAuth: state.authReducer.isAuth,
  };
};
export default connect(mapStateToPros)(LoggedInAs);
