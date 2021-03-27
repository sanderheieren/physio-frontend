import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import styles from './Layout.module.css';
import Spinner from '../Spinner/Spinner';
import SideDrawer from './Navbar/SideDrawer/SideDrawer';

import * as errorActions from '../../redux/actions/errors';

const Layout = (props) => {
  const { type } = props;
  const location = useLocation();
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    if (
      location.pathname === '/login' ||
      location.pathname === '/signup' ||
      location.pathname === '/exercise/create' ||
      location.pathname === '/session/create'
    ) {
      props.cleanFormError();
    }
  }, [location.pathname]);

  const showDrawerHandler = () => {
    setShowDrawer(prevState => !prevState);
  };
  return (
    <div className={styles.app}>
      <Navbar open={showDrawer} toggleDrawer={showDrawerHandler} />
      <SideDrawer open={showDrawer} clicked={showDrawerHandler} />
      <main className={type === 'text' ? styles.textPage : styles.main}>
        {props.isLoading ? <Spinner /> : props.children}
      </main>

      <Footer />
    </div>
  );
};

const mapStateToPros = (state) => {
  return {
    isLoading: state.authReducer.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    cleanFormError: () => dispatch(errorActions.cleanFormError()),
  };
};

export default connect(mapStateToPros, mapDispatchToProps)(Layout);
