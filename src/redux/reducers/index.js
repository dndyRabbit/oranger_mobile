import {combineReducers} from 'redux';
import auth from './authReducer';
import alert from './alertReducer';
import location from './locationReducer';
import report from './reportReducer';
import permission from './permissionReducer';
import permissionApproved from './permissionApprovedReducer';
import absensi from './absenReducer';

export default combineReducers({
  auth,
  alert,
  location,
  report,
  permission,
  permissionApproved,
  absensi,
});
