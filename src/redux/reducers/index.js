import {combineReducers} from 'redux';
import auth from './authReducer';
import alert from './alertReducer';
import petugas from './petugasReducer';

export default combineReducers({
  auth,
  alert,
  petugas,
});
