import React from 'react';
import classes from './DrawerBurger.module.css';

const DrawerBurger = ({ clicked }) => (
  <div onClick={clicked} className={classes.DrawerBurger}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default DrawerBurger;
