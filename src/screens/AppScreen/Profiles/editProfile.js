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
import DatePicker from 'react-native-date-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {checkImage} from '../../../utils/imageUpload';

import {GLOBALTYPES} from '../../../redux/actions/globalTypes';
import {updateProfilePetugas} from '../../../redux/actions/petugasAction';

const EditProfile = ({navigation}) => {
  const initialState = {
    fullName: '',
    ktp: '',
    address: '',
    birthday: new Date(),
    handphone: '',
  };

  const [newData, setNewData] = useState(initialState);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState('');
  const {fullName, ktp, handphone, address, birthday} = newData;

  const {alert, auth} = useSelector(state => state);

  const dispatch = useDispatch();

  const handleChangePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      const err = checkImage(image);
      console.log(err);
      if (err)
        return dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {error: err},
        });
      console.log(image);
      setAvatar({
        uri: image.path,
        type: image.mime,
        name: `test.${image.path.split('.')[1]}`,
      });
    });
  };

  const handleSubmit = e => {
    // e.preventDefault();
    console.log(newData, avatar);
    dispatch(updateProfilePetugas({newData, auth, avatar, setLoading}));
  };

  const renderInput = () => {
    return (
      <View style={{width: '100%', marginVertical: 20}}>
        <View style={{width: '100%', alignItems: 'center', marginBottom: 20}}>
          <Image
            source={{uri: avatar ? avatar.uri : auth?.user?.avatar}}
            style={{width: 120, height: 120, borderRadius: 120 / 2}}
          />
          <TouchableOpacity
            onPress={() => handleChangePhoto()}
            style={{
              alignItems: 'flex-end',
              backgroundColor: `${COLORS.primary}88`,
              padding: 5,
              paddingHorizontal: 20,
              marginTop: 10,
              borderRadius: 20,
            }}>
            <Text style={{...FONTS.body4, color: '#fff', fontWeight: '300'}}>
              Change Photo
            </Text>
          </TouchableOpacity>
          {/* ----------------------------------------------------------- */}
        </View>
        <View
          style={{
            width: '100%',
          }}>
          <Text style={{fontSize: 12, color: COLORS.primary}}>
            Nama Lengkap
          </Text>
          <TextInput
            placeholder={auth.user.fullName}
            onChangeText={text => setNewData({...newData, fullName: text})}
            value={fullName}
            placeholderTextColor={`${COLORS.primary}88`}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.primary,
              width: '100%',
              paddingVertical: 5,
              fontSize: 14,
              color: '#000',
            }}
          />
        </View>
        <View style={{marginBottom: 10}}></View>
        {/* ------------------------------------------------------------ */}
        <View
          style={{
            width: '100%',
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 12, color: COLORS.primary}}>No KTP</Text>
          <TextInput
            placeholder={auth.user.ktp}
            onChangeText={text => setNewData({...newData, ktp: text})}
            value={ktp}
            placeholderTextColor={`${COLORS.primary}88`}
            maxLength={16}
            keyboardType="number-pad"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.primary,
              width: '100%',
              paddingVertical: 5,
              fontSize: 14,
              color: '#000',
            }}
          />
        </View>
        {/* ------------------------------------------------------------ */}
        <View
          style={{
            width: '100%',
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 12, color: COLORS.primary}}>
            Jenis Kelamin
          </Text>

          <Text
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.primary,
              width: '100%',
              paddingVertical: 5,
              fontSize: 12,
              color: '#000',
            }}>
            {auth.user.gender === '01' ? 'perempuan' : 'laki-laki'}
          </Text>
        </View>
        <View style={{marginBottom: 10}}></View>
        {/* ------------------------------------------------------------ */}
        <View
          style={{
            width: '100%',
          }}>
          <Text style={{fontSize: 12, color: COLORS.primary}}>
            Alamat Lengkap
          </Text>
          <TextInput
            placeholder={auth.user.address}
            onChangeText={text => setNewData({...newData, address: text})}
            value={address}
            placeholderTextColor={`${COLORS.primary}88`}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.primary,
              width: '100%',
              paddingVertical: 5,
              fontSize: 14,
              color: '#000',
            }}
          />
        </View>
        <View style={{marginBottom: 10}}></View>
        {/* ------------------------------------------------------------ */}
        <Text style={{fontSize: 12, color: COLORS.primary}}>Tanggal lahir</Text>
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: COLORS.primary,
            paddingVertical: 10,
          }}>
          <Icon name="calendar-range" size={20} color={COLORS.primary} />
          <Text style={{fontSize: 12, color: COLORS.primary}}>
            {birthday
              ? format(new Date(birthday), 'yyyy-MM-dd')
              : format(new Date(auth?.user?.birthday), 'yyyy-MM-dd')}
          </Text>
        </TouchableOpacity>
        <DatePicker
          locale="id"
          modal
          mode="date"
          open={open}
          date={birthday}
          textColor="#000"
          onConfirm={date => {
            console.log(date);
            setNewData({...newData, birthday: date});
            setOpen(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <View style={{marginBottom: 10}}></View>
        {/* ------------------------------------------------------------ */}
        <View
          style={{
            width: '100%',
          }}>
          <Text style={{fontSize: 12, color: COLORS.primary}}>
            No. Handphone
          </Text>
          <TextInput
            placeholder={auth.user.handphone}
            onChangeText={text => setNewData({...newData, handphone: text})}
            value={handphone}
            placeholderTextColor={`${COLORS.primary}88`}
            keyboardType="number-pad"
            maxLength={13}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.primary,
              width: '100%',
              paddingVertical: 5,
              fontSize: 14,
              color: '#000',
            }}
          />
        </View>
        <View style={{marginBottom: 10}}></View>
        {/* ------------------------------------------------------------ */}

        {/* ------------------------------------------------------------ */}
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={{
            marginVertical: 20,
            width: '100%',
            height: 40,
            borderRadius: 50 / 2,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <Text style={{fontSize: 14, color: '#fff', fontWeight: 'bold'}}>
              Update Profile
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, padding: 20}}>
        <RenderHeader txt="Edit Profile" back={true} navigation={navigation} />
        <ScrollView>{renderInput()}</ScrollView>
      </View>
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

export default EditProfile;
