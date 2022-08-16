import {GLOBALTYPES} from './globalTypes';
import {getDataAPI, postDataAPI} from '../../utils/fetchData';
import Toast from 'react-native-toast-message';

export const LOCATION_TYPES = {
  GET_RUTE: 'GET_RUTE',
};

export const getRuteLocation =
  ({auth, setLoading}) =>
  async dispatch => {
    try {
      setLoading(true);
      const res = await getDataAPI(
        `getUserRuteByUserId/${auth.user._id}`,
        auth.token,
      );

      dispatch({
        type: LOCATION_TYPES.GET_RUTE,
        payload: {response: res?.data?.data},
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: err.response.data.msg,
      });
    }
  };

export const postUserLocation =
  ({auth, liveLoc}) =>
  async dispatch => {
    try {
      const {latLngs} = liveLoc;

      const newData = {
        userId: auth.user._id,
        latLngs,
      };

      if (liveLoc) {
        await postDataAPI(`locationUser`, newData, auth?.token);
        console.log(newData, 'DATA SENDED TO BACKEND');
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: err.response.data.msg,
      });
      console.log(err.response.data.msg);
    }
  };
