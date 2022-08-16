import {showMessage} from 'react-native-flash-message';
import {PermissionsAndroid, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';

export const getMyCurrentLocation = () =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const coords = {
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
          heading: position?.coords?.heading,
        };
        resolve(coords);
      },
      error => reject(error.message),
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 3600000},
    );
  });

export const requestFineLocation = async () => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
};
