import React, {useState, useEffect} from 'react';
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
import {logout} from '../../redux/actions/authAction';
import {useDispatch, useSelector} from 'react-redux';
import RenderHeader from '../../components/Headers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const items = [
  {label: 'Edit Profile', value: 'EditProfile', icon: 'account-outline'},
  {label: 'About', value: 'About', icon: 'information-variant'},
];

const Profile = ({navigation}) => {
  const dispatch = useDispatch();

  const {auth} = useSelector(state => state);
  console.log(auth);
  const handleChangeNav = item => {
    // console.log(item.value);
    navigation.navigate(item.value);
  };

  const importData = async () => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (error, stores) => {
        stores.map((result, i, store) => {
          console.log(result);
          console.log({[store[i][0]]: store[i][1]});
          return true;
        });
      });
    });
  };

  useEffect(() => {
    importData();
  }, []);

  const RenderBody = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <Image
          source={{uri: auth.user.avatar}}
          style={{width: 120, height: 120, borderRadius: 120 / 2}}
          resizeMode="cover"
        />
        <Text style={{...FONTS.body2, marginVertical: 10}}>
          {auth.user.fullName}
        </Text>
        <Text style={{...FONTS.body3}}>{auth.user.role}</Text>
        <Text style={{...FONTS.body4, color: 'grey'}}>{auth.user.email}</Text>
        <Text style={{...FONTS.body4, color: 'grey'}}>
          {auth.user.handphone}
        </Text>
      </View>
    );
  };

  const RenderNav = () => {
    return (
      <View style={{flex: 1}}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => handleChangeNav(item)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name={item.icon}
                size={25}
                color="#000"
                style={{marginRight: 5}}
              />
              <Text style={{...FONTS.body4}}>{item.label}</Text>
            </View>
            <Icon
              name="chevron-right"
              size={25}
              color="#000"
              style={{marginRight: 5}}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const RenderFooter = () => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch(logout())}>
        <Text style={{...FONTS.body4}}>Logout</Text>

        <Icon name="logout" size={25} color="#000" style={{marginRight: 5}} />
      </TouchableOpacity>
    );
  };
  console.log(auth);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, padding: 20}}>
        <RenderHeader txt="Profile" />
        <RenderBody />
        <RenderNav />
        <RenderFooter />
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

export default Profile;
