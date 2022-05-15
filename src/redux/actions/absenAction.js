import {GLOBALTYPES} from './globalTypes';
import {getDataAPI, patchDataAPI} from '../../utils/fetchData';
import {imageUpload} from '../../utils/imageUpload';
import {format} from 'date-fns';

export const ABSEN_TYPES = {
  PATCH_ABSEN: 'PATCH_ABSEN',
  GET_ABSEN_TODAY: 'GET_ABSEN_TODAY',
  PATCH_ABSEN_IN: 'PATCH_ABSEN_IN',
  PATCH_ABSEN_OUT: 'PATCH_ABSEN_OUT',
};

export const getAbsenToday =
  ({auth}) =>
  async dispatch => {
    try {
      dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});
      const date = format(new Date(new Date()), 'yyyy-MM-dd');

      const res = await getDataAPI(`/petugas/absen/${date}`, auth.token);

      const newData = res?.data?.user?.[0]?.petugasAbsensi;

      const veryNewData = newData.filter(
        item => item.userId._id === auth.user._id,
      );

      dispatch({
        type: ABSEN_TYPES.GET_ABSEN_TODAY,
        payload: {user: veryNewData[0]},
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {},
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {error: err.respone.data.msg},
      });
      console.log(err.respone.data);
    }
  };

export const patchAbsenIn =
  ({auth, date, userId, photo, hour, setPhoto}) =>
  async dispatch => {
    try {
      dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});

      const media = await imageUpload(photo);

      if (!media)
        return dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {error: 'Tidak ada Media yang harus di input'},
        });

      console.log(media[0].url);

      const res = await patchDataAPI(
        `petugas/updateAbsen/${date}/${userId}`,
        {
          photo: media[0].url,
          absenIn: hour,
        },
        auth.token,
      );

      console.log(res.data.msg);

      dispatch({
        type: ABSEN_TYPES.PATCH_ABSEN_IN,
        payload: {absenIn: hour},
      });
      setPhoto('');

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {success: res.data.msg},
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {error: err.respone.data.msg},
      });
      console.log(err);
    }
  };

export const patchAbsenOut =
  ({auth, date, userId, hour, statusAbsen}) =>
  async dispatch => {
    try {
      dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});

      const res = await patchDataAPI(
        `petugas/updateAbsen/${date}/${userId}`,
        {
          absenOut: hour,
          statusAbsen: statusAbsen,
        },
        auth.token,
      );

      console.log(res.data.msg);

      dispatch({
        type: ABSEN_TYPES.PATCH_ABSEN_OUT,
        payload: {absenOut: hour, statusAbsen},
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {success: res.data.msg},
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {error: err.respone.data.msg},
      });
    }
  };
