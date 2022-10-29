import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import FeedNavigator from './FeedNavigator';
import { Ionicons } from '@expo/vector-icons';
import ReviewNavigator from './ReviewNavigator';
import NotificationNavigator from './NotificationNavigator';
import ProfileNavigator from './ProfileNavigator';
import { Text, View } from 'react-native';
import colors from '../config/colors';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        paddingBottom: 5,
        paddingTop: 5,
        height: 50
      },
      headerShown: false
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
          <View
            style={{
              position: 'relative'
            }}
          >
            <View
              style={{
                backgroundColor: colors.red,
                position: 'absolute',
                top: 2,
                right: 3,
                zIndex: 999,
                borderRadius: 90,
                height: 8,
                width: 8,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 2
              }}
            >
              {/* <Text
                style={{
                  fontSize: 10,
                  color: colors.white,
                  marginTop: -2
                }}
              >
                12
              </Text> */}
            </View>
            <Ionicons
              name="ios-notifications-outline"
              size={size}
              color={color}
            />
          </View>
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
