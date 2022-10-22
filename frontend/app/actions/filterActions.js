import axios from 'axios';

import { PRODUCTION_URL } from '../config/production';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GET_TOP_RATED_PLACE_FAIL,
  GET_TOP_RATED_PLACE_REQUEST,
  GET_TOP_RATED_PLACE_SUCCESS
} from '../constants/FilterConstant';

const BASE_URL = PRODUCTION_URL;

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getTopRatedPlaceAction =
  (rating, pageNo, pageSize) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_TOP_RATED_PLACE_REQUEST
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
        `${BASE_URL}/api/places?averageRating[gte]=${rating}`,
        config
      );

      dispatch({
        type: GET_TOP_RATED_PLACE_SUCCESS,
        payload: data
      });

      storeData('TopRatedPlaceData', data);
    } catch (error) {
      dispatch({
        type: GET_TOP_RATED_PLACE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      });
      console.log(error.response.data.message);
    }
  };
