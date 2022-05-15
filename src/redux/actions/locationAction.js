import {GLOBALTYPES} from './globalTypes';
import {getDataAPI} from '../../utils/fetchData';

export const LOCATION_TYPES = {
  GET_RUTE: 'GET_RUTE',
};

export const getRuteLocation =
  ({auth}) =>
  async dispatch => {
    try {
      dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});

      const res = await getDataAPI(
        `getUserRuteByUserId/${auth.user._id}`,
        auth.token,
      );

      dispatch({
        type: LOCATION_TYPES.GET_RUTE,
        payload: {rute: res?.data?.user},
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {success: res?.data?.msg},
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {error: err.respone.data.msg},
      });
    }
  };

// export const postUserLocation =
// ({state}) =>
// async dispatch => {
//   try {
//     dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});

//     const res = await post(
//       `getUserRuteByUserId/${auth.user._id}`,
//       auth.token,
//     );

//     dispatch({
//       type: LOCATION_TYPES.GET_RUTE,
//       payload: {rute: res?.data?.user},
//     });

//     dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: {success: res?.data?.msg},
//     });
//   } catch (err) {
//     dispatch({
//       type: GLOBALTYPES.ALERT,
//       payload: {error: err.respone.data.msg},
//     });
//   }
// };
