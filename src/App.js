import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import {
  Home,
  About,
  Login,
  Signup,
  Dashboard,
  Session,
  Account,
  Client,
  Exercise,
  CreateSession,
  Invite,
  CreateExercise,
} from './pages';

import * as actions from './redux/actions/auth';

const App = props => {
  const { tryToAutoLog, userType } = props;
  useEffect(() => {
    tryToAutoLog();
  }, [tryToAutoLog]);

  const { isAuth } = props;
  let routes = (
    <Switch>
      <Route exact path="/" component={props => <Home {...props} />} />
      <Route path="/about" component={props => <About {...props} />} />
      <Route path="/login" component={props => <Login {...props} />} />
      <Route path="/signup" component={props => <Signup {...props} />} />
      {/* <Redirect to="/" /> */}
    </Switch>
  );

  if (isAuth && userType === 'client') {
    routes = (
      <Switch>
        <Route exact path="/" component={props => <Home {...props} />} />
        <Route path="/about" component={props => <About {...props} />} />
        <Route
          path="/dashboard"
          component={props => <Dashboard {...props} />}
        />
        <Route path="/account" component={props => <Account {...props} />} />
        <Route path="/session/:id" children={props => <Session {...props} />} />
        <Route
          path="/exercise/:id"
          children={props => <Exercise {...props} />}
        />
        <Redirect to="/dashboard" />
      </Switch>
    );
  }
  if (isAuth && userType === 'pro') {
    routes = (
      <Switch>
        <Route exact path="/" component={props => <Home {...props} />} />
        <Route path="/about" component={props => <About {...props} />} />
        <Route
          path="/dashboard"
          component={props => <Dashboard {...props} />}
        />
        <Route path="/account" component={props => <Account {...props} />} />
        <Route
          exact
          path="/session/create"
          children={props => <CreateSession {...props} />}
        />
        <Route
          exact
          path="/exercise/create"
          children={props => <CreateExercise {...props} />}
        />
        <Route path="/session/:id" children={props => <Session {...props} />} />
        <Route
          path="/exercise/:id"
          children={props => <Exercise {...props} />}
        />
        <Route path="/client/:id" children={props => <Client {...props} />} />
        <Route path="/invite" component={props => <Invite {...props} />} />
        <Redirect to="/dashboard" />
      </Switch>
    );
  }

  return routes;
};

const mapStateToPros = state => {
  return {
    isAuth: state.authReducer.isAuth,
    userType: state.authReducer.user?.userType,
  };
};
const mapDispatchToPros = dispatch => {
  return {
    tryToAutoLog: () => dispatch(actions.tryToAutoLog()),
  };
};

export default connect(mapStateToPros, mapDispatchToPros)(App);
