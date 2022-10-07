import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useSelector } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';

import { navigationRef } from './navigation/rootNavigation';
import navigationTheme from './navigation/navigationTheme';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Locatory() {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState();

  const userLoginData = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLoginData;

  useEffect(() => {
    if (!userInfo) {
      // navigation.navigate('Login');
      // console.log(userInfo);
    }
  }, [userInfo]);

  const getUser = async () => {
    const user = await AsyncStorage.getItem('userLogin');
    setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={getUser}
        onFinish={() => setIsReady(true)}
        onError={() => console.log('Could not load')}
      />
    );

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      {user && userInfo ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
