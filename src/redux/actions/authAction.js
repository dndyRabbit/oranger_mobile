import {GLOBALTYPES} from './globalTypes';
import {getDataAPI, postDataAPI} from '../../utils/fetchData';
import valid from '../../utils/valid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PETUGASTYPES} from './petugasAction';

export const login = data => async dispatch => {
  try {
    dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});
    const res = await postDataAPI('login', data);

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        rftoken: res.data.refresh_token,
        user: res.data.user,
      },
    });

    AsyncStorage.setItem('accessToken', res.data.access_token);
    AsyncStorage.setItem('refreshToken', res.data.refresh_token);

    console.log(res.data.access_token);
    console.log(res.data.refresh_token);
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

export const refreshToken =
  ({rf_token, firstLogin}) =>
  async dispatch => {
    console.log('this is rf_token:', rf_token);
    console.log('this is access_token', firstLogin);

    dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}});

    try {
      const res = await postDataAPI('refresh_token_mobile', rf_token);

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

    // AsyncStorage.setItem('accessToken', res.data.access_token);
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
    AsyncStorage.removeItem('accessToken');
    // localStorage.clear();
    console.log('Logged out');
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {},
    });
    dispatch({
      type: PETUGASTYPES.GET_PETUGAS,
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
