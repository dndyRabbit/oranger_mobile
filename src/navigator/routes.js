import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './appStack';
import AuthStack from './authStack';
import {useDispatch, useSelector} from 'react-redux';
import {refreshToken} from '../redux/actions/authAction';

const Routes = () => {
  const {auth, location} = useSelector(state => state);

  const dispatch = useDispatch();

  console.log(location);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <NavigationContainer>
      {auth.token ? <AppStack /> : <AuthStack />}
      {/* <AppStack /> */}
    </NavigationContainer>
  );
};

export default Routes;
