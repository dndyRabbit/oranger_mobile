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

const Profile = ({navigation}) => {
  const [newData, setNewData] = useState({});

  const dispatch = useDispatch();

  const {auth, petugas} = useSelector(state => state);

  const handleLogout = () => {
    dispatch(logout());
  };
  console.log(petugas);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{alignItems: 'center', padding: 20}}
        onPress={() => handleLogout()}>
        <Text style={{color: '#000'}}>Logout</Text>
      </TouchableOpacity>
      <Text style={{color: '#000', fontSize: 30}}>
        {petugas?.user?.alamatLengkap}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  body: {
    flex: 1,
    margin: 20,
  },
});

export default Profile;
