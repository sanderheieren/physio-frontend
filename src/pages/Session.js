import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Layout from '../components/Layout/Layout';
import ExcerciseList from '../components/ExerciseList/ExerciseList';
import Button from '../components/Button/Button';
import { useQuery } from '../hooks/useQuery';

import * as sessionActions from '../redux/actions/session';
import classes from './styles/Session.module.css';

const Session = ({ getSession, session, userType, deleteSession }) => {
  const { id } = useParams();
  const query = useQuery();
  const clientId = query.get('client');
  const exerciseMode = query.get('exerciseMode');
  const history = useHistory();
  useEffect(() => {
    getSession(id);
  }, [getSession, id]);

  let buttonToggle = false;
  if ((userType === 'pro') & !exerciseMode) {
    buttonToggle = true;
  }

  const renderSession = () => {
    if (!session) {
      return 'No matching session';
    }

    const description = (
      <section className={classes.description_section}>
        <h3 className={classes.session_h3}>Description</h3>
        <p className={classes.session_p}>{session.description}</p>
        {userType === 'client' && (
          <p className={classes.session_p}>
            Created by {session && session.pro?.name}
          </p>
        )}
      </section>
    );

    const handleDeleteSession = id => {
      history.goBack();
      deleteSession(id);
    };

    return (
      <>
        <h1 className={classes.title}>Session: {session.title}</h1>
        <article className={classes.session_article}>
          {session.description && description}

          <ExcerciseList
            exercises={session.exercises}
            exerciseMode={exerciseMode === 'true' && true}
          />
          <div className={classes.actionsContainer}>
            {buttonToggle && (
              <Button
                actionStyle="delete"
                action={() => handleDeleteSession(id)}
              >
                Delete session
              </Button>
            )}
            <Link
              to={`/session/create?edit=true&sessionId=${
                session._id
              }&client=${clientId}${
                exerciseMode === 'true' ? '&exerciseMode=true' : ''
              }`}
            >
              {buttonToggle && (
                <Button actionStyle="create">Edit session</Button>
              )}
            </Link>
          </div>
        </article>
      </>
    );
  };

  return (
    <>
      <Layout>{renderSession()}</Layout>
    </>
  );
};

const mapStateToProps = state => ({
  session: state.sessionReducer,
  userType: state.authReducer.user.userType,
});

const mapDispatchToProps = dispatch => ({
  getSession: id => dispatch(sessionActions.getSession(id)),
  deleteSession: id => dispatch(sessionActions.deleteSession(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Session);
