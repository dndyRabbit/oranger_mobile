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

import Toast from 'react-native-toast-message';
import {getReport, postReport} from '../../../redux/actions/reportAction';
import {getRuteLocation} from '../../../redux/actions/locationAction';

const Report = ({navigation, route}) => {
  const {label} = route.params;

  const dispatch = useDispatch();

  const {location, alert, auth, report} = useSelector(state => state);
  const [isExist, setIsExist] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [photo, setPhoto] = useState({
    before: null,
    progress: null,
    after: null,
  });
  const [description, setDescription] = useState('');
  const [rtrw, setRtrw] = useState('');
  const [alamat, setAlamat] = useState('');

  const userReport = useCallback(getReport({auth, setLoading}), []);
  const userLocation = useCallback(getRuteLocation({auth}), []);

  useEffect(() => {
    if (
      location.rute == undefined ||
      location.rute == null ||
      location.rute.length < 1
    ) {
      dispatch(userLocation);
    }
    if (
      report.report == undefined ||
      report.report == null ||
      report.report.length < 1
    ) {
      dispatch(userReport);
    }

    console.log(report.report);
  }, []);

  const today = format(new Date(new Date()), 'yyyy-MM-dd');

  const handleChangeBeforePhoto = () => {
    ImagePicker.openPicker({
      width: 600,
      height: 500,
      compressImageQuality: 0.5,
      cropping: true,
    })
      .then(image => {
        const err = checkImage(image);

        if (err) return setError(err);

        setPhoto({
          ...photo,
          before: {
            uri: image.path,
            type: image.mime,
            name: `before.${image.path.split('.')[1]}`,
          },
        });
      })
      .catch(err => console.log(err));
  };

  const handleChangeProgressPhoto = () => {
    ImagePicker.openPicker({
      width: 600,
      height: 500,
      compressImageQuality: 0.5,
      cropping: true,
    })
      .then(image => {
        const err = checkImage(image);

        if (err) return setError(err);

        setPhoto({
          ...photo,
          progress: {
            uri: image.path,
            type: image.mime,
            name: `before.${image.path.split('.')[1]}`,
          },
        });
      })
      .catch(err => console.log(err));
  };

  const handleChangeAfterPhoto = () => {
    ImagePicker.openPicker({
      width: 600,
      height: 500,
      compressImageQuality: 0.5,
      cropping: true,
    })
      .then(image => {
        const err = checkImage(image);

        if (err) return setError(err);

        setPhoto({
          ...photo,
          after: {
            uri: image.path,
            type: image.mime,
            name: `before.${image.path.split('.')[1]}`,
          },
        });
      })
      .catch(err => console.log(err));
  };

  const handleSubmit = () => {
    if (
      location.rute == undefined ||
      location.rute == null ||
      location.rute.length < 1
    ) {
      return Toast.show({
        type: 'info',
        text1: 'Mohon refresh halaman ini.',
      });
    }
    if (
      photo.before &&
      photo.progress &&
      photo.after &&
      description &&
      alamat &&
      rtrw
    ) {
      dispatch(
        postReport({
          auth,
          role: location?.rute?.role,
          userId: auth.user._id,
          before: photo.before,
          progress: photo.progress,
          after: photo.after,
          date: today,
          description: description,
          rtrw: rtrw,
          alamat: alamat,
          setPhoto,
          setDescription,
          setLoading,
        }),
      );
    } else {
      Toast.show({
        type: 'info',
        text1: 'Mohon semua data di isi.',
      });
    }
  };

  const renderInput = () => {
    return (
      <View style={{flex: 1}}>
        <Text style={{...FONTS.body3, marginBottom: 10}}>Foto Sebelum</Text>

        {/* 0% */}
        <TouchableOpacity
          onPress={() => handleChangeBeforePhoto()}
          activeOpacity={0.5}
          style={{
            borderWidth: 1,
            borderColor: COLORS.primary,
            width: '100%',
            height: 200,
            marginBottom: 10,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{
              uri: photo?.before?.uri,
            }}
            style={{
              height: 190,
              width: '95%',
            }}
            resizeMode="cover"
          />
          {!photo?.before?.uri && (
            <Icon
              name="camera-plus-outline"
              size={25}
              color={COLORS.primary}
              style={{position: 'absolute'}}
            />
          )}
        </TouchableOpacity>

        {/* 50%  */}
        <Text style={{...FONTS.body3, marginBottom: 10}}>Foto Progress</Text>
        <TouchableOpacity
          onPress={() => handleChangeProgressPhoto()}
          activeOpacity={0.5}
          style={{
            borderWidth: 1,
            borderColor: COLORS.primary,
            width: '100%',
            height: 200,
            borderRadius: 5,
            padding: 5,
            marginBottom: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{
              uri: photo?.progress?.uri,
            }}
            style={{
              height: 190,
              width: '95%',
            }}
            resizeMode="cover"
          />
          {!photo?.progress?.uri && (
            <Icon
              name={'camera-plus-outline'}
              size={25}
              color={COLORS.primary}
              style={{position: 'absolute'}}
            />
          )}
        </TouchableOpacity>

        {/* 100%  */}
        <Text style={{...FONTS.body3, marginBottom: 10}}>Foto Sesudah</Text>
        <TouchableOpacity
          onPress={() => handleChangeAfterPhoto()}
          activeOpacity={0.5}
          style={{
            borderWidth: 1,
            borderColor: COLORS.primary,
            width: '100%',
            height: 200,
            borderRadius: 5,
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{
              uri: photo?.after?.uri,
            }}
            style={{
              height: 190,
              width: '95%',
            }}
            resizeMode="cover"
          />
          {!photo?.after?.uri && (
            <Icon
              name="camera-plus-outline"
              size={25}
              color={COLORS.primary}
              style={{position: 'absolute'}}
            />
          )}
        </TouchableOpacity>

        <TextInput
          placeholder={'Deskripsi pekerjaan...'}
          onChangeText={text => setDescription(text)}
          value={description}
          placeholderTextColor={`${COLORS.primary}88`}
          style={{
            borderWidth: 1,
            borderColor: COLORS.primary,
            width: '100%',
            paddingVertical: 5,
            fontSize: 14,
            color: '#000',
            marginTop: 20,
            borderRadius: 5,
          }}
        />
        <TextInput
          placeholder={'Alamat...'}
          onChangeText={text => setAlamat(text)}
          value={alamat}
          placeholderTextColor={`${COLORS.primary}88`}
          style={{
            borderWidth: 1,
            borderColor: COLORS.primary,
            width: '100%',
            paddingVertical: 5,
            fontSize: 14,
            color: '#000',
            marginTop: 20,
            borderRadius: 5,
          }}
        />
        <TextInput
          placeholder={'RT/RW...'}
          onChangeText={text => setRtrw(text)}
          value={rtrw}
          placeholderTextColor={`${COLORS.primary}88`}
          style={{
            borderWidth: 1,
            borderColor: COLORS.primary,
            width: '100%',
            paddingVertical: 5,
            fontSize: 14,
            color: '#000',
            marginTop: 20,
            borderRadius: 5,
          }}
        />

        <TouchableOpacity
          onPress={() => handleSubmit()}
          disabled={loading ? true : false}
          style={{
            marginVertical: 20,
            width: '100%',
            height: 40,
            borderRadius: 10 / 2,
            backgroundColor: loading ? 'grey' : COLORS.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <Text
              style={{
                fontSize: 14,
                color: '#fff',
                fontWeight: 'bold',
              }}>
              Submit
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const ReportingDoneView = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={[
            {...FONTS.h3},
            {
              fontSize: 14,
              fontWeight: 'bold',
              color: 'grey',
            },
          ]}>
          ANDA SUDAH MELAKUKAN REPORTING PEKERJAAN
        </Text>
        <Text
          style={[
            {...FONTS.h3},
            {
              fontSize: 14,
              fontWeight: 'bold',
              color: 'grey',
            },
          ]}>
          PADA TANGGAL {format(new Date(), 'dd/MM/yyyy')}
        </Text>
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
          ) : report?.report?.hasOwnProperty('role') ? (
            <ReportingDoneView />
          ) : (
            renderInput()
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

export default Report;
