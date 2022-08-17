import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {COLORS, FONTS, images} from '../../../../constants';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {format} from 'date-fns';
import {useDispatch, useSelector} from 'react-redux';
import {
  getUserPermission,
  patchUserPermission,
} from '../../../../redux/actions/permissionAction';
import {checkImage} from '../../../../utils/imageUpload';
import {GLOBALTYPES} from '../../../../redux/actions/globalTypes';
import ImagePicker from 'react-native-image-crop-picker';

const Submitted = () => {
  const dispatch = useDispatch();
  const {auth, permission} = useSelector(state => state);
  const [loading, setLoading] = useState(false);

  const [photo, setPhoto] = useState(null);

  const [photoId, setPhotoId] = useState(null);

  const handleGetEvidence = ({item}) => {
    ImagePicker.openCamera({
      width: 600,
      height: 800,
      compressImageQuality: 0.5,
      cropping: true,
    })
      .then(image => {
        const err = checkImage(image);
        if (err) return console.log(err);
        setPhoto({
          uri: image.path,
          type: image.mime,
          name: `picture.${image.path.split('/')[11]}`,
        });
        setPhotoId(item._id);
      })
      .catch(err => console.log(err));
  };

  const handlePatchEvidence = photoId => {
    dispatch(
      patchUserPermission({
        auth,
        id: photoId,
        evidence: photo,
        setPhoto,
        setLoading,
      }),
    );
  };

  const userPermission = useCallback(
    getUserPermission({auth, userId: auth.user._id}),
    [],
  );

  useEffect(() => {
    if (
      permission.permission == undefined ||
      permission.permission == null ||
      permission.permission.length < 1
    ) {
      dispatch(userPermission);
    }
  }, []);

  return (
    <View style={{flex: 1, padding: 10}}>
      <ScrollView>
        {permission?.permission?.map((item, index) => {
          return (
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
                <View style={{flexDirection: 'row', marginBottom: 5}}>
                  <Text style={{...FONTS.body4}}>Tanggal Pengajuan: </Text>
                  <Text style={{...FONTS.body4}}>
                    {item?.date && format(new Date(item?.date), 'yyyy-MM-dd')}
                  </Text>
                </View>
                <View style={{marginBottom: 10}}>
                  <Text style={{...FONTS.body4}}>Tanggal Izin: </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{...FONTS.body4}}>
                      {item?.startDate &&
                        format(new Date(item?.startDate), 'yyyy-MM-dd')}
                    </Text>
                    <Text style={{...FONTS.body4, marginHorizontal: 5}}>
                      s/d
                    </Text>
                    <Text style={{...FONTS.body4}}>
                      {item?.endDate &&
                        format(new Date(item?.endDate), 'yyyy-MM-dd')}
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
                        style={{
                          ...FONTS.body5,
                          fontStyle: 'italic',
                          color: 'red',
                        }}>
                        Belum ada gambar, upload terlebih dahulu
                      </Text>
                    )}
                  </Text>
                </View>

                <View>
                  <Text style={{...FONTS.body4}}>
                    Status:{' '}
                    <Text
                      style={{
                        ...FONTS.body4,

                        color: 'green',
                      }}>
                      {item.isApproved === false && 'Dalam pengajuan'}
                    </Text>
                  </Text>
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {!item.evidence && (
                  <TouchableOpacity onPress={() => handleGetEvidence({item})}>
                    <Icon name="image-edit" size={25} color={COLORS.primary} />
                  </TouchableOpacity>
                )}

                {photo && photoId === item._id && (
                  <TouchableOpacity
                    onPress={() => handlePatchEvidence(photoId)}
                    style={{marginTop: 10}}>
                    {loading ? (
                      <ActivityIndicator size="small" color="#0000ff" />
                    ) : (
                      <Text
                        style={{
                          ...FONTS.body4,
                          fontWeight: '900',
                          color: COLORS.primary,
                        }}>
                        Submit
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Submitted;
