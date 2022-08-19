import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

import AuthNavigator from '../app/navigation/AuthNavigator';
import { navigationRef } from './app/navigation/rootNavigation';

export default function App() {
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
    <NavigationContainer ref={navigationRef}>
      <AuthNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: '#31006E'
  },
  text: {
    color: 'white',
    fontWeight: '900'
  }
});
