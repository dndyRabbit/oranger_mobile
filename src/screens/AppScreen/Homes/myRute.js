import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {COLORS, FONTS, images} from '../../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import RenderHeader from '../../../components/Headers';
import {getRuteLocation} from '../../../redux/actions/locationAction';

const MyRute = ({navigation, route}) => {
  const dispatch = useDispatch();

  const {label} = route.params;

  const {location, auth} = useSelector(state => state);

  const [loading, setLoading] = useState(false);

  const userLocation = useCallback(getRuteLocation({auth, setLoading}), []);

  useEffect(() => {
    if (
      location.rute == undefined ||
      location.rute == null ||
      location.rute.length < 1
    ) {
      dispatch(userLocation);
    }
    console.log(location.rute);
  }, []);

  const RenderBody = () => {
    return (
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: COLORS.primary,
          borderRadius: 5,
          padding: 10,
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Image
            source={{uri: location?.rute?.userId?.avatar}}
            style={{
              width: 80,
              height: 80,
              borderRadius: 80 / 2,
              marginRight: 10,
            }}
            resizeMode="cover"
          />
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <Text style={{...FONTS.body3, textTransform: 'capitalize'}}>
              {location?.rute?.userId?.fullName}
            </Text>
            <Text
              style={{
                ...FONTS.body3,
                textTransform: 'capitalize',
                color: 'grey',
              }}>
              {location?.rute?.role}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            borderBottomColor: COLORS.primary,
            borderBottomWidth: 1,
            marginVertical: 20,
          }}
        />
        <View style={{flex: 1}}>
          <Text
            style={{
              ...FONTS.body3,
              alignSelf: 'center',
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            Wilayah Saya
          </Text>
          <View style={{flex: 1, alignItems: 'center', marginBottom: 10}}>
            <Text
              style={{
                ...FONTS.h4,
                textTransform: 'capitalize',
                marginBottom: 10,
                color: 'grey',
                fontWeight: '100',
                fontSize: 14,
              }}>
              {location?.rute?.wilayahId?.wilayahAwal} -{' '}
              {location?.rute?.wilayahId?.wilayahAkhir}
            </Text>
            <Text
              style={{
                ...FONTS.h4,
                textTransform: 'capitalize',
                color: 'grey',
                fontWeight: '100',
                fontSize: 14,
              }}>
              {location?.rute?.wilayahId?.alamat}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: 'center',

              justifyContent: 'center',
            }}>
            <Text
              style={{
                ...FONTS.h4,
                textTransform: 'capitalize',
                color: 'grey',
                fontWeight: '100',
                fontSize: 14,
              }}>
              latitude :
              {location?.rute?.wilayahId?.latitude ||
                'Daerah ini tidak memiliki latitude'}
            </Text>
            <Text
              style={{
                ...FONTS.h4,
                textTransform: 'capitalize',
                marginBottom: 10,
                color: 'grey',
                fontWeight: '100',
                fontSize: 14,
              }}>
              longitude :
              {location?.rute?.wilayahId?.longitude ||
                'Daerah ini tidak memiliki latitude'}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{flex: 1, padding: 20}}>
          <RenderHeader txt={label} back={true} navigation={navigation} />
          {loading ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={'large'} color={COLORS.primary} />
            </View>
          ) : (
            <RenderBody />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default MyRute;
