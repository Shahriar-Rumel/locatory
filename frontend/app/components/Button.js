import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../config/colors';

export default function Button({
  text,
  onPress,
  width,
  borderRadius,
  height,
  color,
  mv
}) {
  const styles = StyleSheet.create({
    button: {
      width: width ? width : 100,
      height: height ? height : 50,
      backgroundColor: colors.primary,
      alignItems: 'center',
      borderRadius: borderRadius ? borderRadius : 14,
      justifyContent: 'center',
      marginVertical: mv ? mv : 8
    },
    text: {
      color: color ? color : colors.white,
      fontFamily: 'SFPD-semiBold'
    }
  });
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}
