import { StyleSheet, Text, Pressable, Image, View, Button } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Screen from '../components/Screen';
import colors from '../config/colors';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// onPress={() => navigation.navigate('Login')}

export default function WelcomeScreen() {
  return (
    <Screen style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          resizeMode={'contain'}
          source={require('../assets/logo.png')}
        />
      </View>
      <View style={styles.headerSection}>
        <Text style={styles.header}>Welcome to the world of Locatory</Text>
        <Text style={styles.subHeader}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque sit
          proin proin nunc. Vel t.
        </Text>
      </View>
      <View style={styles.buttonSection}>
        <Pressable style={styles.button}>
          <Text style={styles.text}>Sign up with Email</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
  },
  logoContainer: { flexDirection: 'row', justifyContent: 'center' },
  logo: {
    width: 180,
    height: 180,
    marginTop: 100,
    paddingTop: 30
  },
  headerSection: {
    marginTop: 60,
    marginBottom: 30,
    alignItems: 'center'
  },
  header: {
    fontSize: 32,
    fontFamily: 'SFPD-bold',
    textAlign: 'center',
    width: '90%'
  },
  subHeader: {
    fontSize: 14,
    textAlign: 'center',
    width: '85%',
    marginTop: 10,
    fontFamily: 'SFPD-regular'
  },
  buttonSection: {
    alignItems: 'center'
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    borderRadius: 14,
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontFamily: 'SFPD-semiBold'
  }
});
