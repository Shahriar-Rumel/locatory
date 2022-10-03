import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Screen from '../components/Screen';
import constants from '../config/constants';

export default function FeedScreen({ navigation }) {
  return (
    <Screen style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
      >
        <Text>Create New Review</Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    // paddingHorizontal: constants.CONTAINER_PADDING,
    backgroundColor: 'white'
  },
  scrollContainer: {
    width: '100%',
    paddingHorizontal: constants.CONTAINER_PADDING + 5,
    right: 0
  }
});
