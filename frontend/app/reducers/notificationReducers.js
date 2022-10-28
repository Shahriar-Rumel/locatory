import {
  CREATE_NOTIFICATION_FAIL,
  CREATE_NOTIFICATION_REQUEST,
  CREATE_NOTIFICATION_RESET,
  CREATE_NOTIFICATION_SUCCESS,
  GET_NOTIFICATIONS_FOR_USER_FAIL,
  GET_NOTIFICATIONS_FOR_USER_REQUEST,
  GET_NOTIFICATIONS_FOR_USER_RESET,
  GET_NOTIFICATIONS_FOR_USER_SUCCESS,
  SET_NOTIFICATION_AS_READ_FAIL,
  SET_NOTIFICATION_AS_READ_REQUEST,
  SET_NOTIFICATION_AS_READ_RESET,
  SET_NOTIFICATION_AS_READ_SUCCESS
} from '../constants/notificationConstants';

export const getNotificationsForUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS_FOR_USER_REQUEST:
      return { loading: true, success: false };
    case GET_NOTIFICATIONS_FOR_USER_SUCCESS:
      return {
        loading: false,
        success: true,
        notificationsForUser: action.payload
      };
    case GET_NOTIFICATIONS_FOR_USER_FAIL:
      return { loading: false, error: action.payload };
    case GET_NOTIFICATIONS_FOR_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const createNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_NOTIFICATION_REQUEST:
      return { loading: true, success: false };
    case CREATE_NOTIFICATION_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case CREATE_NOTIFICATION_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_NOTIFICATION_RESET:
      return {};
    default:
      return state;
  }
};

export const setNotificationAsReadReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_NOTIFICATION_AS_READ_REQUEST:
      return { loading: true, success: false };
    case SET_NOTIFICATION_AS_READ_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case SET_NOTIFICATION_AS_READ_FAIL:
      return { loading: false, error: action.payload };
    case SET_NOTIFICATION_AS_READ_RESET:
      return {};
    default:
      return state;
  }
};
