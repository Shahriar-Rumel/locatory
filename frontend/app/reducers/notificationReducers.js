import {
  GET_NOTIFICATIONS_FOR_USER_FAIL,
  GET_NOTIFICATIONS_FOR_USER_REQUEST,
  GET_NOTIFICATIONS_FOR_USER_RESET,
  GET_NOTIFICATIONS_FOR_USER_SUCCESS
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
