import {GLOBALTYPES} from './globalTypes';
import {patchDataAPI} from '../../utils/fetchData';
import {imageUpload} from '../../utils/imageUpload';
import Toast from 'react-native-toast-message';

export const PETUGAS_TYPES = {
  PATCH_PETUGAS_PROFILE: 'PATCH_PETUGAS_PROFILE',
};

export const updateProfilePetugas =
  ({newData, auth, avatar, setLoading}) =>
  async dispatch => {
    try {
      let media;
      const {fullName, ktp, handphone, address, birthday} = newData;
      setLoading(true);

      if (avatar) media = await imageUpload(avatar);
      console.log(newData, media);

      await patchDataAPI(
        `updatePetugas/${auth.user._id}`,
        {
          fullName,
          ktp,
          handphone,
          address,
          birthday,
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
            fullName: fullName ? fullName : auth.user.fullName,
            ktp: ktp ? ktp : auth.user.ktp,
            handphone: handphone ? handphone : auth.user.handphone,
            address: address ? address : auth.user.address,
            birthday: birthday ? birthday : auth.user.birthday,
            avatar: avatar ? media[0].url : auth.user.avatar,
          },
        },
      });

      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Update profile berhasil.',
      });
    } catch (err) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: err.response.data.msg,
      });
    }
  };
