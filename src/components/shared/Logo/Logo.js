import React from 'react';
import classes from './Logo.module.css';
import { Link } from 'react-router-dom';

import SvgLogo from './SvgLogo';

const Logo = ({ comp, link }) => {
  let attachedClasses = classes.Logo;

  if (comp) {
    attachedClasses = [classes.Logo, classes[comp]].join(' ');
  }
  if (link) {
    return (
      <div className={attachedClasses}>
        <Link to={link}>
          <SvgLogo />
        </Link>
      </div>
    );
  }

  return (
    <div className={attachedClasses}>
      <SvgLogo />
    </div>
  );
};

export default Logo;
