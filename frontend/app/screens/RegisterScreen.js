import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import * as Yup from 'yup';
import colors from '../config/colors';
import Screen from '../components/Screen';
import routes from '../navigation/routes';
import Toggle from '../components/Toggle';
import constants from '../config/constants';
import Form from '../components/forms/Form';
import FormField from '../components/forms/FormField';
import SubmitButton from '../components/forms/SubmitButton';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { useDispatch } from 'react-redux';
import { register } from '../actions/userActions';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(8).label('Password')
});
function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();

  const handleSubmit = ({ name, email, password }) => {
    // dispatch(register(name, email, password));
    navigation.navigate(routes.ONBOARDING, {
      data: {
        name: name,
        email: email,
        password: password
      }
    });
  };

  return (
    <Screen style={styles.container}>
      <KeyboardAvoidingView
        behavior="position"
        style={{ backgroundColor: 'white', flex: 1, width: '100%' }}
      >
        <Toggle active={'register'} />
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            resizeMode={'contain'}
            source={require('../assets/primary-pigeon.png')}
          />
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Sign up</Text>
          <Text style={styles.subheader}>
            Create an account so that you can get personalized recommendations
          </Text>
        </View>
        <Form
          initialValues={{ name: '', email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="text"
            name="name"
            label="Name"
            placeholder="Shahriar Rumel"
            textContentType="name"
          />

          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            name="email"
            label="Email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          {/* <FormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="text"
            name="location"
            label="Location"
            placeholder="Dhaka,Bangladesh"
            textContentType="Location"
          /> */}
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            name="password"
            label="Password"
            placeholder="Password"
            secureTextEntry={true}
            textContentType="password"
          />
          <SubmitButton text="Create account" width={'100%'} />
        </Form>

        <View style={styles.alreadyHaveAccountContainer}>
          <Text style={styles.alreadyHaveAccount}>
            Already have an account?
          </Text>
          <Pressable
            style={styles.secondaryButton}
            onPress={() => navigation.navigate(routes.LOGIN)}
          >
            <Text style={styles.secondaryButtonText}>Signin</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  alreadyHaveAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
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
  headerContainer: {
    marginTop: -20,
    marginBottom: 30,
    width: '100%'
  },
  header: {
    fontSize: 32,
    fontFamily: 'SFPD-bold',
    width: '100%'
  },
  logoContainer: {
    marginTop: -20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%'
  },
  logo: {
    width: 160,
    height: 110,
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
export default RegisterScreen;
