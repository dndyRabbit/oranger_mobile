import React from 'react';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import {images, FONTS, COLORS} from '../constants';

const Nav = ({handleChangeNav}) => {
  const nav = [
    {label: 'Wilayah Pekerjaan', name: 'MyRute', image: images.logoNav1},
    {label: 'Absensi Petugas', name: 'Absent', image: images.logoNav2},
    {label: 'Pelaporan Pekerjaan', name: 'Report', image: images.logoNav3},
    {label: 'Pengajuan Perizinan', name: 'Permission', image: images.logoNav4},
  ];

  const RenderBody = () => {
    return (
      <FlatList
        data={nav}
        keyExtractor={item => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          marginTop: 30,
        }}
        scrollEventThrottle={1}
        renderItem={({item}) => (
          <View
            key={item.name}
            style={{
              flex: 1,
              padding: 10,
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => handleChangeNav(item)}
              activeOpacity={0.8}
              style={{
                alignItems: 'center',
                height: 80,
                justifyContent: 'center',
                padding: 10,
                borderRadius: 10,
                backgroundColor: '#fff',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}>
              <Image
                source={item.image}
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  borderRadius: 5,
                  top: -30,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={[
                  {...FONTS.h4},
                  {
                    position: 'absolute',
                    bottom: 10,
                    fontSize: 12,
                    fontWeight: '400',
                  },
                ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
      />
    );
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <RenderBody />
    </View>
  );
};

export default Nav;
