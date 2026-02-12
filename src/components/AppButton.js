import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

const AppButton = ({onPress, title}) => {
  return (
    <Pressable
      onPress={onPress}
      // The style prop can receive a function with a 'pressed' state
      style={({pressed}) => [
        styles.appButtonContainer,
        pressed && styles.appButtonPressed, // Apply additional style when pressed
      ]}>
      <Text style={styles.appButtonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    // backgroundColor: '#009688', // Default background color
    backgroundColor: '#007aff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonPressed: {
    // backgroundColor: '#00564d', // Darker color when pressed
    backgroundColor: '#0155ad'
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

export default AppButton;
