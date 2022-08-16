import {getDataAPI, patchDataAPI} from '../../utils/fetchData';
import {imageUpload} from '../../utils/imageUpload';
import Toast from 'react-native-toast-message';

export const ABSEN_TYPES = {
  PATCH_ABSEN: 'PATCH_ABSEN',
  GET_ABSEN_TODAY: 'GET_ABSEN_TODAY',
  PATCH_ABSEN_IN: 'PATCH_ABSEN_IN',
  PATCH_ABSEN_OUT: 'PATCH_ABSEN_OUT',
};

export const getAbsenToday =
  ({auth, date, setLoading}) =>
  async dispatch => {
    try {
      setLoading(true);
      const res = await getDataAPI(`/petugas/absen/${date}`, auth.token);

      const newData = res?.data?.user?.[0]?.petugasAbsensi;

      const veryNewData = newData?.filter(
        item => item?.userId?._id === auth?.user?._id,
      );

      dispatch({
        type: ABSEN_TYPES.GET_ABSEN_TODAY,
        payload: {user: veryNewData?.[0]},
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

export const patchAbsenIn =
  ({auth, date, userId, photo, hour, setPhoto, setError, setLoading}) =>
  async dispatch => {
    try {
      setLoading(true);
      const media = await imageUpload(photo);

      if (!media) return setError;

      await patchDataAPI(
        `petugas/updateAbsen/${date}/${userId}`,
        {
          photo: media[0].url,
          absenIn: hour,
        },
        auth.token,
      );

      dispatch({
        type: ABSEN_TYPES.PATCH_ABSEN_IN,
        payload: {absenIn: hour},
      });
      setPhoto('');
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Berhasil melakukan absen masuk',
      });
    } catch (err) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: err.response.data.msg,
      });
    }
  };

export const patchAbsenOut =
  ({
    auth,
    date,
    userId,
    hour,
    statusAbsen,
    photo2,
    setPhoto2,
    setError,
    setLoading,
  }) =>
  async dispatch => {
    try {
      setLoading(true);
      const media = await imageUpload(photo2);

      if (!media) return setError;
      console.log(media[0].url);

      await patchDataAPI(
        `petugas/updateAbsen/${date}/${userId}`,
        {
          photo2: media[0].url,
          absenOut: hour,
          statusAbsen: statusAbsen,
        },
        auth.token,
      );

      dispatch({
        type: ABSEN_TYPES.PATCH_ABSEN_OUT,
        payload: {absenOut: hour, statusAbsen},
      });

      setPhoto2('');
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Berhasil melakukan absen keluar.',
        text2: 'Berhasil melakukan Absensi hari ini.',
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: err.response.data.msg,
      });
    }
  };
