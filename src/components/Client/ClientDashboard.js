import React from 'react';
import { connect } from 'react-redux';
import SessionList from '../SessionList/SessionList';
import classes from './ClientDashboard.module.css';

const ClientDashboard = props => {
  const { sessions, user } = props;

  return (
    <div className={classes.clientDashWrapper}>
      <div className={classes.clientWrapper}>
        <h1 className={classes.headingTitle}>Hi {user.name}!</h1>
        <SessionList
          title="Sessions:"
          sessions={sessions}
          clientId={user._id}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  sessions: state.authReducer.user.sessions,
  user: state.authReducer.user,
});

export default connect(mapStateToProps)(ClientDashboard);
