import {PETUGASTYPES} from '../actions/petugasAction';

const initialState = {};

const petugasReducer = (state = initialState, action) => {
  switch (action.type) {
    case PETUGASTYPES.GET_PETUGAS:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

export default petugasReducer;
