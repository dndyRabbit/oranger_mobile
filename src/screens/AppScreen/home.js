import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {COLORS, SIZES, FONTS, images} from '../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {login} from '../../redux/actions/authAction';
import {useDispatch, useSelector} from 'react-redux';
import Nav from '../../components/HomeNav';
import RenderHeader from '../../components/Headers';
import {getRuteLocation} from '../../redux/actions/locationAction';
import {getReport} from '../../redux/actions/reportAction';
import PushNotification from 'react-native-push-notification';
import {
  getUserPermission,
  getUserPermissionIsApproved,
} from '../../redux/actions/permissionAction';
import {getAbsenToday} from '../../redux/actions/absenAction';
import {REACT_NATIVE_BASE_URL} from '../../utils/url';
import {getMyCurrentLocation, requestFineLocation} from '../../helper/mapHelp';
import Geolocation from 'react-native-geolocation-service';

const Home = ({navigation}) => {
  const {auth, location, report, permission, permissionApproved, absensi} =
    useSelector(state => state);

  const [state, setState] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token) {
      dispatch(getRuteLocation({auth}));
      dispatch(getReport({auth}));
      dispatch(getUserPermission({auth, userId: auth.user._id}));
      dispatch(getUserPermissionIsApproved({auth, userId: auth.user._id}));
      dispatch(getAbsenToday({auth}));
    }
  }, [auth.token]);

  //Get location user

  const getLiveLocation = async () => {
    const locPermissionDenied = await requestFineLocation();
    if (locPermissionDenied) {
      const {latitude, longitude} = await getMyCurrentLocation();

      if (latitude && longitude) {
        setState({
          curLoc: {
            latitude,
            longitude,
          },
          author: auth.user.namaLengkap,
          time:
            new Date(Date.now()).getHours() +
            ':' +
            new Date(Date.now()).getMinutes(),
          id: auth.user._id,
        });
      }
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getLiveLocation();
  //   }, 6000); //every 2 minute send a location
  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   if (state) {
  //     const interval = setInterval(() => {
  //       // di isi dengna dispatch
  //     }, 6000); //every 2 minute send a location
  //     return () => clearInterval(interval);
  //   }
  // }, [state]);

  console.log('location: ', location?.rute?.[0]);
  console.log('report', report);
  console.log('permission', permission);
  console.log(permissionApproved);
  console.log('this is absensi', absensi);

  const handleChangeNav = item => {
    console.log(item.name);
    navigation.navigate(item.name, {label: item.label});
  };

  return (
    <SafeAreaView style={styles.container}>
      <RenderHeader txt="Welcome Home Pasukan Oranye" img={true} />
      <Nav handleChangeNav={handleChangeNav} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    margin: 20,
  },
});

export default Home;
