import {GLOBALTYPES} from '../actions/globalTypes';
import {LOCATION_TYPES} from '../actions/locationAction';

const initialState = {
  rute: [],
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_TYPES.GET_RUTE:
      return {
        rute: action.payload.response,
      };
    case GLOBALTYPES.RESET_TO_INITIAL_STATE:
      return initialState;
    default:
      return state;
  }
};

export default alertReducer;
