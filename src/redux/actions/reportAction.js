import {GLOBALTYPES} from './globalTypes';
import {getDataAPI, patchDataAPI, postDataAPI} from '../../utils/fetchData';
import {imageUploadReport} from '../../utils/imageUpload';
import {format} from 'date-fns';

export const REPORT_TYPES = {
  GET_REPORT: 'GET_REPORT',
  POST_REPORT: 'POST_REPORT',
  PATCH_REPORT: 'PATCH_REPORT',
};

export const getReport =
  ({auth}) =>
  async dispatch => {
    try {
      dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});

      const userId = auth.user._id;
      const date = format(new Date(new Date()), 'yyyy-MM-dd');

      const res = await getDataAPI(`getReport/${date}/${userId}`, auth.token);
      console.log(date);

      dispatch({
        type: REPORT_TYPES.GET_REPORT,
        payload: {report: res.data.report},
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

export const postReport =
  ({role, userId, before, progress, after, description, date, wilayah, auth}) =>
  async dispatch => {
    try {
      dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});

      const media1 = await imageUploadReport(before);
      const media2 = await imageUploadReport(progress);
      const media3 = await imageUploadReport(after);

      if (!media1 && !media2 && media3)
        return dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {error: 'Tidak ada Media yang harus di input'},
        });

      console.log('Done upload gambar');

      const res = await postDataAPI(
        'postReport',
        {
          role,
          userId,
          before: media1[0].url,
          progress: media2[0].url,
          after: media3[0].url,
          description,
          date,
          wilayah,
        },
        auth.token,
      );

      console.log('Done upload data');

      dispatch({
        type: REPORT_TYPES.POST_REPORT,
        payload: {report: res.data.report},
      });

      setPhoto({});
      setDescription('');

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

export const patchReport =
  ({auth, wilayahId, dateNow, before, after, description}) =>
  async dispatch => {
    console.log('before :', before, 'after :', after);

    console.log(
      'userId :',
      auth.user._id,
      'wialyahId: ',
      wilayahId,
      'dateNow,: ',
      dateNow,
    );

    try {
      dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});
      const userId = auth.user._id;

      let media;
      if (after) {
        media = await imageUploadReport(after);
      } else if (before) {
        media = await imageUploadReport(before);
      } else {
        return dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {error: 'Tidak ada Media yang harus di input'},
        });
      }

      if (after) {
        const res = await patchDataAPI(
          `updateReport/${userId}/${wilayahId}/${dateNow}`,
          {
            after: media[0].url,
            description,
          },
          auth.token,
        );

        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {success: res.data.msg},
        });
      } else {
        const res = await patchDataAPI(
          `updateReport/${userId}/${wilayahId}/${dateNow}`,
          {
            before: media[0].url,
            description,
          },
          auth.token,
        );

        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {success: res.data.msg},
        });
      }
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {error: err.respone.data.msg},
      });
    }
  };
