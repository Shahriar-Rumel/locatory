import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../config/colors';

const Message = ({ message }) => {
  return (
    <View style={styles.messageContainer}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  messageContainer: {
    backgroundColor: colors.redLight,
    color: colors.red,
    paddingHorizontal: 25,
    paddingVertical: 20,
    zIndex: 999,
    flex: 1
  },
  message: {
    color: colors.red
  }
});
