import {createStore, applyMiddleware} from 'redux';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {persistStore, persistReducer} from 'redux-persist';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistGate} from 'redux-persist/lib/integration/react';
import rootReducer from './reducers/index';

import {composeWithDevTools} from 'redux-devtools-extension';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  // blacklist: ['accessToken', 'refreshToken'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
const persistor = persistStore(store);

const DataProvider = ({children}) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default DataProvider;
