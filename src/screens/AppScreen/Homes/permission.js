import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import {COLORS, FONTS, images} from '../../../constants';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';

import RenderHeader from '../../../components/Headers';

import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Submitted from './Permission/submitted';
import Approved from './Permission/approved';
import ChooseDates from '../../../components/ChooseDates';
import {format} from 'date-fns';
import moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';

import Modal, {
  ModalTitle,
  ModalButton,
  ScaleAnimation,
} from 'react-native-modals';
import {GLOBALTYPES} from '../../../redux/actions/globalTypes';
import {checkImage} from '../../../utils/imageUpload';
import {postUserPermission} from '../../../redux/actions/permissionAction';

const Permission = ({navigation, route}) => {
  const {label} = route.params;

  const [state, setState] = useState({
    type: '',
    description: '',
    evidence: '',
  });
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
    displayedDate: moment(),
  });
  const today = format(new Date(new Date()), 'yyyy-MM-dd');

  const dispatch = useDispatch();

  const {location, alert, auth} = useSelector(state => state);

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [scaleAnimationModal, setScaleAnimationModal] = useState(false);

  const [routes] = useState([
    {key: 'submitted', title: 'Pengajuan'},
    {key: 'approved', title: 'Disetujui'},
  ]);

  const renderScene = SceneMap({
    submitted: Submitted,
    approved: Approved,
  });

  const handleGetEvidence = () => {
    ImagePicker.openCamera({
      width: 600,
      height: 800,
      compressImageQuality: 0.5,
      cropping: true,
    })
      .then(image => {
        const err = checkImage(image);
        console.log(image.path);
        console.log(image.path.split('/')[11]);
        if (err)
          return dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err},
          });

        setState({
          ...state,
          evidence: {
            uri: image.path,
            type: image.mime,
            name: `picture.${image.path.split('/')[11]}`,
          },
        });
      })
      .catch(err => console.log(err));
  };

  const handleSubmitPermission = async () => {
    console.log({
      role: location?.rute?.[0]?.role,
      userId: auth.user._id,
      type: state.type,
      evidence: state.evidence,
      description: state.description,
      date: today,
      startDate: date.startDate._d,
      endDate: date.endDate._d,
    });
    dispatch(
      postUserPermission({
        auth,
        role: location?.rute?.[0]?.role,
        userId: auth.user._id,
        type: state.type,
        evidence: state.evidence,
        description: state.description,
        date: today,
        startDate: date.startDate._d,
        endDate: date.endDate._d,
        setScaleAnimationModal,
        setState,
      }),
    );
  };

  // -----------------RENDER----------------
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'white'}}
      style={{backgroundColor: COLORS.primary}}
      renderLabel={({route, focused, color}) => (
        <Text style={{margin: 8, ...FONTS.body3, color: '#fff'}}>
          {route.title}
        </Text>
      )}
    />
  );

  const RenderSubmitButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setScaleAnimationModal(true);
        }}
        style={{
          paddingHorizontal: 20,
          padding: 5,
          backgroundColor: COLORS.primary,
          width: 100,
          alignItems: 'center',
          borderRadius: 100 / 2,
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignSelf: 'flex-end',
        }}>
        <Icon name="plus" size={20} color={COLORS.secondary} />
        <Text style={{...FONTS.body4, color: '#fff', marginLeft: 5}}>
          Buat Izin
        </Text>
      </TouchableOpacity>
    );
  };

  const renderInput = () => {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: COLORS.primary,
            marginVertical: 10,
          }}>
          <Text style={{fontSize: 12, color: COLORS.primary}}>
            Pilih jenis perizinan
          </Text>
          <Picker
            selectedValue={state.type}
            dropdownIconColor={COLORS.primary}
            style={{
              color: COLORS.primary,
              width: '100%',
            }}
            onValueChange={(itemValue, itemIndex) =>
              setState({...state, type: itemValue})
            }>
            <Picker.Item
              style={{fontSize: 14}}
              label="Jenis Perizinan"
              value=""
            />
            <Picker.Item style={{fontSize: 14}} label="Sakit" value="sakit" />
            <Picker.Item style={{fontSize: 14}} label="Izin" value="izin" />
            <Picker.Item style={{fontSize: 14}} label="Cuti" value="cuti" />
          </Picker>
        </View>

        <View
          style={{
            width: '100%',
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 12, color: COLORS.primary}}>Deskripsi</Text>
          <TextInput
            value={state.description}
            onChangeText={text => setState({...state, description: text})}
            placeholder="Deskripsi..."
            placeholderTextColor={`${COLORS.primary}88`}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: COLORS.primary,
              width: '100%',
              paddingVertical: 5,
              fontSize: 14,
              color: '#000',
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginBottom: 60,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={handleGetEvidence}
            style={{
              paddingHorizontal: 10,
              padding: 5,
              borderWidth: 1,
              borderColor: COLORS.primary,
              borderRadius: 5,
              alignItems: 'center',
              marginRight: 10,
              flexDirection: 'row',
            }}>
            <Icon name="camera" size={20} color={COLORS.primary} />
            <Text style={{...FONTS.body5, marginLeft: 5}}>Ambil Gambar</Text>
          </TouchableOpacity>
          <Text style={{...FONTS.body5, fontStyle: 'italic'}}>
            {state?.evidence?.name
              ? state?.evidence?.name
              : 'Tidak ada foto...'}
          </Text>
        </View>

        <ChooseDates setDate={setDate} date={date} />
        <Text
          style={{
            ...FONTS.body3,
            textAlign: 'center',
            marginTop: 10,
            color: COLORS.primary,
            fontWeight: 'bold',
          }}>
          Tanggal
        </Text>
        <Text style={{color: '#000', fontSize: 14, textAlign: 'center'}}>
          {date.startDate ? moment(date.startDate).format('YYYY-MM-DD') : '...'}{' '}
          <Text style={{fontWeight: 'bold', fontSize: 16}}>s/d</Text>
          {''}{' '}
          {date.endDate ? moment(date.endDate).format('YYYY-MM-DD') : '...'}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <RenderHeader txt={label} back={true} navigation={navigation} />
      <RenderSubmitButton />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        style={{
          backgroundColor: '#fff',
          borderRadius: 5,
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.19,
          shadowRadius: 5.62,
          elevation: 6,
        }}
        transitionStyle="curl"
        lazy
        renderTabBar={renderTabBar}
      />

      <Modal
        onTouchOutside={() => {
          setScaleAnimationModal(false);
        }}
        width={0.9}
        visible={scaleAnimationModal}
        // animationDuration={100}
        modalAnimation={new ScaleAnimation()}
        onHardwareBackPress={() => {
          console.log('onHardwareBackPress');
          setScaleAnimationModal(false);
          return true;
        }}
        modalTitle={
          <ModalTitle
            title="Buat Perizinan"
            hasTitleBar={false}
            textStyle={{...FONTS.h1}}></ModalTitle>
        }
        actions={[
          <ModalButton
            text="DISMISS"
            onPress={() => {
              setScaleAnimationModal(false);
            }}
            key="button-1"
          />,
        ]}>
        <ScrollView
          contentContainerStyle={{
            marginHorizontal: 20,
            paddingVertical: 20,
            height: 500,
            justifyContent: 'space-between',
          }}>
          {renderInput()}
          {alert.loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <Button title="Submit Perizinan" onPress={handleSubmitPermission} />
          )}
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});

export default Permission;
