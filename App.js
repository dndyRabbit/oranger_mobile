import React, {useEffect} from 'react';
import Providers from './src/navigator';
import DataProvider from './src/redux/store';
import {LogBox} from 'react-native';
import {ModalPortal} from 'react-native-modals';

const App = () => {
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
    'new NativeEventEmitter',
  ]);
  useEffect(() => {
    console.log('HELLO INI RENDER APP 1');
  }, []);
  return (
    <DataProvider>
      <Providers />
      <ModalPortal />
    </DataProvider>
  );
};

export default App;
