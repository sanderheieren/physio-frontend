import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './EditExerciseList.module.css';

const EditExerciseList = props => {
  const [exercises, setExercises] = useState(props.exercises);

  const removeExercise = exerciseId => {
    const newExercises = exercises.filter(
      exercise => exercise.id !== exerciseId
    );
    setExercises(newExercises);
  };

  const renderExercises = () => {
    if (!exercises || exercises.length < 1) {
      return 'No exercises';
    }
    return exercises.map(exercise => (
      <div key={exercise.id} className={styles.exercise}>
        <div>
          <b>{exercise.title}</b>
          {exercise.description && <p>{exercise.description}</p>}
        </div>
        <button onClick={() => removeExercise(exercise.id)}>-</button>
        <Link to={`/exercise/${exercise.id}`}>
          <button>Details</button>
        </Link>
      </div>
    ));
  };

  return (
    <div>
      <h3>Exercises:</h3>
      <div className={styles.exerciseList}>{renderExercises()}</div>
    </div>
  );
};

export default EditExerciseList;
