import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Layout from '../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import { useQuery } from '../hooks/useQuery';
import ExcerciseList from '../components/ExerciseList/ExerciseList';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';

import * as sessionActions from '../redux/actions/session';

const Session = ({ getSession, session, userType }) => {
  const { id } = useParams();
  const query = useQuery();
  const clientId = query.get('client');

  useEffect(() => {
    getSession(id);
  }, [getSession, id]);

  const renderSession = () => {
    if (!session) {
      return 'No matching session';
    }

    return (
      <>
        <h1>Session: {session.title}</h1>
        <ExcerciseList exercises={session.exercises} exerciseMode={true} />
      </>
    );
  };

  return (
    <div>
      <Layout>{renderSession()}</Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  session: state.sessionReducer,
  userType: state.authReducer.user.userType,
});

const mapDispatchToProps = (dispatch) => ({
  getSession: (id) => dispatch(sessionActions.getSession(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Session);
