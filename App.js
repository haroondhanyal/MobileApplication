import React,{useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import NavigationStack from './navigation/StackNavigator';
import {BottomNavigation} from 'react-native-paper';
import BottomTabNavigator from './navigation/TabNavigator';
import DrawerNavigator from './navigation/DrawerNavigator';
import {Provider} from 'react-redux';
import {Store} from './redux/store';
import SplashScreen from 'react-native-splash-screen';
// import NavigationStack from './navigation/StackNavigator';
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <DrawerNavigator />
        {/* <NavigationStack /> */}
        {/* <BottomTabNavigator /> */}
      </NavigationContainer>
    </Provider>
  );
};
export default App;
