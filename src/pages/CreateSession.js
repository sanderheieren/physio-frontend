import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  changedHandler,
  editModeInitValues,
  createFormData,
  findById,
} from '../utils';
import classes from './styles/CreateSession.module.css';
import { useQuery } from '../hooks/useQuery';
import Layout from '../components/Layout/Layout';
import Form from '../components/Form/Form';
import AsideExercisesList from '../components/AsideExercisesList/AsideExercisesList';
import AssignedExercises from '../components/AssignedExercises/AssignedExercises';
import Button from '../components/Button/Button';

import * as errorsActions from '../redux/actions/errors';
import * as sessionActions from '../redux/actions/session';

const CreateSession = props => {
  const [formElements, setFormElements] = useState({
    title: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        name: 'title',
        id: 'title',
      },
      label: 'Title',
      value: '',
    },
    description: {
      elementType: 'textarea',
      elementConfig: {
        name: 'description',
        id: 'description',
      },
      label: 'Description',
      value: '',
    },
  });
  const history = useHistory();
  const query = useQuery();
  const sessionId = query.get('sessionId');
  const clientId = query.get('client');
  const editMode = query.get('edit');
  let client;
  let session = props.session;

  if (clientId) {
    client = findById(props.clients, clientId);
  }

  useEffect(() => {
    // EDIT MODE - get session and update form
    if (editMode) {
      // eslint-disable-next-line
      session = findById(client.sessions, sessionId);
      props.storeSession(session);
      const initialValues = {
        title: session.title,
        description: session.description,
      };
      editModeInitValues(formElements, initialValues, setFormElements);
    }
    if (!editMode) {
      props.cleanState();
    }
  }, []);

  // Submit:
  const submitHandler = e => {
    e.preventDefault();
    try {
      const additionalFields = { client: client._id };

      const formData = createFormData(
        formElements,
        additionalFields,
        'session'
      );

      props.cleanFormError();

      const exercisesData = props.session.exercises.map(e => ({
        exercise: e.exercise._id,
        comment: e.comment,
      }));

      const sessionData = {
        exercises: exercisesData,
        ...formData,
      };

      if (editMode) {
        props.updateSession(sessionData, sessionId);
        return history.replace(`/client/${client._id}`);
      }
      props.saveSession(sessionData);

      history.replace(`/client/${client._id}`);
    } catch (error) {
      props.addFormError(error);
    }
  };

  return (
    <Layout>
      <h1 className={classes.title}>
        {editMode ? 'Editing session for ' : 'Creating session for '}
        <span>{client.name}</span>
      </h1>

      <div className={classes.wrapper}>
        <div className={classes.formContainer}>
          <Form
            submitHandler={submitHandler}
            changedHandler={e => changedHandler(e, 'value', setFormElements)}
            formElements={formElements}
          />
          <AssignedExercises exercises={session.exercises} />
          <div className={classes.actionsContainer}>
            <Button
              action={() => {
                history.goBack();
                props.cleanFormError();
              }}
              actionStyle="cancel"
            >
              Cancel
            </Button>
            <Button type="submit" action={submitHandler} actionStyle="create">
              {editMode ? 'Save Changes' : 'Create Session'}
            </Button>
          </div>
        </div>
        <aside className={classes.asideExercises}>
          <AsideExercisesList />
        </aside>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
  clients: state.authReducer.user.clients,
  formError: state.errorReducer.formErrors,
  session: state.sessionReducer,
});
const mapDispatchToProps = dispatch => ({
  addFormError: message => dispatch(errorsActions.addFormError(message)),
  cleanFormError: () => dispatch(errorsActions.cleanFormError()),
  saveSession: data => dispatch(sessionActions.saveSession(data)),
  updateSession: (data, sessionId) =>
    dispatch(sessionActions.updateSession(data, sessionId)),
  storeSession: session => dispatch(sessionActions.storeSession(session)),
  cleanState: () => dispatch(sessionActions.cleanState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateSession);
