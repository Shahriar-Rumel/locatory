import { StyleSheet, Text, Pressable, Image, View } from 'react-native';
import React from 'react';
import colors from '../config/colors';
import routes from '../navigation/routes';

import Button from '../components/Button';
import constants from '../config/constants';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          resizeMode={'contain'}
          source={require('../assets/icon.png')}
        />
      </View>
      <View style={styles.headerSection}>
        <Text style={styles.header}>Know more about the place you love</Text>
        <Text style={styles.subHeader}>
          Share your insights about the place that you visited.
        </Text>
      </View>
      <Button
        text={'Sign in with Email'}
        onPress={() => navigation.navigate(routes.LOGIN)}
        width={'95%'}
        bgColor={colors.primary}
      />
      <View style={styles.alreadyHaveAccountSection}>
        <Text style={styles.alreadyHaveAccount}>Don't have an account ?</Text>
        <Pressable
          style={styles.secondaryButton}
          onPress={() => navigation.navigate(routes.REGISTER)}
        >
          <Text style={styles.secondaryButtonText}>Signup</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: constants.CONTAINER_PADDING,
    backgroundColor: colors.white,
    alignItems: 'center'
  },
  logoContainer: { flexDirection: 'row', justifyContent: 'center' },
  logo: {
    width: 240,
    height: 240,
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
    fontSize: 30,
    fontFamily: 'SFPD-bold',
    textAlign: 'center',
    width: '98%',
    lineHeight: 32,
    color: colors.black
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
    marginTop: 20
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
