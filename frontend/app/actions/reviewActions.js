import axios from 'axios';

import { PRODUCTION_URL } from '../config/production';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  GET_REVIEWS_BY_PLACE_FAIL,
  GET_REVIEWS_BY_PLACE_REQUEST,
  GET_REVIEWS_BY_PLACE_SUCCESS
} from '../constants/reviewConstants';

const BASE_URL = PRODUCTION_URL;

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('reviewsByPlaceData', jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getReviewsByPlace =
  (id, pageNo, pageSize) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_REVIEWS_BY_PLACE_REQUEST
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
        `${BASE_URL}/api/places/${id}/reviews`,
        config
      );

      dispatch({
        type: GET_REVIEWS_BY_PLACE_SUCCESS,
        payload: data
      });

      storeData(data);
    } catch (error) {
      dispatch({
        type: GET_REVIEWS_BY_PLACE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
      console.log(error);
    }
  };
