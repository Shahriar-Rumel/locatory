import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import routes from './routes';
import NotificationScreen from '../screens/NotificationScreen';

const Stack = createStackNavigator();

const NotificationNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.NOTIFICATION} component={NotificationScreen} />
    {/* <Stack.Screen name="Location" component={LocationScreen} />
    <Stack.Screen name="Location_Details" component={LocationDetailsScreen} />
    <Stack.Screen name="Review" component={ReviewScreen} /> */}
  </Stack.Navigator>
);

export default NotificationNavigator;
