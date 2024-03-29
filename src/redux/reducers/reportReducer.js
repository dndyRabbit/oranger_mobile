import {GLOBALTYPES} from '../actions/globalTypes';
import {REPORT_TYPES} from '../actions/reportAction';

const initialState = {
  report: [],
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case REPORT_TYPES.GET_REPORT:
      return {
        report: action.payload.report,
      };
    case REPORT_TYPES.POST_REPORT:
      return {
        report: action.payload.report,
      };
    case GLOBALTYPES.RESET_TO_INITIAL_STATE:
      return initialState;
    default:
      return state;
  }
};

export default reportReducer;
