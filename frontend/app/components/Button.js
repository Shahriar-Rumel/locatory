import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import React from 'react';

import colors from '../config/colors';

export default function Button({
  text,
  onPress,
  width,
  borderRadius,
  height,
  color,
  mv,
  loading,
  opacity,
  bgColor,
  secondary
}) {
  const styles = StyleSheet.create({
    button: {
      width: width ? width : 100,
      height: height ? height : 50,
      backgroundColor: !secondary && (bgColor ? bgColor : colors.primary),
      alignItems: 'center',
      borderRadius: borderRadius ? borderRadius : 14,
      borderWidth: secondary && 1,
      borderColor: secondary && colors.primary,
      justifyContent: 'center',
      marginVertical: mv ? mv : 8,
      flexDirection: 'row',
      opacity: !opacity ? opacity : 1
    },
    text: {
      color: color ? color : colors.white,
      fontFamily: 'SFPD-semiBold'
    },
    loader: {
      marginRight: 10
    }
  });
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {loading && (
        <ActivityIndicator
          size={24}
          color={colors.secondary}
          style={styles.loader}
        />
      )}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}
