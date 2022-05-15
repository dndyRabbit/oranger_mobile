import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import {COLORS, FONTS, images} from '../../../../constants';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {format} from 'date-fns';
import {useDispatch, useSelector} from 'react-redux';

const Approved = () => {
  const dispatch = useDispatch();
  const {auth, permission, permissionApproved} = useSelector(state => state);

  console.log(permissionApproved);
  console.log(auth);

  return (
    <View style={{flex: 1, padding: 10}}>
      {permissionApproved?.permissionApproved?.map((item, index) => (
        <View
          key={index}
          style={{
            borderRadius: 5,
            borderWidth: 1,
            borderColor: COLORS.primary,
            marginBottom: 10,
            padding: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{...FONTS.body4}}>Tipe Perizinan: </Text>
            <Text style={{...FONTS.body4}}>{item.type}</Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 5}}>
            <Text style={{...FONTS.body4}}>Alasan: </Text>
            <Text style={{...FONTS.body4}}>{item.description}</Text>
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={{...FONTS.body4}}>Tanggal: </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{...FONTS.body4}}>
                {format(new Date(item.startDate), 'yyyy-MM-dd')}
              </Text>
              <Text style={{...FONTS.body4, marginHorizontal: 5}}>s/d</Text>
              <Text style={{...FONTS.body4}}>
                {format(new Date(item.endDate), 'yyyy-MM-dd')}
              </Text>
            </View>
          </View>

          <View style={{marginBottom: 10}}>
            <Text style={{...FONTS.body4}}>Bukti foto: </Text>
            <Text style={{...FONTS.body5, fontStyle: 'italic'}}>
              {item.evidence ? (
                <Text
                  style={{
                    ...FONTS.body5,
                    fontStyle: 'italic',
                    color: 'green',
                  }}>
                  Gambar sudah ter-upload
                </Text>
              ) : (
                <Text
                  style={{...FONTS.body5, fontStyle: 'italic', color: 'red'}}>
                  Belum ada gambar, upload terlebih dahulu
                </Text>
              )}
            </Text>
          </View>

          <View>
            <Text style={{...FONTS.body4}}>
              Status:{'  '}
              <Text
                style={{...FONTS.body4, fontStyle: 'italic', color: 'green'}}>
                {item.status}
              </Text>
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Approved;
