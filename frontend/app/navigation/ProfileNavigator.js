import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import routes from './routes';
import ProfileScreen from '../screens/ProfileScreen';
import UserReviewScreen from '../screens/UserReviewsScreen';
import UserFavoritesScreen from '../screens/UserFavoritesScreen';
import UserPlacesScreen from '../screens/UserPlacesScreen';

const Stack = createStackNavigator();

const ProfileNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={routes.PROFILE} component={ProfileScreen} />
    <Stack.Screen name={routes.USER_REVIEWS} component={UserReviewScreen} />
    <Stack.Screen
      name={routes.USER_FAVORITES}
      component={UserFavoritesScreen}
    />
    <Stack.Screen name={routes.USER_PLACES} component={UserPlacesScreen} />
  </Stack.Navigator>
);

export default ProfileNavigator;
