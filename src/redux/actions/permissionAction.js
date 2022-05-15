import {GLOBALTYPES} from './globalTypes';
import {getDataAPI, patchDataAPI, postDataAPI} from '../../utils/fetchData';
import {imageUploadReport} from '../../utils/imageUpload';

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
  }) =>
  async dispatch => {
    try {
      dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});
      let media;

      if (evidence !== '') {
        media = await imageUploadReport(evidence);
      }

      console.log('gakada gambar');

      if (!media)
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {error: 'Tidak ada Media yang harus di input'},
        });
      console.log('gakada gambar34343');

      const res = await postDataAPI(
        `postPermission`,
        {
          role,
          userId,
          type,
          evidence: evidence ? media?.[0]?.url : '',
          description,
          date,
          startDate,
          endDate,
        },
        auth.token,
      );
      console.log(res.data);

      dispatch({
        type: PERMISSION_TYPES.POST_USER_PERMISSION,
        payload: {permission: res.data.permission},
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {success: res.data.msg},
      });
      setScaleAnimationModal(false);
      setState({
        type: '',
        description: '',
        evidence: '',
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {error: err.respone.data.msg},
      });

      console.log('error', err.respone.data);
    }
  };

export const getUserPermission =
  ({auth, userId}) =>
  async dispatch => {
    try {
      dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});

      const res = await getDataAPI(`getUserPermission/${userId}`, auth.token);

      dispatch({
        type: PERMISSION_TYPES.GET_USER_PERMISSION,
        payload: {permission: res.data.permission},
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
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {error: err.respone.data.msg},
      });
    }
  };

export const patchUserPermission =
  ({auth, id, evidence, setPhoto}) =>
  async dispatch => {
    try {
      dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});

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

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {success: res.data.msg},
      });
      setPhoto(null);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {error: err.respone.data.msg},
      });
    }
  };
