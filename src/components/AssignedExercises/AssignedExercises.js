import React from 'react';

import classes from './AssignedExercises.module.css';
import ListedExercise from '../ListedExercise/ListedExercise';

const AssignedExercises = props => {
  const { exercises } = props;
  let list = <p className={classes.noExercises}>Add new exercise</p>;
  if (exercises.length > 0) {
    list = exercises.map(e => (
      <ListedExercise exercise={e} key={e.exercise._id} flag="remove" />
    ));
  }

  return (
    <div className={classes.addedExercises}>
      <p className={classes.addExerciseTitle}>Assigned Exercises</p>
      {list}
    </div>
  );
};

export default AssignedExercises;
