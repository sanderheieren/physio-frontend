import axios from '../../utils/axios';
import * as authActions from './auth';
import * as errorActions from './errors';
export const getAll = () => async dispatch => {
  try {
    dispatch(authActions.isLoading(true));
    const response = await axios.get('/exercises/');
    dispatch(loadExercisesToState(response.data));
    dispatch(authActions.isLoading(false));
  } catch (error) {
    dispatch(authActions.isLoading(false));
  }
};

export const saveExercise = exerciseData => {
  return async dispatch => {
    try {
      const response = await axios.post('/exercises', exerciseData);
      if (response.status === 200) {
        dispatch(authActions.tryToAutoLog());
      }
    } catch (error) {
      dispatch(errorActions.addCreateError({ message: error.message }));
    }
  };
};
export const updateExercise = (exerciseData, exerciseId) => {
  return async dispatch => {
    try {
      const response = await axios.put(
        `/exercises/${exerciseId}`,
        exerciseData
      );
      if (response.status === 200) {
        dispatch(authActions.tryToAutoLog());
      }
    } catch (error) {
      dispatch(errorActions.addCreateError({ message: error.message }));
    }
  };
};
export const deleteExercise = exerciseId => {
  return async dispatch => {
    try {
      const response = await axios.delete(`/exercises/${exerciseId}`);
      if (response.status === 200) {
        dispatch(authActions.tryToAutoLog());
      }
    } catch (error) {
      dispatch(errorActions.addCreateError({ message: error.message }));
    }
  };
};

export const loadExercisesToState = exercisesList => ({
  type: 'LOAD_NEW_DATA',
  payload: exercisesList,
});
