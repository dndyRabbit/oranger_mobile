import {ABSEN_TYPES} from '../actions/absenAction';

const initialState = {
  absensi: [],
};

const absenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ABSEN_TYPES.GET_ABSEN_TODAY:
      return {
        absensi: action.payload.user,
      };
    case ABSEN_TYPES.PATCH_ABSEN_IN:
      return {
        absensi: {
          ...state.absensi,
          absenIn: action.payload.absenIn,
        },
      };
    case ABSEN_TYPES.PATCH_ABSEN_OUT:
      return {
        absensi: {
          ...state.absensi,
          absenOut: action.payload.absenOut,
          statusAbsen: action.payload.statusAbsen,
        },
      };
    default:
      return state;
  }
};

export default absenReducer;
