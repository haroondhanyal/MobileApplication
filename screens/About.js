import React from 'react';
import {View, StyleSheet, Text,TouchableOpacity} from 'react-native';

const About = ({navigation}) => {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>Working In a SAUFIK </Text>
      <Text style={styles.text}>
        Here is the oppportunity for every one to start the career...
      </Text>
      <TouchableOpacity
       style={{width: '12%', marginTop: 5, marginLeft: 18}}
       onPress={()=>{
        navigation.navigate('Profile')
       }}>
        <Text style={{color:'red'}}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    color: 'black',
  },
});

export default About;
