import React from 'react';
import Providers from './src/navigator';
import DataProvider from './src/redux/store';
import {LogBox} from 'react-native';

const App = () => {
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  ]);
  return (
    <DataProvider>
      <Providers />
    </DataProvider>
  );
};

export default App;
