import {GLOBALTYPES} from './globalTypes';
import {getDataAPI, patchDataAPI, postDataAPI} from '../../utils/fetchData';
import {imageUploadReport} from '../../utils/imageUpload';
import Toast from 'react-native-toast-message';

export const PERMISSION_TYPES = {
  GET_USER_PERMISSION: 'GET_USER_PERMISSION',
  POST_USER_PERMISSION: 'POST_USER_PERMISSION',
  PATCH_USER_PERMISSION: 'PATCH_USER_PERMISSION',
  GET_USER_PERMISSION_APPROVED: 'GET_USER_PERMISSION_APPROVED',
};

export const postUserPermission =
  ({
    auth,
    role,
    userId,
    type,
    evidence,
    description,
    date,
    startDate,
    endDate,
    setScaleAnimationModal,
    setState,
    setLoading,
    setError,
  }) =>
  async dispatch => {
    try {
      setLoading(true);
      let media;

      if (evidence !== '') {
        media = await imageUploadReport(evidence);
      }

      const res = await postDataAPI(
        `postPermission`,
        {
          role,
          userId,
          type,
          evidence: media == undefined ? '' : media?.[0]?.url,
          description,
          date,
          startDate,
          endDate,
        },
        auth.token,
      );

      dispatch({
        type: PERMISSION_TYPES.POST_USER_PERMISSION,
        payload: {
          permission: {
            role,
            userId,
            type,
            evidence: media == undefined ? '' : media?.[0]?.url,
            description,
            date,
            startDate,
            endDate,
            isApproved: false,
          },
        },
      });

      console.log('PAssing the the dispatcj');
      setLoading(false);
      setScaleAnimationModal(false);
      setState({
        type: '',
        description: '',
        evidence: '',
      });
      Toast.show({
        type: 'success',
        text1: 'Perizinan Berhasil dibuat.',
      });
    } catch (err) {
      setLoading(false);

      Toast.show({
        type: 'error',
        text1: err.response.data.msg,
      });
    }
  };

export const getUserPermission =
  ({auth, userId}) =>
  async dispatch => {
    try {
      const res = await getDataAPI(`getUserPermission/${userId}`, auth.token);

      dispatch({
        type: PERMISSION_TYPES.GET_USER_PERMISSION,
        payload: {permission: res.data.permission},
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: err.response.data.msg,
      });
    }
  };

export const getUserPermissionIsApproved =
  ({auth, userId}) =>
  async dispatch => {
    try {
      dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});

      const res = await getDataAPI(
        `getUserPermissionIsApproved/${userId}`,
        auth.token,
      );

      dispatch({
        type: PERMISSION_TYPES.GET_USER_PERMISSION_APPROVED,
        payload: {permission: res.data.permission},
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {success: res.data.msg},
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: err.response.data.msg,
      });
    }
  };

export const patchUserPermission =
  ({auth, id, evidence, setPhoto, setLoading}) =>
  async dispatch => {
    try {
      setLoading(true);

      let media = await imageUploadReport(evidence);

      if (!media)
        return dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {error: 'Tidak ada Media yang harus di input'},
        });

      const res = await patchDataAPI(
        `patchUserPermission/${id}`,
        {evidence: media[0].url},
        auth.token,
      );

      dispatch({
        type: PERMISSION_TYPES.PATCH_USER_PERMISSION,
        payload: {id, evidence: media[0].url},
      });

      setPhoto(null);
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Gambar berhasil diupload.',
      });
    } catch (err) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: err.response.data.msg,
      });
    }
  };
