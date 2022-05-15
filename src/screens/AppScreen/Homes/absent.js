import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {COLORS, SIZES, FONTS, images} from '../../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useDispatch, useSelector} from 'react-redux';
import RenderHeader from '../../../components/Headers';

import {format} from 'date-fns';
import ImagePicker from 'react-native-image-crop-picker';
import {checkImage} from '../../../utils/imageUpload';

import {GLOBALTYPES} from '../../../redux/actions/globalTypes';
import {patchAbsenIn, patchAbsenOut} from '../../../redux/actions/absenAction';

const Absent = ({navigation, route}) => {
  const {label} = route.params;
  const [photo, setPhoto] = useState('');
  const date = format(new Date(new Date()), 'yyyy-MM-dd');
  const today = new Date();

  const dispatch = useDispatch();

  const {alert, auth, absensi} = useSelector(state => state);

  const absenIn = absensi?.absensi.absenIn;
  const absenOut = absensi?.absensi.absenOut;
  const statusAbsen = absensi?.absensi.statusAbsen;

  console.log(absensi);

  const handleTakeASelfie = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 800,
      compressImageQuality: 0.5,
    })
      .then(image => {
        const err = checkImage(image);

        if (err)
          return dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err},
          });

        setPhoto({
          uri: image.path,
          type: image.mime,
          name: `before.${image.path.split('.')[1]}`,
        });
      })
      .catch(err => console.log(err));
  };

  const handleAbsenIn = () => {
    dispatch(
      patchAbsenIn({
        hour: today.getHours() + ':' + today.getMinutes(),
        date: date,
        userId: auth?.user?._id,
        auth,
        photo,
        setPhoto,
      }),
    );
  };
  const handleAbsenOut = () => {
    dispatch(
      patchAbsenOut({
        hour: today.getHours() + ':' + today.getMinutes(),
        date: date,
        userId: auth?.user?._id,
        auth,
        statusAbsen: 'Hadir',
      }),
    );
  };

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
        <Text
          style={{
            ...FONTS.body5,
            fontWeight: 'bold',
            marginBottom: 5,
            color: statusAbsen === 'Belum Absen' ? 'orange' : 'green',
            textAlign: 'right',
            borderBottomWidth: 1,
            borderBottomColor:
              statusAbsen === 'Belum Absen' ? 'orange' : 'green',
          }}>
          Status Absen: {statusAbsen}
        </Text>
        {/* Absen Masuk */}
        <Text style={{...FONTS.body3, fontWeight: 'bold', marginBottom: 5}}>
          Selfie untuk Absen Masuk
        </Text>
        {absenIn ? (
          <View>
            <Text style={{...FONTS.body3}}>
              Sudah melakukan Absen pada jam {absenIn}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => handleTakeASelfie()}
            activeOpacity={0.5}
            style={{
              borderWidth: 1,
              borderColor: COLORS.primary,
              width: '100%',
              height: 310,
              marginBottom: 10,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={{
                uri: photo.uri,
              }}
              style={{
                height: 300,
                width: '95%',
                borderRadius: 5,
              }}
              resizeMode="cover"
            />
            {!photo.uri && (
              <Icon
                name="camera-plus-outline"
                size={25}
                color={COLORS.primary}
                style={{position: 'absolute'}}
              />
            )}
          </TouchableOpacity>
        )}

        {photo?.uri && (
          <TouchableOpacity
            onPress={() => handleAbsenIn()}
            activeOpacity={0.5}
            disabled={alert.loading ? true : false}
            style={{
              backgroundColor: COLORS.primary,
              paddingVertical: 10,
              width: '100%',
              marginBottom: 10,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {alert.loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <Text style={{...FONTS.body3, color: '#fff'}}>Absen Masuk</Text>
            )}
          </TouchableOpacity>
        )}

        {/* Absen Keluar */}
        <Text
          style={{
            ...FONTS.body3,
            fontWeight: 'bold',
            marginBottom: 5,
            marginTop: 20,
          }}>
          Absen Keluar
        </Text>
        {absenOut ? (
          <View>
            <Text style={{...FONTS.body3}}>
              Sudah melakukan Absen pada jam {absenOut}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => handleAbsenOut()}
            disabled={alert.loading ? true : false}
            activeOpacity={0.5}
            style={{
              backgroundColor: COLORS.primary,
              paddingVertical: 10,
              width: '100%',
              marginBottom: 10,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {alert.loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <Text style={{...FONTS.body3, color: '#fff'}}>Absen Keluar</Text>
            )}
          </TouchableOpacity>
        )}
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
  button: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: `${COLORS.primary}33`,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Absent;
