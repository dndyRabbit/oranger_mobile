import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Nav from '../../components/HomeNav';
import RenderHeader from '../../components/Headers';
import {useDispatch, useSelector} from 'react-redux';
import {getMyCurrentLocation, requestFineLocation} from '../../helper/mapHelp';
import {postUserLocation} from '../../redux/actions/locationAction';

const Home = ({navigation}) => {
  const {auth, location} = useSelector(state => state);

  const handleChangeNav = item => {
    console.log(item.name);
    navigation.navigate(item.name, {label: item.label});
  };

  return (
    <SafeAreaView style={styles.container}>
      <RenderHeader txt="Selamat Datang Pasukan Oranye" img={true} />
      <Nav handleChangeNav={handleChangeNav} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    flex: 1,
    margin: 20,
  },
});

export default Home;
