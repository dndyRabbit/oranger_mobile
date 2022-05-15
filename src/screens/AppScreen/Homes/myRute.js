import React, {useState, useEffect, useRef} from 'react';
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
} from 'react-native';
import {COLORS, FONTS, images} from '../../../constants';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useDispatch, useSelector} from 'react-redux';

import RenderHeader from '../../../components/Headers';

const MyRute = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {label} = route.params;

  const {location} = useSelector(state => state);

  const myRute = location?.rute?.[0];

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  console.log(location);

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
            source={{uri: myRute?.userId?.avatar}}
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
              {myRute?.userId?.fullName}
            </Text>
            <Text
              style={{
                ...FONTS.body3,
                textTransform: 'capitalize',
                color: 'grey',
              }}>
              {myRute?.role}
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
                ...FONTS.body4,
                textTransform: 'capitalize',
              }}>
              {myRute?.wilayahId?.wilayahAwal} -{' '}
              {myRute?.wilayahId?.wilayahAkhir}
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                textTransform: 'capitalize',
              }}>
              {myRute?.wilayahId?.alamat}
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
                ...FONTS.body4,
                textTransform: 'capitalize',
              }}>
              latitude : {myRute?.wilayahId?.latitude}
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                textTransform: 'capitalize',

                marginBottom: 10,
              }}>
              longitude : {myRute?.wilayahId?.latitude}
            </Text>
            <TouchableOpacity>
              <Text style={{...FONTS.body2, color: COLORS.primary}}>
                Go to Maps
              </Text>
            </TouchableOpacity>
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
          <RenderBody />
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
