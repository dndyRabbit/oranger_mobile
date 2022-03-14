import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {COLORS, SIZES, FONTS, images} from '../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {login} from '../../redux/actions/authAction';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {petugasData} from '../../redux/actions/petugasAction';

const Home = () => {
  const {petugas, auth} = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(petugasData({auth}));
    console.log(auth.token);
  }, [auth.token]);

  return (
    <View>
      <Text>This is Home</Text>
    </View>
  );
};

export default Home;
