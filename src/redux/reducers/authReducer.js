import {GLOBALTYPES} from '../actions/globalTypes';

const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.AUTH:
      return action.payload;
    case GLOBALTYPES.RESET_TO_INITIAL_STATE:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
