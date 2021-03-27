import React from 'react';

import NavLinks from '../NavLinks/NavLinks';
import Logo from '../../../shared/Logo/Logo';
import SvgLogo from '../../../shared/Logo/SvgLogo';
import Backdrop from '../../../shared/Backdrop/Backdrop';
import LoggedInAs from '../LoggedInAs/LoggedInAs';
import classes from './SideDrawer.module.css';

const SideDrawer = ({ open, clicked }) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <React.Fragment>
      <Backdrop show={open} clicked={clicked} />
      <div onClick={clicked} className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <SvgLogo />
        </div>
        <LoggedInAs comp="SideDrawer" />
        <nav>
          <NavLinks />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
