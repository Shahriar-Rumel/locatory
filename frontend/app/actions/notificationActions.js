import axios from 'axios';

import { PRODUCTION_URL } from '../config/production';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  CREATE_NOTIFICATION_FAIL,
  CREATE_NOTIFICATION_REQUEST,
  CREATE_NOTIFICATION_SUCCESS,
  GET_NOTIFICATIONS_FOR_USER_FAIL,
  GET_NOTIFICATIONS_FOR_USER_REQUEST,
  GET_NOTIFICATIONS_FOR_USER_SUCCESS,
  SET_NOTIFICATION_AS_READ_FAIL,
  SET_NOTIFICATION_AS_READ_REQUEST,
  SET_NOTIFICATION_AS_READ_SUCCESS
} from '../constants/notificationConstants';

const BASE_URL = PRODUCTION_URL;

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getNotificationsForUserAction =
  () => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_NOTIFICATIONS_FOR_USER_REQUEST
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

      const { data } = await axios.get(
        `${BASE_URL}/api/auth/notifications`,
        config
      );

      dispatch({
        type: GET_NOTIFICATIONS_FOR_USER_SUCCESS,
        payload: data
      });

      storeData('notificationsForUser', data);
    } catch (error) {
      dispatch({
        type: GET_NOTIFICATIONS_FOR_USER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
    }
  };

export const createNotificationAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_NOTIFICATION_REQUEST
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

    const { data } = await axios.post(
      `${BASE_URL}/api/reviews/${id}/notifications`,
      { withCredentials: true },
      config
    );

    dispatch({
      type: CREATE_NOTIFICATION_SUCCESS,
      payload: data
    });

    storeData('createNotificationData', data);
  } catch (error) {
    dispatch({
      type: CREATE_NOTIFICATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });

    console.log(error);
  }
};

export const setNotificationAsReadAction =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SET_NOTIFICATION_AS_READ_REQUEST
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

      const { data } = await axios.post(
        `${BASE_URL}/api/auth/${id}/markasread`,
        { withCredentials: true },
        config
      );

      dispatch({
        type: SET_NOTIFICATION_AS_READ_SUCCESS,
        payload: data
      });

      storeData('setNotificationAsReadData', data);
    } catch (error) {
      dispatch({
        type: SET_NOTIFICATION_AS_READ_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });

      console.log(error);
    }
  };
