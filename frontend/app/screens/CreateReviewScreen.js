import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AppFormField from '../components/forms/FormField';
import SubmitButton from '../components/forms/SubmitButton';
import Form from '../components/forms/Form';

import Screen from '../components/Screen';
import constants from '../config/constants';

export default function CreateReviewScreen({ navigation }) {
  const handleSubmit = ({ email, password }) => {
    navigation.navigate(routes.FEED);
  };
  return (
    <Screen style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
      >
        <Text>Create New Review</Text>
        <Form
          initialValues={{ name: '', description: '' }}
          onSubmit={handleSubmit}
          //   validationSchema={validationSchema}
        >
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            name="email"
            label="Email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            name="password"
            label="Password"
            placeholder="Password"
            secureTextEntry={true}
            textContentType="password"
          />
          <SubmitButton text="Create Review" />
        </Form>
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
