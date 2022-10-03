import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import colors from '../config/colors';

export default function Toggle({ active }) {
  return (
    <View style={styles.togglebarContainer}>
      <View style={styles.togglebar}>
        <Pressable
          style={
            active === 'login' ? styles.activeToggle : styles.inactiveToggle
          }
        >
          <Text style={styles.toggleText}>Sign in</Text>
        </Pressable>
        <Pressable
          style={
            active === 'register' ? styles.activeToggle : styles.inactiveToggle
          }
        >
          <Text style={styles.toggleText}>Register</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activeToggle: {
    backgroundColor: 'white',
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 6,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 3
  },
  inactiveToggle: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 6
  },
  togglebarContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  togglebar: {
    backgroundColor: colors.light,
    width: 160,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
    borderRadius: 6
  },
  toggleText: {
    fontSize: 12,
    fontFamily: 'SFPD-semiBold'
  }
});
