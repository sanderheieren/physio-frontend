import axios from '../../utils/axios';
import * as authActions from './auth';

export const saveSession = sessionData => {
  return async dispatch => {
    const response = await axios.post('/sessions', sessionData);
    if (response.status === 200) {
      dispatch(authActions.tryToAutoLog());
      dispatch(cleanState());
    }
  };
};
export const updateSession = (sessionData, sessionId) => {
  return async dispatch => {
    const response = await axios.put(`/sessions/${sessionId}`, sessionData);
    if (response.status === 200) {
      dispatch(authActions.tryToAutoLog());
      dispatch(cleanState());
    }
  };
};
export const getSession = sessionId => async dispatch => {
  dispatch(authActions.isLoading(true));

  const response = await axios.get(`/sessions/${sessionId}`);
  if (response.status === 200) {
    dispatch(storeSession(response.data));
  }
  dispatch(authActions.isLoading(false));
};

export const deleteSession = sessionId => {
  return async dispatch => {
    const response = await axios.delete(`/sessions/${sessionId}`);
    if (response.status === 200) {
      dispatch(authActions.tryToAutoLog());
      dispatch(cleanState());
    }
  };
};

export const storeSession = session => ({
  type: 'STORE_SESSION',
  payload: session,
});
export const addExercise = exercise => ({
  type: 'ADD_EXERCISE',
  payload: exercise,
});
export const removeExercise = exercise => ({
  type: 'REMOVE_EXERCISE',
  payload: exercise,
});
export const addDescription = formData => ({
  type: 'ADD_DESCRIPTION',
  payload: formData,
});
export const cleanState = () => ({
  type: 'CLEAN_SESSION',
});
export const updateExercises = exercisesList => ({
  type: 'UPDATE_EXERCISES',
  payload: exercisesList,
});
