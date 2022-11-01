import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL
} from '../constants/userConstants';
import axios from 'axios';

import { PRODUCTION_URL } from '../config/production';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = PRODUCTION_URL;

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
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

    const { data } = await axios.post(
      `${BASE_URL}/api/auth/login`,
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });

    storeData('userLogin', data);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message
    });
    console.log(error.response.data);
  }
};

export const register = (bodyData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/auth/register`,
      bodyData,
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message
    });

    console.log(error);
  }
};

export const getCurrentUser = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`${BASE_URL}/api/auth/me`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    });

    storeData('userData', data);
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message
    });
  }
};

export const updateUser = (userData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(
      `${BASE_URL}/api/auth/updatedetails`,
      userData,
      config
    );

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    });

    storeData('userUpdateData', data);
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message
    });
    console.log(error);
  }
};
export const logOut = () => (dispatch) => {
  const data = removeItemValue('userLogin');
  dispatch({ type: USER_LOGIN_LOGOUT });
};
