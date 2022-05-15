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
import {patchUserPermission} from '../../../../redux/actions/permissionAction';
import {checkImage} from '../../../../utils/imageUpload';
import {GLOBALTYPES} from '../../../../redux/actions/globalTypes';
import ImagePicker from 'react-native-image-crop-picker';

const Submitted = () => {
  const dispatch = useDispatch();
  const {auth, permission} = useSelector(state => state);

  const [photo, setPhoto] = useState(null);

  const handleGetEvidence = ({id}) => {
    ImagePicker.openCamera({
      width: 600,
      height: 800,
      compressImageQuality: 0.5,
      cropping: true,
    })
      .then(image => {
        const err = checkImage(image);
        if (err)
          return dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err},
          });
        setPhoto({
          uri: image.path,
          type: image.mime,
          name: `picture.${image.path.split('/')[11]}`,
          key: id,
        });
      })
      .catch(err => console.log(err));
  };

  const handlePatchEvidence = ({id}) => {
    console.log(id);
    dispatch(patchUserPermission({auth, id, evidence: photo, setPhoto}));
  };

  return (
    <View style={{flex: 1, padding: 10}}>
      {permission?.permission?.map((item, index) => (
        <View
          key={index}
          style={{
            borderRadius: 5,
            borderWidth: 1,
            borderColor: COLORS.primary,
            marginBottom: 10,
            padding: 10,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View>
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
                Status:
                <Text
                  style={{...FONTS.body4, fontStyle: 'italic', color: 'green'}}>
                  {item.isApproved === false && 'Dalam pengajuan'}
                </Text>
              </Text>
            </View>
          </View>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {!item.evidence && (
              <TouchableOpacity
                onPress={() => handleGetEvidence({id: item._id})}>
                <Icon name="image-edit" size={25} color={COLORS.primary} />
              </TouchableOpacity>
            )}

            {photo?.key === item._id && (
              <TouchableOpacity
                onPress={() => handlePatchEvidence({id: item._id})}
                style={{marginTop: 10}}>
                <Text
                  style={{
                    ...FONTS.body4,
                    fontWeight: '900',
                    color: COLORS.primary,
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

export default Submitted;
