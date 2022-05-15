import {GLOBALTYPES} from './globalTypes';
import {patchDataAPI} from '../../utils/fetchData';
import {imageUpload} from '../../utils/imageUpload';

export const PETUGAS_TYPES = {
  PATCH_PETUGAS_PROFILE: 'PATCH_PETUGAS_PROFILE',
};

export const updateProfilePetugas =
  ({newData, auth, avatar}) =>
  async dispatch => {
    try {
      let media;
      const {namaLengkap, noKTP, noHandphone, alamatLengkap, tanggalLahir} =
        newData;
      dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});

      if (avatar) media = await imageUpload(avatar);
      console.log(newData, media);

      const res = await patchDataAPI(
        `updatePetugas/${auth.user._id}`,
        {
          ...newData,
          avatar: avatar ? media[0].url : auth.user.avatar,
        },
        auth.token,
      );

      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            namaLengkap: namaLengkap ? namaLengkap : auth.user.namaLengkap,
            noKTP: noKTP ? noKTP : auth.user.noKTP,
            noHandphone: noHandphone ? noHandphone : auth.user.noHandphone,
            alamatLengkap: alamatLengkap
              ? alamatLengkap
              : auth.user.alamatLengkap,
            tanggalLahir: tanggalLahir ? tanggalLahir : auth.user.tanggalLahir,
            avatar: avatar ? media[0].url : auth.user.avatar,
          },
        },
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
      console.log(err.respone.data);
    }
  };
