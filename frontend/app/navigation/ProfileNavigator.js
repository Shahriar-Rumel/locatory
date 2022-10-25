import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import routes from './routes';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const ProfileNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.PROFILE} component={ProfileScreen} />
    {/* <Stack.Screen name="Location" component={LocationScreen} />
    <Stack.Screen name="Location_Details" component={LocationDetailsScreen} />
    <Stack.Screen name="Review" component={ReviewScreen} /> */}
  </Stack.Navigator>
);

export default ProfileNavigator;
