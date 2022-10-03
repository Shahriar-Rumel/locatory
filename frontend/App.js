import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import { navigationRef } from './app/navigation/rootNavigation';
import navigationTheme from './app/navigation/navigationTheme';
import AppNavigator from './app/navigation/AppNavigator';
import AuthNavigator from './app/navigation/AuthNavigator';

export default function App() {
  const [user, setUser] = useState(true);

  const [fontsLoaded] = useFonts({
    'SFPD-bold': require('./app/assets/fonts/SFPD-Bold.otf'),
    'SFPD-semiBold': require('./app/assets/fonts/SFPD-Semibold.otf'),
    'SFPD-medium': require('./app/assets/fonts/SFPD-Medium.otf'),
    'SFPD-regular': require('./app/assets/fonts/SFPD-Regular.otf')
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
