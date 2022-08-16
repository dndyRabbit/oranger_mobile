import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './appStack';
import AuthStack from './authStack';
import {useDispatch, useSelector} from 'react-redux';
import {refreshToken} from '../redux/actions/authAction';
import {getMyCurrentLocation, requestFineLocation} from '../helper/mapHelp';
import {postUserLocation} from '../redux/actions/locationAction';

const Routes = () => {
  const [liveLoc, setLiveLoc] = useState(null);
  const {auth, location} = useSelector(state => state);

  const dispatch = useDispatch();

  const getLiveLocation = async () => {
    const locPermissionDenied = await requestFineLocation();
    if (locPermissionDenied) {
      const {latitude, longitude} = await getMyCurrentLocation();

      if (latitude && longitude) {
        setLiveLoc({
          latLngs: [latitude, longitude],
        });
      }
    }
  };

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 1000); //every 2 minute send a location

    return () => clearInterval(interval);
  }, [auth?.token]);

  useEffect(() => {
    const interval = setInterval(() => {
      // di isi dengna dispatch
      if (auth.token) {
        dispatch(postUserLocation({auth, liveLoc}));
      }
      console.log(liveLoc, 'THISIS LIVE LOC');
    }, 1000 * 5); //every 1 minute 1 second to send a location
    return () => clearInterval(interval);
  }, [auth.token]);

  return (
    <NavigationContainer>
      {auth?.token ? <AppStack /> : <AuthStack />}
      {/* <AppStack /> */}
      {/* <AuthStack /> */}
    </NavigationContainer>
  );
};

export default Routes;
