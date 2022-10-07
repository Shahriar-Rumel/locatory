import {
  GET_ALL_PLACES_FAIL,
  GET_ALL_PLACES_REQUEST,
  GET_ALL_PLACES_RESET,
  GET_ALL_PLACES_SUCCESS
} from '../constants/placeConstants';

export const getAllPlacesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_PLACES_REQUEST:
      return { loading: true, success: false };
    case GET_ALL_PLACES_SUCCESS:
      return { loading: false, success: true, allPlaces: action.payload };
    case GET_ALL_PLACES_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_PLACES_RESET:
      return {};
    default:
      return state;
  }
};
