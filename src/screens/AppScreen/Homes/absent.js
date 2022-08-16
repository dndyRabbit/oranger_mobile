import React, {useState, useEffect, useCallback} from 'react';
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

import {
  getAbsenToday,
  patchAbsenIn,
  patchAbsenOut,
} from '../../../redux/actions/absenAction';

const Absent = ({navigation, route}) => {
  const {label} = route.params;
  const [photo, setPhoto] = useState('');
  const [photo2, setPhoto2] = useState('');
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const [dateDatas, setDate] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    today: new Date(),
  });

  const dispatch = useDispatch();
  const {alert, auth, absensi} = useSelector(state => state);

  const userAbsenToday = useCallback(
    getAbsenToday({auth, date: dateDatas.date, setLoading}),
    [],
  );

  const absenIn = absensi?.absensi?.absenIn;
  const absenOut = absensi?.absensi?.absenOut;
  const statusAbsen = absensi?.absensi?.statusAbsen;

  useEffect(() => {
    dispatch(userAbsenToday);

    console.log(absensi.absensi, 'THIS IS ABSENSI DATA');
  }, []);

  useEffect(() => {
    setDate({
      ...dateDatas,
      today: new Date(),
    });
    console.log('JAM SEKARANG');
  }, [dateDatas.date]);

  const handleTakeASelfie = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 800,
      compressImageQuality: 0.5,
    })
      .then(image => {
        const err = checkImage(image);

        if (err) return setError(err);

        setPhoto({
          uri: image.path,
          type: image.mime,
          name: `before.${image.path.split('.')[1]}`,
        });
      })
      .catch(err => console.log(err));
  };

  const handleTakeASelfieOut = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 800,
      compressImageQuality: 0.5,
    })
      .then(image => {
        const err = checkImage(image);

        if (err) return setError(err);

        setPhoto2({
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
        hour: dateDatas.today.getHours() + ':' + dateDatas.today.getMinutes(),
        date: dateDatas.date,
        userId: auth?.user?._id,
        auth,
        photo,
        setPhoto,
        setError,
        setLoading,
      }),
    );
  };
  const handleAbsenOut = () => {
    dispatch(
      patchAbsenOut({
        hour: dateDatas.today.getHours() + ':' + dateDatas.today.getMinutes(),
        date: dateDatas.date,
        userId: auth?.user?._id,
        auth,
        statusAbsen: 'Hadir',
        photo2,
        setPhoto2,
        setError,
        setLoading,
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
            disabled={loading ? true : false}
            style={{
              backgroundColor: COLORS.primary,
              paddingVertical: 10,
              width: '100%',
              marginBottom: 10,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <Text style={{...FONTS.body3, color: '#fff'}}>Absen Masuk</Text>
            )}
          </TouchableOpacity>
        )}

        {/* Absen Keluar */}
        <Text style={{...FONTS.body3, fontWeight: 'bold', marginBottom: 5}}>
          Selfie untuk Absen Keluar
        </Text>
        {absenOut || !absenIn ? (
          <View>
            <Text style={{...FONTS.body3}}>
              {absenIn
                ? `Sudah melakukan Absen pada jam ${absenOut}`
                : 'Lakukan Absen Masuk Terlebih Dahulu.'}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => handleTakeASelfieOut()}
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
                uri: photo2.uri,
              }}
              style={{
                height: 300,
                width: '95%',
                borderRadius: 5,
              }}
              resizeMode="cover"
            />
            {!photo2.uri && (
              <Icon
                name="camera-plus-outline"
                size={25}
                color={COLORS.primary}
                style={{position: 'absolute'}}
              />
            )}
          </TouchableOpacity>
        )}

        {photo2?.uri && (
          <TouchableOpacity
            onPress={() => handleAbsenOut()}
            activeOpacity={0.5}
            disabled={loading || !absenIn ? true : false}
            style={{
              backgroundColor: COLORS.primary,
              paddingVertical: 10,
              width: '100%',
              marginBottom: 10,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {loading ? (
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
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}>
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
          ) : absensi?.absensi?.length == 0 ||
            absensi?.absensi == undefined ||
            absensi?.absensi == null ? (
            <View>
              <Text>ADMIN BELUM MEMBUAT ABSENSI</Text>
              <Text>SILAHKAN MENGHUBUNGI ADMIN</Text>
            </View>
          ) : (
            <View style={{flex: 1, padding: 10}}>
              <RenderBody />
            </View>
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
