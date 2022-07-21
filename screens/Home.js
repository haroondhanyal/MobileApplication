import React from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../screens/components/Header';

const Home = ({navigation, props}) => {
  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', backgroundColor: 'grey', height: 50}}>
        {/* {props.name} */}
        <Ionicons name="home" size={28} color="black" />
        <Text style={{fontSize: 24, marginLeft: 85, color: 'black'}}>
          Home
        </Text>
      </View>
      <View style={styles.view}>
        <Text style={{fontSize: 24, fontWeight: 'bold', color: 'black'}}>
          This is the home screen
        </Text>
        <Button
          title="About Screen"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
    </View>
    // <View style={styles.center}>

    // <Text style={{fontSize: 24, fontWeight: 'bold', color: 'black'}}>
    //   This is the home screen
    // </Text>
    // <Button
    //   title="About Screen"
    //   onPress={() => navigation.navigate('Profile')}
    // />
    // </View>
  );
};

const styles = StyleSheet.create({
  // center: {
  //   flex: 1,
  // justifyContent: 'center',
  // alignItems: 'center',
  // textAlign: 'center',
  // }
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default Home;
