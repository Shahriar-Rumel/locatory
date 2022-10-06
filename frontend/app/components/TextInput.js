import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import colors from '../config/colors';

export default function AppTextInput({ label, placeholder, ...otherProps }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderText={placeholder}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginVertical: 3,
    justifyContent: 'space-between',
    position: 'relative'
  },
  input: {
    backgroundColor: colors.input,
    height: 50,
    borderRadius: 8,
    width: '100%',
    paddingLeft: 120
  },
  label: {
    position: 'absolute',
    zIndex: 9,
    marginTop: 13,
    marginLeft: 15,
    fontFamily: 'SFPD-semiBold'
  }
});
