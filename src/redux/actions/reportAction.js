import {GLOBALTYPES} from './globalTypes';
import {getDataAPI, patchDataAPI, postDataAPI} from '../../utils/fetchData';
import {imageUploadReport} from '../../utils/imageUpload';
import {format} from 'date-fns';
import Toast from 'react-native-toast-message';

export const REPORT_TYPES = {
  GET_REPORT: 'GET_REPORT',
  POST_REPORT: 'POST_REPORT',
  PATCH_REPORT: 'PATCH_REPORT',
};

export const getReport =
  ({auth, setLoading}) =>
  async dispatch => {
    try {
      setLoading(true);
      const userId = auth.user._id;
      const date = format(new Date(new Date()), 'yyyy-MM-dd');

      const res = await getDataAPI(`getReport/${date}/${userId}`, auth.token);
      console.log(date);

      dispatch({
        type: REPORT_TYPES.GET_REPORT,
        payload: {report: res.data.report},
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

export const postReport =
  ({
    role,
    userId,
    before,
    progress,
    after,
    description,
    date,
    alamat,
    rtrw,
    auth,
    setLoading,
    setPhoto,
    setDescription,
  }) =>
  async dispatch => {
    try {
      setLoading(true);
      const media1 = await imageUploadReport(before);
      const media2 = await imageUploadReport(progress);
      const media3 = await imageUploadReport(after);

      if (!media1 && !media2 && !media3)
        return Toast.show({
          type: 'error',
          text1: 'Tidak ada media.',
          text2: 'silahkan mencoba lagi.',
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
          alamat,
          rtrw,
        },
        auth.token,
      );

      dispatch({
        type: REPORT_TYPES.POST_REPORT,
        payload: {report: res.data.report},
      });

      setPhoto({});
      setDescription('');
      setLoading(false);

      Toast.show({
        type: 'success',
        text1: 'Lapor pekerjaan hari ini berhasil.',
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: err.response.data.msg,
      });
    }
  };
