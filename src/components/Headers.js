import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {FONTS, images, COLORS} from '../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {LOCATION_TYPES} from '../redux/actions/locationAction';

const RenderHeader = ({img, txt, back, navigation}) => {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
      }}>
      {back && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 15,
            backgroundColor: COLORS.primary,
            alignItems: 'center',
            flexDirection: 'row',
            borderTopRightRadius: 50,
            borderBottomRightRadius: 50,
            alignSelf: 'flex-start',
            marginLeft: -20,
          }}>
          <Icon
            name="arrow-left-thin"
            size={15}
            color="#fff"
            style={{marginRight: 5}}
          />
          <Text style={{...FONTS.body5, color: '#fff'}}>Kembali</Text>
        </TouchableOpacity>
      )}
      {img ? (
        <Image
          source={images.logoOranger}
          style={{height: 180}}
          resizeMode="contain"
        />
      ) : null}
      <Text style={{...FONTS.h1}}>{txt}</Text>
    </View>
  );
};

export default RenderHeader;
