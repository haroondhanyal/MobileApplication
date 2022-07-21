import React from 'react';

import Home from '../screens/Home';
import About from '../screens/About';
import Profile from '../screens/Profile';
import {Icon} from 'react-native-elements';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ToDo from '../screens/ToDo';
import Done from '../screens/Done';
import Task from '../screens/Task';
import BottomTabNavigator from './TabNavigator';
// import Header from 'react-native-custom-header';
import Header from '../screens/components/Header';
import {TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ModalPresentationIOS} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
// import {createStackNavigator} from '@react-navigation/stack';

const Stack = createNativeStackNavigator();
// const Stack = createStackNavigator();
const screenOptionStyle = {
  headerStyle: {
    backgroundColor: 'blue',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Black',
};

const NavigationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={(screenOptionStyle, {headerShown: false})}
      initialRouteName="tab">
      {/* // <Stack.Navigator screenOptions={screenOptionStyle} > */}
      <Stack.Screen name="tab" component={BottomTabNavigator} />
      <Stack.Screen
        name="Home"
        component={Home}
    
      />
      <Stack.Screen name="AboutUs" component={About} />
      <Stack.Screen name="ProfileScreen" component={Profile} />
      <Stack.Screen name="ToDo" component={ToDo} />
      <Stack.Screen
        name="Done"
        component={Done}

      //  options={{
        //   title: 'Tasks',
        //   headerStyle: {
        //     backgroundColor: '#f4511e',
        //   },
        //   headerTintColor: '#fff',
        //   headerTitleStyle: {
        //     fontWeight: 'bold',
        //   },
        // }}
      />
      <Stack.Screen
        name="Task"
        component={Task}
        options={{
          title: 'Tasks',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};
export default NavigationStack;
