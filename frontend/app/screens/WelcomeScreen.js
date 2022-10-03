import { StyleSheet, Text, Pressable, Image, View } from 'react-native';
import React from 'react';
import Screen from '../components/Screen';
import colors from '../config/colors';
import routes from '../navigation/routes';

import Button from '../components/Button';
import constants from '../config/constants';

export default function WelcomeScreen({ navigation }) {
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
        <Text style={styles.header}>Know more about the place you love</Text>
        <Text style={styles.subHeader}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque sit
          proin proin nunc. Vel t.
        </Text>
      </View>
      <Button
        text={'Sign in with Email'}
        onPress={() => navigation.navigate(routes.LOGIN)}
      />
      <View style={styles.alreadyHaveAccountSection}>
        <Text style={styles.alreadyHaveAccount}>Don't have an account ?</Text>
        <Pressable style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Signin</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: constants.CONTAINER_PADDING
  },
  logoContainer: { flexDirection: 'row', justifyContent: 'center' },
  logo: {
    width: 180,
    height: 180,
    marginTop: 60,
    paddingTop: 30
  },
  headerSection: {
    marginTop: 60,
    marginBottom: 30,
    alignItems: 'center',
    width: '100%'
  },
  header: {
    fontSize: 32,
    fontFamily: 'SFPD-bold',
    textAlign: 'center',
    width: '100%'
  },
  subHeader: {
    fontSize: 14,
    textAlign: 'center',
    width: '93%',
    marginTop: 10,
    fontFamily: 'SFPD-regular'
  },

  alreadyHaveAccountSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80
  },
  alreadyHaveAccount: {
    color: colors.black,
    fontFamily: 'SFPD-regular'
  },
  secondaryButton: {
    marginLeft: 4
  },
  secondaryButtonText: {
    color: colors.primary,
    fontFamily: 'SFPD-semiBold'
  }
});
