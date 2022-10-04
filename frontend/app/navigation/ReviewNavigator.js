import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LocationScreen from '../screens/LocationScreen';
import CreateReviewScreen from '../screens/CreateReviewScreen';

const Stack = createStackNavigator();

const ReviewNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Create_Review" component={CreateReviewScreen} />
    <Stack.Screen name="Location" component={LocationScreen} />
  </Stack.Navigator>
);

export default ReviewNavigator;
