import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { VisibilityRounded, List, Assignment } from '@material-ui/icons';

import styles from './SessionsList.module.css';
import Button from '../Button/Button';

const SessionList = props => {
  const { title, sessions, clientId, userType } = props;

  const clientExersiceMode = (
    <Button actionStyle="exercise">
      <Assignment />
      <p>Exercises</p>
    </Button>
  );

  const proExersiceMode = (
    <Button actionStyle="details">
      <VisibilityRounded />
      <p>Preview</p>
    </Button>
  );

  const renderSessions = sessions => {
    if (!sessions || sessions.length < 1) {
      return 'No sessions';
    }
    return sessions.map(session => (
      <div key={session._id} className={styles.session}>
        <span>{session.title}</span>
        <div className={styles.actionsContainer}>
          <Link
            to={`/session/${session._id}?client=${clientId}&exerciseMode=true`}
          >
            {userType === 'client' ? clientExersiceMode : proExersiceMode}
          </Link>
          {userType === 'pro' && (
            <Link to={`/session/${session._id}?client=${clientId}`}>
              <Button actionStyle="details">
                <List />
                <p>Details</p>
              </Button>
            </Link>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div
      className={
        userType === 'pro' ? styles.sessionList : styles.clientSideSessionList
      }
    >
      <h3 className={styles.headingTitle}>{title}</h3>
      <div>{renderSessions(sessions)}</div>
      {userType === 'pro' && (
        <div className={styles.actionCreateContainer}>
          <Link to={`/session/create?client=${clientId}`}>
            <Button actionStyle="create">Create a new session</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  userType: state.authReducer.user.userType,
});

export default connect(mapStateToProps)(SessionList);
