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
import {postReport} from '../../../redux/actions/reportAction';

const Report = ({navigation, route}) => {
  const {label} = route.params;

  const dispatch = useDispatch();

  const {location, alert, auth, report} = useSelector(state => state);

  const [photo, setPhoto] = useState({
    before: '',
    progress: '',
    after: '',
  });
  const [description, setDescription] = useState('');

  if (report.report) {
    console.log('Ada');
  } else {
    console.log('Tidak ada');
  }

  console.log(alert);
  console.log(report);
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

        if (err)
          return dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err},
          });

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
      height: 300,
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
      height: 300,
      compressImageQuality: 0.5,
    })
      .then(image => {
        const err = checkImage(image);
        console.log(err);
        if (err)
          return dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err},
          });

        setPhoto({
          ...photo,
          after: {
            uri: image.path,
            type: image.mime,
            name: `after.${image.path.split('.')[1]}`,
          },
        });
      })
      .catch(err => console.log(err));
  };

  const handleSubmit = () => {
    console.log({
      auth,
      role: location?.rute?.[0].role,
      userId: auth.user._id,
      before: photo.before,
      progress: photo.progress,
      after: photo.after,
      date: today,
      wilayah: location?.rute?.[0].wilayahId,
      description: description,
    });
    dispatch(
      postReport({
        auth,
        role: location?.rute?.[0].role,
        userId: auth.user._id,
        before: photo.before,
        progress: photo.progress,
        after: photo.after,
        date: today,
        wilayah: location?.rute?.[0].wilayahId,
        description: description,
        setPhoto,
        setDescription,
      }),
    );
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
          placeholder={'Deskripsi pekerjaan.....'}
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

        <TouchableOpacity
          onPress={() => handleSubmit()}
          disabled={alert.loading || report.report ? true : false}
          style={{
            marginVertical: 20,
            width: '100%',
            height: 40,
            borderRadius: 10 / 2,
            backgroundColor: report.report ? '#d1d1d1' : COLORS.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {alert.loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <Text
              style={{
                fontSize: 14,
                color: '#fff',
                fontWeight: 'bold',
              }}>
              {report.report ? 'Sudah melakukan report' : 'Submit'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{flex: 1, padding: 20}}>
          <RenderHeader txt={label} back={true} navigation={navigation} />
          {renderInput()}
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
