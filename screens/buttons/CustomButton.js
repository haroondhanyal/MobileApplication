import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

const CustomButton = props => {
  return (
    <Pressable
      onPress={props.onPressFunction}
      hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
      android_ripple={{color: 'blue'}}
      style={({pressed}) => [
        {backgroundColor: pressed ? 'grey' : props.color},
        styles.button,
        {...props.style},
      ]}>
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  button: {
    // width: 100,
    // height: 50,
    alignItems: 'center',
    borderRadius: 20,
    margin: 10,
  },
});

export default CustomButton;
