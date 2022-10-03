import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import FeedScreen from '../screens/FeedScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LocationScreen from '../screens/LocationScreen';
import CreateReviewScreen from '../screens/CreateReviewScreen';

const Stack = createStackNavigator();

const ReviewNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Review" component={CreateReviewScreen} />
    <Stack.Screen name="Location" component={LocationScreen} />
  </Stack.Navigator>
);

export default ReviewNavigator;
