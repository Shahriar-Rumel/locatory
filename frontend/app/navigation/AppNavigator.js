import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import FeedNavigator from './FeedNavigator';
import { Ionicons } from '@expo/vector-icons';
import ReviewNavigator from './ReviewNavigator';
import NotificationNavigator from './NotificationNavigator';
import ProfileNavigator from './ProfileNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        // backgroundColor: 'green',
        paddingBottom: 5,
        paddingTop: 5,
        height: 50
      },
      headerShown: false
      //   tabBarBackground: () => (
      //     <BlurView
      //       tint="light"
      //       intensity={100}
      //       style={StyleSheet.absoluteFill}
      //     />
      //   )
    }}
  >
    <Tab.Screen
      name="Home"
      component={FeedNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        )
      }}
    />
    {/* <Tab.Screen
      name="Search"
      component={FeedNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="search" color={color} size={size} />
        )
      }}
    /> */}
    <Tab.Screen
      name="New Review"
      component={ReviewNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="add-circle" size={size} color={color} />
        )
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={NotificationNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name="ios-notifications-outline"
            size={size}
            color={color}
          />
        )
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={size}
            color={color}
          />
        )
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
