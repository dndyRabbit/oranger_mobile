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
  Alert,
} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {GLOBALTYPES} from '../../redux/actions/globalTypes';
import {register} from '../../redux/actions/authAction';
import {valid2} from '../../utils/valid';

import {format} from 'date-fns';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';

const Register2 = ({navigation, route}) => {
  const data = route.params;

  const initialState = {
    fullName: '',
    ktp: '',
    gender: '',
    address: '',
    birthday: new Date(),
    handphone: '',
  };
  const [newData, setNewData] = useState(initialState);
  const [open, setOpen] = useState(false);
  const {fullName, ktp, gender, address, birthday, handphone} = newData;

  const {email, password} = data.userData;

  const {alert} = useSelector(state => state);

  const dispatch = useDispatch();

  const handleSubmitRegister = () => {
    const value = {
      ...newData,
      email,
      password,
    };
    console.log(value);
    const check = valid2(newData);
    if (check.errLength > 0)
      return dispatch({type: GLOBALTYPES.ALERT, payload: check.errMsg});

    dispatch({type: GLOBALTYPES.ALERT, payload: {}});
    dispatch(register(value));

    navigation.replace('Login');
    Alert.alert(
      'Registrasi Success',
      'Silahkan mengkontak Admin untuk menyetujui regristasi pasukan oranye',
    );
  };

  const renderRegisterInput = () => {
    return (
      <View style={{width: '100%', marginVertical: 20}}>
        <View
          style={{
            width: '100%',
          }}>
          <Text style={{fontSize: 12, color: COLORS.primary}}>
            Nama Lengkap
          </Text>
          <TextInput
            value={fullName}
            onChangeText={text => setNewData({...newData, fullName: text})}
            placeholder="Nama Lengkap..."
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
          {alert?.fullName && (
            <Text
              style={{
                color: '#ff0000',
                fontSize: 10,

                textAlign: 'right',
              }}>
              *{alert.fullName}
            </Text>
          )}
        </View>
        <View style={{marginBottom: 10}}>
          {/* {alert.namaLengkap && (
            <Text style={{fontSize: 12, color: '#FFB818'}}>
              *{alert.namaLengkap}
            </Text>
          )} */}
        </View>
        {/* ------------------------------------------------------------ */}
        <View
          style={{
            width: '100%',
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 12, color: COLORS.primary}}>No KTP</Text>
          <TextInput
            value={ktp}
            onChangeText={text => setNewData({...newData, ktp: text})}
            placeholder="No KTP..."
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
          {alert?.ktp && (
            <Text
              style={{
                color: '#ff0000',
                fontSize: 10,

                textAlign: 'right',
              }}>
              *{alert.ktp}
            </Text>
          )}
        </View>
        {/* ------------------------------------------------------------ */}
        <Text style={{fontSize: 12, color: COLORS.primary}}>
          Pilih Jenis kelamin
        </Text>
        <Picker
          selectedValue={gender}
          dropdownIconColor={COLORS.primary}
          style={{
            color: COLORS.primary,
          }}
          onValueChange={(itemValue, itemIndex) =>
            setNewData({...newData, gender: itemValue})
          }>
          <Picker.Item
            style={{fontSize: 14}}
            label="Jenis kelamin..."
            value=""
          />
          <Picker.Item
            style={{fontSize: 14}}
            label="Laki-laki"
            value="lakiLaki"
          />
          <Picker.Item
            style={{fontSize: 14}}
            label="Perempuan"
            value="perempuan"
          />
        </Picker>
        <View style={{marginBottom: 10}}>
          {alert?.gender && (
            <Text
              style={{
                color: '#ff0000',
                fontSize: 10,

                textAlign: 'right',
              }}>
              *{alert.gender}
            </Text>
          )}
        </View>
        {/* ------------------------------------------------------------ */}
        <View
          style={{
            width: '100%',
          }}>
          <Text style={{fontSize: 12, color: COLORS.primary}}>
            Alamat Lengkap
          </Text>
          <TextInput
            value={address}
            onChangeText={text => setNewData({...newData, address: text})}
            placeholder="Alamat Lengkap..."
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
        <View style={{marginBottom: 10}}>
          {alert?.address && (
            <Text
              style={{
                color: '#ff0000',
                fontSize: 10,
                textAlign: 'right',
              }}>
              *{alert.address}
            </Text>
          )}
        </View>
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
            {format(new Date(birthday), 'yyyy-MM-dd')}
          </Text>
        </TouchableOpacity>
        <DatePicker
          locale="id"
          modal
          mode="date"
          open={open}
          date={birthday}
          textColor="#fff"
          onConfirm={date => {
            setOpen(false);
            setNewData({...newData, birthday: date});
            console.log(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <View style={{marginBottom: 10}}>
          {alert?.birthday && (
            <Text
              style={{
                color: '#ff0000',
                fontSize: 10,
                textAlign: 'right',
              }}>
              *{alert.birthday}
            </Text>
          )}
        </View>
        {/* ------------------------------------------------------------ */}
        <View
          style={{
            width: '100%',
          }}>
          <Text style={{fontSize: 12, color: COLORS.primary}}>
            No. Handphone
          </Text>
          <TextInput
            value={handphone}
            onChangeText={text => setNewData({...newData, handphone: text})}
            placeholder="No Handphone..."
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
        <View style={{marginBottom: 10}}>
          {alert?.handphone && (
            <Text
              style={{
                color: '#ff0000',
                fontSize: 10,
                textAlign: 'right',
              }}>
              *{alert.handphone}
            </Text>
          )}
        </View>
        {/* ------------------------------------------------------------ */}
        <View style={{marginBottom: 10}}>
          {/* {alert.kelurahan && (
            <Text style={{fontSize: 12, color: '#FFB818'}}>
              *{alert.kelurahan}
            </Text>
          )} */}
        </View>
        {/* ------------------------------------------------------------ */}
        <TouchableOpacity
          onPress={() => handleSubmitRegister()}
          style={{
            marginVertical: 20,
            width: '100%',
            height: 50,
            borderRadius: 50 / 2,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 14, color: '#fff', fontWeight: 'bold'}}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const RenderBackButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack(), dispatch({type: GLOBALTYPES.ALERT, payload: {}});
        }}
        style={{width: '30%', marginLeft: -30}}>
        <View
          style={{
            padding: 10,
            backgroundColor: COLORS.primary,
            borderTopRightRadius: 1000,
            borderBottomRightRadius: 1000,
            flexDirection: 'row',
          }}>
          <Icon size={15} name="arrow-left" color="#fff" />
          <Text
            style={{
              color: '#fff',
              alignSelf: 'flex-end',
              marginLeft: 15,
              fontSize: 14,
            }}>
            Kembali
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.body}>
          <RenderBackButton />
          {renderRegisterInput()}
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
  body: {
    flex: 1,
    margin: 20,
  },
});

export default Register2;
