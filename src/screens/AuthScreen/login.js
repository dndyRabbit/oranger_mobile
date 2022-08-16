import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {COLORS, SIZES, FONTS, images} from '../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {login} from '../../redux/actions/authAction';
import {useDispatch, useSelector} from 'react-redux';

const Login = ({navigation}) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const {email, password} = userData;
  const [toggle, setToggle] = useState(true);
  const [loading, setLoading] = useState(false);

  const {alert, auth} = useSelector(state => state);
  console.log(auth);

  const dispatch = useDispatch();

  const handleToggle = () => {
    setToggle(prev => (prev === false ? true : false));
  };

  const RenderHeader = () => {
    return (
      <View
        style={{
          width: '100%',
          alignItems: 'center',

          maxHeight: 300,
        }}>
        <Image
          source={images.logoOranger}
          style={{width: 220, maxHeight: 220}}
          resizeMode="contain"
        />
        <Text style={{...FONTS.largeTitle}}>Login</Text>
      </View>
    );
  };
  const renderLoginInput = () => {
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
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.primary,
              width: '100%',
              paddingVertical: 10,
              marginBottom: 10,
              color: '#000',
            }}
          />
        </View>

        <View style={{width: '100%'}}>
          <Text style={{color: '#000', fontSize: 12, color: COLORS.primary}}>
            Password
          </Text>
          <TextInput
            value={password}
            onChangeText={text => setUserData({...userData, password: text})}
            secureTextEntry={toggle}
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
          {password ? (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{marginTop: -5, alignSelf: 'flex-end'}}
              onPress={() => handleToggle()}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 12,
                  color: COLORS.primary,
                  textAlign: 'right',
                }}>
                {toggle ? 'Show Password' : 'Hide Password'}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity
          onPress={() => dispatch(login(userData, setLoading))}
          style={{
            width: '80%',
            marginTop: 20,
            padding: 10,
            borderRadius: 50 / 2,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{fontSize: 14, fontWeight: '700', color: COLORS.secondary}}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const RegisterButton = () => {
    return (
      <View style={{alignItems: 'center', flexDirection: 'row', marginTop: 10}}>
        <Text style={{fontSize: 14, color: '#000'}}>
          Tidak punya akun Oranger?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{fontSize: 12, color: COLORS.primary}}>
            Register yuk!
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const RenderLoading = () => {
    return (
      <View
        style={{
          backgroundColor: '#000',
          opacity: 0.5,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          position: 'absolute',
          justifyContent: 'center',
          zIndex: 100,
        }}>
        <ActivityIndicator size={'large'} color="#000" />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, padding: 20, alignItems: 'center'}}>
        <RenderHeader />
        {renderLoginInput()}
        <RegisterButton />
      </View>
      {loading && <RenderLoading />}
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

export default Login;
