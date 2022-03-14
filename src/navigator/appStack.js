import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Profile} from '../screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SIZES} from '../constants';
import {StyleSheet, Text} from 'react-native';
// import {TabBarCustomButton} from '../components/bottomTabBarCustom';

const BottomStack = createBottomTabNavigator();
const Stack = createStackNavigator();

// export const ProfileStack = () => {
//   return (
//     <Stack.Navigator headerMode={false}>
//       <Stack.Screen name="Verification" component={Verification} />
//       <Stack.Screen name="Waiting" component={Waiting} />
//     </Stack.Navigator>
//   );
// };

export const BottomTab = () => {
  return (
    <BottomStack.Navigator
      screenOptions={{
        headerShown: false,
        showLabel: true,
        style: {
          borderBottomWidth: 0,
          backgroundColor: '#9FD0AA',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderWidth: 1,
          borderColor: '#fff',
          marginBottom: 0,
        },
      }}>
      <BottomStack.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="home"
              size={30}
              color={focused ? '#fff' : '#6E9677'}
              style={{marginTop: focused ? -5 : 0, marginLeft: -25}}
            />
          ),
          //   tabBarButton: props => <TabBarCustomButton {...props} />,
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 10,
                color: focused ? '#fff' : 'transparent',
                position: 'absolute',
                right: -4,
              }}>
              Home
            </Text>
          ),
        }}
      />

      <BottomStack.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="account-outline"
              size={30}
              color={focused ? '#fff' : '#6E9677'}
              style={{
                marginTop: focused ? -5 : 0,
                marginLeft: focused ? -45 : -35,
              }}
            />
          ),
          //   tabBarButton: props => <TabBarCustomButton {...props} />,
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontSize: 10,
                color: focused ? '#fff' : 'transparent',
                position: 'absolute',
                right: 5,
              }}>
              Profile
            </Text>
          ),
        }}
      />
    </BottomStack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="App" component={BottomTab} />
      {/* <Stack.Screen name="EditProfile" component={EditProfile} /> */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: '#F6A545', //F6A545
    alignItems: 'center',
    marginBottom: 25,
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
});

export default AppStack;
