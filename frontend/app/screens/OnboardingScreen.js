import {
  StyleSheet,
  Text,
  Pressable,
  Image,
  View,
  TextInput,
  ToastAndroid,
  KeyboardAvoidingView
} from 'react-native';
import React from 'react';
import colors from '../config/colors';
import routes from '../navigation/routes';

import Button from '../components/Button';
import constants from '../config/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Screen from '../components/Screen';

const TextInputReview = ({ label, placeholder, setData, ...otherProps }) => {
  const styles = StyleSheet.create({
    inputContainer: {
      width: '95%',
      marginVertical: 3,
      justifyContent: 'space-between',
      position: 'relative'
    },
    input: {
      backgroundColor: colors.input,
      height: 50,
      borderRadius: 8,
      width: '100%',
      paddingLeft: 140
    },
    label: {
      position: 'absolute',
      zIndex: 9,
      marginTop: 13,
      marginLeft: 15,
      fontFamily: 'SFPD-semiBold'
    }
  });
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderText={placeholder}
        onChangeText={(text) => setData(text)}
        {...otherProps}
      />
    </View>
  );
};

export default function OnboardingScreen({ navigation, route }) {
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();

  const { data } = route.params;

  const submitHandler = () => {
    if (location === '') {
      ToastAndroid.show('Please enter a valid location', ToastAndroid.SHORT);
    } else {
      navigation.navigate(routes.SETUP, {
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          location: location
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          resizeMode={'contain'}
          source={require('../assets/Map.png')}
        />
      </View>
      <View style={styles.headerSection}>
        <Text style={styles.header}>
          Please enter your location to get the best recommendations
        </Text>
      </View>
      <TextInputReview
        autoCapitalize="none"
        autoCorrect={false}
        name="location"
        value={location}
        label="Location"
        setData={setLocation}
        placeholder="Location"
        textContentType="text"
      />
      <Button
        text={'Next'}
        onPress={submitHandler}
        width={'95%'}
        bgColor={colors.primary}
      />

      <View style={styles.pagination}>
        <Text
          style={[
            styles.page,
            { backgroundColor: colors.secondary, color: colors.white }
          ]}
        >
          1
        </Text>
        <Text
          style={[
            styles.page,
            { backgroundColor: colors.light, color: colors.gray }
          ]}
        >
          2
        </Text>
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
    width: '95%',
    height: 240,
    marginTop: 60,
    paddingTop: 30
  },
  headerSection: {
    marginTop: 60,
    marginBottom: 30,
    alignItems: 'center',
    width: '95%'
    // backgroundColor: 'red'
  },
  header: {
    fontSize: 16,
    fontFamily: 'SFPD-bold',
    // textAlign: 'center',
    width: '100%',
    lineHeight: 18,
    color: colors.black
  },
  pagination: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '18%'
  },
  page: {
    padding: 5,
    height: 30,
    width: 30,
    borderRadius: 100,
    textAlign: 'center'
  }
});
