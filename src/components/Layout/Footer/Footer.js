import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>
        &copy; 2020 Loopers | <u>Terms and Conditions</u> |{' '}
        <u>Privacy Policy</u>
      </p>
    </div>
  );
};

export default Footer;
