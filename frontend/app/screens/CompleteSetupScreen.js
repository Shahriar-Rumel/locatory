import {
  StyleSheet,
  Text,
  Pressable,
  Image,
  View,
  TextInput,
  ToastAndroid
} from 'react-native';
import React from 'react';
import colors from '../config/colors';
import routes from '../navigation/routes';

import Button from '../components/Button';
import constants from '../config/constants';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { register } from '../actions/userActions';
import { useEffect } from 'react';

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

export default function CompleteSetupScreen({ navigation, route }) {
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);

  const { success, error, loading } = userRegister;

  const types = [
    'Restaurant',
    'Hotel',
    'Tourist',
    'Educational',
    'Establishment',
    'Theater'
  ];

  const [preferedList, setPreferedList] = useState([]);

  const addToList = (val) => {
    setPreferedList([...preferedList, val]);
  };

  const remove = (val) => {
    const index = preferedList.indexOf(val);
    if (index > -1) {
      preferedList.splice(index, 1);
    }

    setPreferedList([...preferedList]);
  };

  const isOnTheList = (val) => {
    for (let i = 0; i < preferedList.length; i++) {
      if (preferedList[i] === val) return true;
    }
    return false;
  };

  const { data } = route.params;

  const submitHandler = () => {
    const bodyData = {
      name: data.name,
      email: data.email,
      password: data.password,
      address: data.location,
      preference: preferedList
    };

    dispatch(register(bodyData));
  };

  useEffect(() => {
    if (success)
      ToastAndroid.show('Registered Successfully', ToastAndroid.SHORT);
  }, [success]);

  useEffect(() => {
    if (error) ToastAndroid.show(error, ToastAndroid.SHORT);
  }, [error]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          resizeMode={'contain'}
          source={require('../assets/Bulb.png')}
        />
      </View>
      <View style={styles.headerSection}>
        <Text style={styles.header}>
          Please select the places that you like to get recommended
        </Text>
      </View>
      <View style={styles.typesContainer}>
        {types.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.type,
              {
                color: colors.gray,
                backgroundColor: isOnTheList(item)
                  ? colors.secondary
                  : colors.light
              }
            ]}
            onPress={() => {
              !isOnTheList(item) ? addToList(item) : remove(item);
            }}
          >
            <Text
              style={[
                {
                  color: isOnTheList(item) ? colors.white : colors.gray
                }
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button
        text={'Complete setup'}
        onPress={submitHandler}
        width={'95%'}
        bgColor={colors.primary}
        loading={loading}
      />
      <View style={styles.pagination}>
        <Text
          style={[
            styles.page,
            { backgroundColor: colors.light, color: colors.gray }
          ]}
        >
          1
        </Text>
        <Text
          style={[
            styles.page,
            { backgroundColor: colors.secondary, color: colors.white }
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
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '95%',
    marginBottom: 20
  },
  type: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 90,
    marginRight: 10,
    marginVertical: 5,
    fontSize: 16,
    fontWeight: '400'
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
