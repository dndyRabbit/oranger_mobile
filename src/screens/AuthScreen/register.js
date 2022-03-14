import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {COLORS, SIZES, FONTS, images} from '../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {valid} from '../../utils/valid';
import {useDispatch, useSelector} from 'react-redux';
import {GLOBALTYPES} from '../../redux/actions/globalTypes';

const Register = ({navigation}) => {
  const initialState = {email: '', password: '', password_confirmation: ''};

  const [userData, setUserData] = useState(initialState);
  const {email, password, password_confirmation} = userData;

  const {alert} = useSelector(state => state);

  const dispatch = useDispatch();

  const nextPage = () => {
    const check = valid(userData);
    console.log(alert);
    if (check.errLength > 0)
      return dispatch({type: GLOBALTYPES.ALERT, payload: check.errMsg});

    navigation.navigate('Register2', {userData});
    dispatch({type: GLOBALTYPES.ALERT, payload: {}}, console.log(alert));
  };

  const RenderHeader = () => {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          height: 200,
          backgroundColor: 'blue',
        }}>
        <Text style={{...FONTS.largeTitle}}>Register</Text>
      </View>
    );
  };
  const renderRegisterInput = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          width: '100%',
        }}>
        <View style={{width: '100%'}}>
          <Text style={{color: '#000', fontSize: 12, color: COLORS.primary}}>
            Email
          </Text>
          <TextInput
            value={email}
            onChangeText={text => setUserData({...userData, email: text})}
            placeholder="Email"
            placeholderTextColor={'#9D9D9D'}
            keyboardType="email-address"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.primary,
              width: '100%',
              paddingVertical: 10,
              marginBottom: 10,
              color: '#000',
            }}
          />
          {alert?.email && (
            <Text
              style={{
                marginTop: -10,
                color: '#ff0000',
                fontSize: 10,

                textAlign: 'right',
              }}>
              *{alert.email}
            </Text>
          )}
        </View>

        <View style={{width: '100%'}}>
          <Text style={{color: '#000', fontSize: 12, color: COLORS.primary}}>
            Password
          </Text>
          <TextInput
            value={password}
            onChangeText={text => setUserData({...userData, password: text})}
            // secureTextEntry={toggle}
            placeholder="Password"
            placeholderTextColor={'#9D9D9D'}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.primary,
              width: '100%',
              paddingVertical: 10,
              marginBottom: 10,
              color: '#000',
            }}
          />
          {alert?.password && (
            <Text
              style={{
                marginTop: -10,
                color: '#ff0000',
                fontSize: 10,

                textAlign: 'right',
              }}>
              *{alert.password}
            </Text>
          )}
        </View>
        <View style={{width: '100%'}}>
          <Text style={{color: '#000', fontSize: 12, color: COLORS.primary}}>
            Password Confirmation
          </Text>
          <TextInput
            value={password_confirmation}
            onChangeText={text =>
              setUserData({...userData, password_confirmation: text})
            }
            // secureTextEntry={toggle}
            placeholder="Password Konfirmasi"
            placeholderTextColor={'#9D9D9D'}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.primary,
              width: '100%',
              paddingVertical: 10,
              marginBottom: 10,
              color: '#000',
            }}
          />
          {alert?.cf_password && (
            <Text
              style={{
                marginTop: -10,
                color: '#ff0000',
                fontSize: 10,

                textAlign: 'right',
              }}>
              *{alert.cf_password}
            </Text>
          )}
        </View>

        <TouchableOpacity
          onPress={() => nextPage()}
          style={{
            width: '50%',
            marginTop: 20,
            padding: 10,
            borderRadius: 50 / 2,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: 'row',
          }}>
          <Text
            style={{fontSize: 14, fontWeight: '700', color: COLORS.secondary}}>
            Selanjutnya
          </Text>
          <Icon size={20} name="chevron-right" color="yellow" />
        </TouchableOpacity>
      </View>
    );
  };

  const LoginButton = () => {
    return (
      <View style={{alignItems: 'center', flexDirection: 'row', marginTop: 10}}>
        <Text style={{fontSize: 14, color: '#000'}}>
          Sudah punya akun Oranger?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{fontSize: 12, color: COLORS.primary}}>Login yuk!</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, padding: 20, alignItems: 'center'}}>
        <RenderHeader />
        {renderRegisterInput()}
        <LoginButton />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
});

export default Register;
