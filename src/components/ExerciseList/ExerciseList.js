import React from 'react';
import styles from './ExerciseList.module.css';
import Exercise from './Exercise';

const ExcerciseList = props => {
  const { exercises } = props;
  const renderExercises = () => {
    if (!exercises || exercises.length < 1) {
      return 'No exercises';
    }
    return exercises.map((e, i) => (
      <Exercise
        key={e.exercise._id}
        exerciseData={e}
        exerciseMode={props.exerciseMode ? true : false}
        order={i + 1}
      />
    ));
  };

  return (
    <div className={styles.exercisesListWrapper}>
      <h3 className={styles.heading}>Exercises</h3>
      <div className={styles.exerciseList}>{renderExercises()}</div>
    </div>
  );
};

export default ExcerciseList;
