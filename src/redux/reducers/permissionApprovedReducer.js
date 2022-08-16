import {GLOBALTYPES} from '../actions/globalTypes';
import {PERMISSION_TYPES} from '../actions/permissionAction';

const initialState = {
  permissionApproved: [],
};

const permissionReducer = (state = initialState, action) => {
  switch (action.type) {
    case PERMISSION_TYPES.GET_USER_PERMISSION_APPROVED:
      return {
        permissionApproved: action.payload.permission,
      };
    case GLOBALTYPES.RESET_TO_INITIAL_STATE:
      return initialState;

    default:
      return state;
  }
};

export default permissionReducer;
