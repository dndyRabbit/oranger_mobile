import {GLOBALTYPES} from './globalTypes';
import {getDataAPI, postDataAPI} from '../../utils/fetchData';
import valid from '../../utils/valid';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export const login = (data, setLoading) => async dispatch => {
  try {
    setLoading(true);
    console.log('LOADING......', data);
    const res = await postDataAPI('login', data);

    console.log('BERHASIL LOGIN');
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        rf_token: res.data.refresh_token,
        user: res.data.user,
      },
    });

    console.log('GA BERHASIL NERIMA DATA');

    await EncryptedStorage.setItem('accessToken', res.data.access_token);
    await EncryptedStorage.setItem(
      'refreshToken',
      JSON.stringify({
        rf_token: res.data.refresh_token,
        email: res.data.user.email,
      }),
    );

    console.log(res.data.user, 'THIS IS USER DATAS');
    setLoading(false);
    Toast.show({
      type: 'success',
      text1: 'Login Success.',
    });
  } catch (err) {
    setLoading(false);
    Toast.show({
      type: 'error',
      text1: err.response.data.msg,
    });
  }
};

export const refreshToken = () => async dispatch => {
  try {
    const session = await EncryptedStorage.getItem('refreshToken');
    if (!session)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {error: 'Theres no session please login again!'},
      });
    const obj = JSON.parse(session);
    const res = await postDataAPI(`refresh_token_mobile`, {
      rf_token: obj.rf_token,
    });

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });
  } catch (err) {
    Toast.show({
      type: 'error',
      text1: err.response.data.msg,
    });
  }
};

export const register = (data, navigation, setLoading) => async dispatch => {
  try {
    setLoading(true);
    const res = await postDataAPI('register', data);
    navigation.replace('Login');
    Toast.show({
      type: 'success',
      text1: 'Registrasi Akun Berhasil.',
      text2: 'Silahkan hubungi admin untuk verifikasi akun.',
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

export const logout = () => async dispatch => {
  try {
    await EncryptedStorage.clear();
    await AsyncStorage.clear();
    console.log('Logged out');
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {},
    });
    dispatch({
      type: GLOBALTYPES.RESET_TO_INITIAL_STATE,
      payload: {},
    });
    await postDataAPI('logout');
    Toast.show({
      type: 'success',
      text1: 'Logout Akun Berhasil.',
    });
  } catch (err) {
    Toast.show({
      type: 'error',
      text1: err.response.data.msg,
    });
  }
};
