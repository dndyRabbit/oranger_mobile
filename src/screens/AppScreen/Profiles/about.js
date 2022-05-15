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
import {COLORS, SIZES, FONTS, images} from '../../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useDispatch, useSelector} from 'react-redux';
import RenderHeader from '../../../components/Headers';

const About = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, padding: 20}}>
        <RenderHeader txt="About" back={true} navigation={navigation} />
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

export default About;
