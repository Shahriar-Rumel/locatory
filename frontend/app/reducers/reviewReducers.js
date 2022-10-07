import {
  GET_REVIEWS_BY_PLACE_FAIL,
  GET_REVIEWS_BY_PLACE_REQUEST,
  GET_REVIEWS_BY_PLACE_RESET,
  GET_REVIEWS_BY_PLACE_SUCCESS
} from '../constants/reviewConstants';

export const getReviewsByPlaceReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_REVIEWS_BY_PLACE_REQUEST:
      return { loading: true, success: false };
    case GET_REVIEWS_BY_PLACE_SUCCESS:
      return { loading: false, success: true, reviewsByPlace: action.payload };
    case GET_REVIEWS_BY_PLACE_FAIL:
      return { loading: false, error: action.payload };
    case GET_REVIEWS_BY_PLACE_RESET:
      return {};
    default:
      return state;
  }
};
