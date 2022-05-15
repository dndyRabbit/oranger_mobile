import {GLOBALTYPES} from './globalTypes';
import {getDataAPI, postDataAPI} from '../../utils/fetchData';
import valid from '../../utils/valid';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = data => async dispatch => {
  try {
    dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});
    console.log(data);

    const res = await postDataAPI('login', data);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        rf_token: res.data.refresh_token,
        user: res.data.user,
      },
    });

    console.log(res.msg);

    await EncryptedStorage.setItem('accessToken', res.data.access_token);
    await EncryptedStorage.setItem(
      'refreshToken',
      JSON.stringify({
        rf_token: res.data.refresh_token,
        email: res.data.user.email,
      }),
    );

    // await EncryptedStorage.removeItem('refreshToken');

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const refreshToken = () => async dispatch => {
  dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});

  try {
    const session = await EncryptedStorage.getItem('refreshToken');
    if (!session)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {error: 'Theres no session please login again!'},
      });
    const obj = JSON.parse(session);
    console.log(obj);
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
    dispatch({type: GLOBALTYPES.ALERT, payload: {}});
  } catch (err) {
    console.log(err);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {error: err.response.data.msg},
    });
  }
};

export const register = data => async dispatch => {
  try {
    dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});

    const res = await postDataAPI('register', data);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
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
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
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
      type: GLOBALTYPES.ALERT,
      payload: {msg: 'Logout success!'},
    });
    await postDataAPI('logout');
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};
