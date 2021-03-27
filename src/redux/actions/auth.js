import Cookies from 'js-cookie';
import axios from '../../utils/axios';

import * as exercisesActions from './exercises';
import * as errorsActions from './errors';

export const signup = credentials => async dispatch => {
  const response = await axios.post('/auth/signup', credentials);
  const { user } = response.data.data;
  dispatch(loadUserData(user));
};

export const login = credentials => async dispatch => {
  try {
    dispatch(isLoading(true));
    const response = await axios.post('/auth/login', credentials);
    const { user } = response.data.data;
    const userPopulatedData = await dispatch(
      fetchUserData(user._id, user.userType)
    );
    dispatch(loadUserData(userPopulatedData));
    dispatch(isLoading(false));
  } catch (error) {
    dispatch(isLoading(false));
    dispatch(errorsActions.addGeneralError(error.message));
  }
};

export const tryToAutoLog = () => async dispatch => {
  if (Cookies.get('auth')) {
    dispatch(isLoading(true));
    try {
      const response = await axios.get('/auth/login');
      const { data } = response;
      if (!data) {
        console.log(response);
      }
      const userPopulatedData = await dispatch(
        fetchUserData(data._id, data.userType)
      );

      dispatch(loadUserData(userPopulatedData));
      dispatch(isLoading(false));
    } catch (error) {
      dispatch(isLoading(false));
      dispatch(errorsActions.addGeneralError(error));
    }
  }
};

export const fetchUserData = (_id, userType) => async dispatch => {
  if (userType === 'pro') {
    const userResponse = await axios.get(`/pros/${_id}`);
    if (userResponse.status === 200) {
      dispatch(exercisesActions.getAll());
      return userResponse.data;
    }
  }
  if (userType === 'client') {
    const userResponse = await axios.get(`/clients/${_id}`);
    if (userResponse.status === 200) return userResponse.data;
  }
};

export const loadUserData = user => ({ type: 'LOAD_DATA', payload: user });

export const logout = () => {
  Cookies.remove('auth');
  return { type: 'LOGOUT' };
};

export const signupClient = credentials => async dispatch => {
  try {
    dispatch(isLoading(true));

    const response = await axios.post('/auth/client/signup', credentials);
    const { user } = response.data.data;
    dispatch(loadUserData(user));
    dispatch(isLoading(false));
  } catch (error) {
    dispatch(isLoading(false));
    dispatch(errorsActions.addGeneralError(error.message));
  }
};

export const isLoading = bool => ({ type: 'IS_LOADING', payload: bool });
