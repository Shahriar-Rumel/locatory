import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FeedScreen from '../screens/FeedScreen';
import LocationScreen from '../screens/LocationScreen';
import LocationDetailsScreen from '../screens/LocationDetailsScreen';
import ReviewScreen from '../screens/ReviewScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Feed" component={FeedScreen} />
    <Stack.Screen name="Location" component={LocationScreen} />
    <Stack.Screen name="Location_Details" component={LocationDetailsScreen} />
    <Stack.Screen name="Review" component={ReviewScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
