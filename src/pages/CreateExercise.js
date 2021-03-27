import React, { useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  changedHandler,
  createFormData,
  findById,
  editModeInitValues,
} from '../utils';

import Layout from '../components/Layout/Layout';
import Form from '../components/Form/Form';
import Button from '../components/Button/Button';
import Video from '../components/Video/Video';

import { useQuery } from '../hooks/useQuery';
import * as errorsActions from '../redux/actions/errors';
import * as exercisesActions from '../redux/actions/exercises';

import classes from './styles/CreateExercise.module.css';

const CreateExercise = props => {
  const { exercises } = props;
  const history = useHistory();
  const query = useQuery();
  const exerciseId = query.get('exerciseId');
  const editMode = query.get('edit');

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
    media: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        name: 'media',
        id: 'media',
      },
      label: 'Video Url',
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

  let exercise;
  useLayoutEffect(() => {
    // EDIT MODE - get exercise and update form
    if (editMode) {
      if (exercises.length === 0) {
        return history.goBack();
      }
      // eslint-disable-next-line
      exercise = findById(props.exercises, exerciseId);

      const initialValues = {
        title: exercise.title,
        description: exercise.description,
        media: exercise.media,
      };
      editModeInitValues(formElements, initialValues, setFormElements);
    }
  }, [exercises.length]);

  const submitHandler = e => {
    e.preventDefault();
    try {
      const formData = createFormData(formElements, null, 'exercise');

      props.cleanFormError();
      if (editMode) {
        props.updateExercise(formData, exerciseId);
        return history.goBack();
      }
      props.saveExercise(formData);
      history.goBack();
    } catch (error) {
      props.addFormError(error);
    }
  };
  return (
    <Layout>
      <h1 className={classes.heading}>
        {editMode ? `Editing Exercise` : 'Create new Exercise'}
      </h1>
      <div className={classes.wrapper}>
        <Form
          submitHandler={submitHandler}
          changedHandler={e => changedHandler(e, 'value', setFormElements)}
          formElements={formElements}
        />
        {formElements.media.value?.length > 7 && (
          <>
            <h3 className={classes.videoTitle}>Video preview</h3>
            <Video url={formElements.media.value} />
          </>
        )}
        <div className={classes.actionsContainer}>
          <Button actionStyle="cancel" action={() => history.goBack()}>
            Cancel
          </Button>
          <Button action={submitHandler} actionStyle="create">
            Save
          </Button>
        </div>
      </div>
    </Layout>
  );
};
const mapStateToProps = state => ({
  formError: state.errorReducer.formErrors,
  exercises: state.exercisesReducer,
});
const mapDispatchToProps = dispatch => ({
  addFormError: message => dispatch(errorsActions.addFormError(message)),
  cleanFormError: () => dispatch(errorsActions.cleanFormError()),
  saveExercise: exerciseData =>
    dispatch(exercisesActions.saveExercise(exerciseData)),
  updateExercise: (exerciseData, exerciseId) =>
    dispatch(exercisesActions.updateExercise(exerciseData, exerciseId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateExercise);
