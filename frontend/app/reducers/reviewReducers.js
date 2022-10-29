import {
  CREATE_REVIEW_FOR_PLACE_FAIL,
  CREATE_REVIEW_FOR_PLACE_REQUEST,
  CREATE_REVIEW_FOR_PLACE_RESET,
  CREATE_REVIEW_FOR_PLACE_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_RESET,
  DELETE_REVIEW_SUCCESS,
  GET_FAVORITE_REVIEWS_FAIL,
  GET_FAVORITE_REVIEWS_REQUEST,
  GET_FAVORITE_REVIEWS_RESET,
  GET_FAVORITE_REVIEWS_SUCCESS,
  GET_REVIEWS_BY_PLACE_FAIL,
  GET_REVIEWS_BY_PLACE_REQUEST,
  GET_REVIEWS_BY_PLACE_RESET,
  GET_REVIEWS_BY_PLACE_SUCCESS,
  GET_REVIEWS_BY_USER_FAIL,
  GET_REVIEWS_BY_USER_REQUEST,
  GET_REVIEWS_BY_USER_RESET,
  GET_REVIEWS_BY_USER_SUCCESS,
  GET_REVIEW_BY_ID_FAIL,
  GET_REVIEW_BY_ID_REQUEST,
  GET_REVIEW_BY_ID_RESET,
  GET_REVIEW_BY_ID_SUCCESS,
  LIKE_FAIL,
  LIKE_REQUEST,
  LIKE_RESET,
  LIKE_SUCCESS
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

export const getReviewsByUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_REVIEWS_BY_USER_REQUEST:
      return { loading: true, success: false };
    case GET_REVIEWS_BY_USER_SUCCESS:
      return { loading: false, success: true, reviewsByUser: action.payload };
    case GET_REVIEWS_BY_USER_FAIL:
      return { loading: false, error: action.payload };
    case GET_REVIEWS_BY_USER_RESET:
      return {};
    default:
      return state;
  }
};

export const getReviewsByIDReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_REVIEW_BY_ID_REQUEST:
      return { loading: true, success: false };
    case GET_REVIEW_BY_ID_SUCCESS:
      return {
        loading: false,
        success: true,
        reviewsByID: action.payload.data
      };
    case GET_REVIEW_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case GET_REVIEW_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const getFavoriteReviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FAVORITE_REVIEWS_REQUEST:
      return { loading: true, success: false };
    case GET_FAVORITE_REVIEWS_SUCCESS:
      return {
        loading: false,
        success: true,
        favoriteReviews: action.payload.data
      };
    case GET_FAVORITE_REVIEWS_FAIL:
      return { loading: false, error: action.payload };
    case GET_FAVORITE_REVIEWS_RESET:
      return {};
    default:
      return state;
  }
};
export const createReviewForPlaceReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REVIEW_FOR_PLACE_REQUEST:
      return { loading: true, success: false };
    case CREATE_REVIEW_FOR_PLACE_SUCCESS:
      return {
        loading: false,
        success: true,
        createReviewForPlace: action.payload
      };
    case CREATE_REVIEW_FOR_PLACE_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_REVIEW_FOR_PLACE_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_REVIEW_REQUEST:
      return { loading: true, success: false };
    case DELETE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case DELETE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const likeReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_REQUEST:
      return { loading: true, success: false };
    case LIKE_SUCCESS:
      return {
        loading: false,
        success: true,
        like: action.payload
      };
    case LIKE_FAIL:
      return { loading: false, error: action.payload };
    case LIKE_RESET:
      return {};
    default:
      return state;
  }
};
