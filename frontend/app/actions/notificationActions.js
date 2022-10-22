import axios from 'axios';

import { PRODUCTION_URL } from '../config/production';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  GET_NOTIFICATIONS_FOR_USER_FAIL,
  GET_NOTIFICATIONS_FOR_USER_REQUEST,
  GET_NOTIFICATIONS_FOR_USER_SUCCESS
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
