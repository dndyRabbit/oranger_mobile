import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './appStack';
import AuthStack from './authStack';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GLOBALTYPES} from '../redux/actions/globalTypes';
import {petugasData} from '../redux/actions/petugasAction';
import {refreshToken} from '../redux/actions/authAction';

const Routes = () => {
  const {petugas, auth} = useSelector(state => state);

  const dispatch = useDispatch();

  const nani = 'asdas';

  useEffect(() => {
    const firstLogin = AsyncStorage.getItem('accessToken');
    const rf_token = AsyncStorage.getItem('refreshToken');
    dispatch(refreshToken({firstLogin, rf_token: rf_token}));
  }, [dispatch, auth.token]);
  return (
    <NavigationContainer>
      {/* {auth.token ? <AppStack /> : <AuthStack />} */}
      <AuthStack />
      {/* <AppStack /> */}
    </NavigationContainer>
  );
};

export default Routes;
