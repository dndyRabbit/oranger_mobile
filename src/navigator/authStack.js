import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {Login, Register, Register2} from '../screens';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Register2" component={Register2} />
    </Stack.Navigator>
  );
};

export default AuthStack;
