import {LOCATION_TYPES} from '../actions/locationAction';

const initialState = {
  rute: [],
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_TYPES.GET_RUTE:
      return {
        rute: action.payload.rute,
      };
    default:
      return state;
  }
};

export default alertReducer;
