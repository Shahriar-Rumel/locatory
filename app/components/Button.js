import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../config/colors';

export default function Button({ text, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    borderRadius: 14,
    justifyContent: 'center'
  },
  text: {
    color: colors.white,
    fontFamily: 'SFPD-semiBold'
  }
});
