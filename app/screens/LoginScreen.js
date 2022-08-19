import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Screen from '../components/Screen';

export default function () {
  return (
    <Screen style={styles.container}>
      <View>
        <Text>LoginScreen</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
