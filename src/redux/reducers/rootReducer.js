import { combineReducers } from 'redux';
import authReducer from './authReducer';
import exercisesReducer from './exercisesReducer';
import sessionReducer from './sessionReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  authReducer,
  exercisesReducer,
  sessionReducer,
  errorReducer,
});
