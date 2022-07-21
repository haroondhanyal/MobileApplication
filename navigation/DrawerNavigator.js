import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {TouchableOpacity} from 'react-native';
// import Home from '../screens/HomeScreen';
// import Profile from '../screens/ProfileScreen';
import About from '../screens/About';
import TabNavigator from './TabNavigator';
import {Icon} from 'react-native-elements';
import StackNavigator from './StackNavigator';
import Profile from '../screens/Profile';
// import About from '../screens/About';
// import Home from '../screens/Home';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      drawerType="front"
      edgeWidth={100}
      hideStatusBar={false}
      overlayColor="#00000090"
      drawerStyle={{
        backgroundColor: '#e6e6e6',
        width: 250,
      }}
      screenOptions={{
        headerShown: false,
      }}
      // screenOptions={{
      //   headerShown: true,
      //   swipeEnabled: true,
      //   gestureEnabled: true,
      //   headerTitleAlign: 'center',
      //   headerStyle: {
      //     backgroundColor: '#0080ff',
      //   },
      //   headerTintColor: '#ffffff',
      //   headerTitleStyle: {
      //     fontSize: 25,
      //     fontWeight: 'bold',
      //   },
      // }}
      >
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          title: 'Home',
          drawerIcon: ({focused, size}) => (
            <Icon
              // raised
              name="home"
              type="MaterialIcons"
              size={30}
              onPress={About}
              // color="red"
              color={focused ? '#7cc' : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={StackNavigator}
        options={{
          title: 'Profile',
          drawerIcon: ({focused, size}) => (
            <Icon
              name="person"
              type="Ionicons"
              size={30}
              onPress={Profile}
              color={focused ? '#7cc' : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen name="About Us" component={TabNavigator}
       options={{
        title: 'Contact Us',
        drawerIcon: ({focused, size}) => (
          <Icon
            name="info"
            type="MaterialIcons"
            size={30}
            color={focused ? '#7cc' : '#ccc'}
          />
        ),
      }}
       />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
