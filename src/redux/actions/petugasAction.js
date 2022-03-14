import {GLOBALTYPES} from './globalTypes';
import {getDataAPI} from '../../utils/fetchData';
import valid from '../../utils/valid';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PETUGASTYPES = {
  GET_PETUGAS: 'GET_PETUGAS',
};

export const petugasData =
  ({auth}) =>
  async dispatch => {
    try {
      dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});
      const res = await getDataAPI('getPetugas', auth.token);

      if (res)
        dispatch({
          type: PETUGASTYPES.GET_PETUGAS,
          payload: {
            user: res.data.user,
          },
        });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          success: res.data.msg,
        },
      });
    } catch (err) {
      dispatch({
        payload: {
          error: err.response.data.msg,
        },
      });
      // console.log(err);
    }
  };
