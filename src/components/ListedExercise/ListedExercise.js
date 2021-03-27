import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Edit, AddBox, Delete } from '@material-ui/icons';

import * as sessionActions from '../../redux/actions/session';
import * as exerciseActions from '../../redux/actions/exercises';

import Button from '../Button/Button';
import classes from './ListedExercise.module.css';

const ListedExercise = props => {
  const {
    exercise,
    flag,
    addExercise,
    removeExercise,
    deleteExercise,
    asignedExercises,
    dashboard,
  } = props;

  let assignedOrNot;
  const disabled =
    asignedExercises.findIndex(e => e.exercise._id === exercise._id) > -1
      ? true
      : false;

  if (flag === 'add') {
    assignedOrNot = (
      <>
        <Link
          to={`/exercise/create?edit=true&exerciseId=${
            exercise._id ?? exercise.exercise._id
          }`}
        >
          <Button actionStyle="editSvg">
            <Edit color="inherit" />
          </Button>
        </Link>
        <Button
          // action={() => addExercise(exercise)}
          actionStyle="add"
          isDisabled={disabled}
        >
          <AddBox />
        </Button>
      </>
    );
  }

  if (flag === 'remove') {
    assignedOrNot = (
      <Button action={() => removeExercise(exercise)} actionStyle="delete">
        <Delete />
      </Button>
    );
  }

  if (dashboard) {
    assignedOrNot = (
      <>
        <Link to={`/exercise/create?edit=true&exerciseId=${exercise._id}`}>
          <Button actionStyle="editSvg">
            <Edit color="inherit" />
          </Button>
        </Link>
        <Button
          action={() => deleteExercise(exercise._id)}
          actionStyle="delete"
        >
          <Delete />
        </Button>
      </>
    );
  }

  return (
    <div
      className={classes.exercise}
      onClick={e => flag === 'add' && !disabled && addExercise(exercise)}
    >
      <Link to={`/exercise/${exercise._id}`}>
        <p className={classes.title}>
          {exercise.title ? exercise.title : exercise.exercise.title}
        </p>
      </Link>
      <div className={classes.actions}>{assignedOrNot}</div>
    </div>
  );
};
const mapStateToProps = state => ({
  asignedExercises: state.sessionReducer.exercises,
});
const mapDispatchToProps = dispatch => ({
  addExercise: exercise => dispatch(sessionActions.addExercise(exercise)),
  removeExercise: exercise => dispatch(sessionActions.removeExercise(exercise)),
  deleteExercise: exerciseId =>
    dispatch(exerciseActions.deleteExercise(exerciseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListedExercise);
