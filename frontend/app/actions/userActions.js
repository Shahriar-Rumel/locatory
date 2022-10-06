import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_LOGOUT
} from '../constants/userConstants';
import axios from 'axios';

import { PRODUCTION_URL } from '../config/production';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = PRODUCTION_URL;

const storeData = async (value) => {
  try {
    // const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('userLogin', jsonValue);
  } catch (e) {
    // saving error
  }
};
const removeItemValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log(BASE_URL);
    const { data } = await axios.post(
      `${BASE_URL}/api/auth/login`,
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });
    console.log(data);
    storeData(data);
    // AsyncStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message
    });
    console.log(error);
  }
};
export const logOut = () => (dispatch) => {
  const data = removeItemValue('userInfo');
  console.log(data);
  dispatch({ type: USER_LOGIN_LOGOUT });
};
