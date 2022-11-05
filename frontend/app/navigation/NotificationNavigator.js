import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import routes from './routes';
import NotificationScreen from '../screens/NotificationScreen';

const Stack = createStackNavigator();

const NotificationNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.NOTIFICATION} component={NotificationScreen} />
  </Stack.Navigator>
);

export default NotificationNavigator;
