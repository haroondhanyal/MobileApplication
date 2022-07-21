import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header=props=> {
  return (
    <View style={styles.mainView}>
      <View style={{marginLeft:24,flexDirection:'row',margin:5}}>
        <Ionicons name="person" size={28} color="white" />
        <Text style={{fontSize:24,marginLeft:85,color:'white'}}>Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#dc143c',
    height: 60,
    justifyContent: 'center',
    width: '100%',
    // flexDirection: 'row',
    
  },
});

export default Header;
