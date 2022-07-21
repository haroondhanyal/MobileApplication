import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NavigationStack from './StackNavigator';
import Home from '../screens/Home';
import About from '../screens/About';
import Profile from '../screens/Profile';
import Done from '../screens/Done';
import Header from '../screens/components/Header';
// import {Icon} from 'react-native-elements';
import ToDo from '../screens/ToDo';
import Task from '../screens/Task';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Profile">
        {/* <Tab.Screen name="stack" component={NavigationStack}/> */}
      {/* <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="home" color={color} size={26} />
          ),
        }}
      /> */}

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Ionicons name="person" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: 'About',
          tabBarIcon: ({color}) => (
            <Entypo name="info" color={color} size={26} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="ToDo"
        component={ToDo}
        options={{
          tabBarLabel: 'ToDo',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="clipboard-list"
              color={color}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Done"
        component={Done}
        options={{
          tabBarLabel: 'Done',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="clipboard-check"
              color={color}
              size={26}
            />
          ),
        }}
      />


{/* <Tab.Screen
        name="Task"
        component={Task}
        options={{
          tabBarLabel: 'Done',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="clipboard-check"
              color={color}
              size={26}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
