import React from 'react';
import { StyleSheet, Text } from 'react-native';
import colors from '../../config/colors';

export default function ErrorMessage({ visible, error }) {
  if (!visible || !error) return null;

  return <Text style={styles.error}>{error}</Text>;
}

const styles = StyleSheet.create({
  error: {
    color: colors.red,
    paddingBottom: 10,
    marginTop: -5,
    marginLeft: 15,
    fontSize: 10
  }
});
