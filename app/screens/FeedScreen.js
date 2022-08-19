import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Screen from '../components/Screen';
import constants from '../config/constants';

export default function FeedScreen() {
  return (
    <Screen style={styles.container}>
      <Text>FeedScreen</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: constants.CONTAINER_PADDING
  }
});
