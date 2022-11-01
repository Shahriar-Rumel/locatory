import { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useSelector } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';

import { navigationRef } from './navigation/rootNavigation';
import navigationTheme from './navigation/navigationTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import colors from './config/colors';

export default function Locatory() {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState();

  const userLoginData = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLoginData;

  const getUser = async () => {
    const user = await AsyncStorage.getItem('userLogin');
    setUser(user);
  };

  // if (!isReady)
  //   return (
  //     <AppLoading
  //       startAsync={getUser}
  //       onFinish={() => setIsReady(true)}
  //       onError={() => console.log('Could not load')}
  //     />
  //   );

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor={colors.white} barStyle="light" style="dark" />

      <NavigationContainer
        ref={navigationRef}
        theme={navigationTheme}
        onLayout={onLayoutRootView}
      >
        {userInfo ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </>
  );
}
