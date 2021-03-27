import React from 'react';
import classes from './Backdrop.module.css';

const Backdrop = ({ show, clicked, modal }) => {
  let attachedClasses = [classes.Backdrop];
  if (!modal) {
    attachedClasses.push(classes.sidebar);
  }
  return show ? (
    <div className={attachedClasses.join(' ')} onClick={clicked}></div>
  ) : null;
};
export default Backdrop;
