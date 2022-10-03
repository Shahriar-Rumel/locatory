import React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import * as Yup from 'yup';

import colors from '../config/colors';
import constants from '../config/constants';
import Screen from '../components/Screen';
import routes from '../navigation/routes';
import Toggle from '../components/Toggle';
import Form from '../components/forms/Form';
import FormField from '../components/forms/FormField';
import SubmitButton from '../components/forms/SubmitButton';
import { ScrollView } from 'react-native-gesture-handler';

const validationSchema = Yup.object().shape({
  // email: Yup.string().required().email().label('Email'),
  // password: Yup.string().required().min(4).label('Password')
});
export default function LoginScreen({ navigation }) {
  const handleSubmit = ({ email, password }) => {
    navigation.navigate(routes.FEED);
  };
  return (
    <Screen style={styles.container}>
      <Toggle active={'login'} />
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          resizeMode={'contain'}
          source={require('../assets/primary-pigeon.png')}
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Welcome back !</Text>
        <Text style={styles.subHeader}>Sign in to your account</Text>
      </View>

      <Form
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          name="email"
          label="Email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          name="password"
          label="Password"
          placeholder="Password"
          secureTextEntry={true}
          textContentType="password"
        />
        <SubmitButton text="Login" />
      </Form>

      <View style={styles.secondaryButtonContainer}>
        <Pressable
          style={styles.secondaryButton}
          onPress={() => navigation.navigate(routes.LOGIN)}
        >
          <Text style={styles.forgotPassText}>Forgot Password</Text>
        </Pressable>
      </View>
      <View style={styles.alreadyHaveAccountContainer}>
        <Text style={styles.alreadyHaveAccount}>Don't have an account ?</Text>
        <Pressable style={styles.secondaryButton} onPress= {() => navigation.navigate(routes.REGISTER)}>
          <Text style={styles.secondaryButtonText}>Register</Text>
        </Pressable>
      </View>
    </Screen>
  );}


const styles = StyleSheet.create({
  alreadyHaveAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60
  },
  alreadyHaveAccount: {
    color: colors.black,
    fontFamily: 'SFPD-regular'
  },
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: constants.CONTAINER_PADDING
  },
  forgotPassText: {
    color: colors.primary,
    fontFamily: 'SFPD-semiBold'
  },
  headerContainer: {
    marginTop: 30,
    marginBottom: 30,
    width: '100%'
  },
  header: {
    fontSize: 32,
    fontFamily: 'SFPD-bold',
    width: '100%'
  },

  logoContainer: { flexDirection: 'row', justifyContent: 'center' },
  logo: {
    width: 160,
    height: 160,
    marginTop: 40,
    paddingTop: 30
  },
  subHeader: {
    fontSize: 14,
    width: '85%',
    marginTop: 3,
    fontFamily: 'SFPD-regular'
  },
  secondaryButtonContainer: {
    alignItems: 'center',
    width: '95%',
    marginTop: 10
  },
  secondaryButton: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    borderRadius: 14,
    justifyContent: 'center'
  },
  secondaryButton: {
    marginLeft: 4
  },
  secondaryButtonText: {
    color: colors.primary,
    fontFamily: 'SFPD-semiBold'
  },
  text: {
    color: colors.white,
    fontFamily: 'SFPD-semiBold'
  }
});
