import {
  CREATE_PLACE_FAIL,
  CREATE_PLACE_REQUEST,
  CREATE_PLACE_RESET,
  CREATE_PLACE_SUCCESS,
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
export const createPlaceReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PLACE_REQUEST:
      return { loading: true, success: false };
    case CREATE_PLACE_SUCCESS:
      return {
        loading: false,
        success: true,
        createPlace: action.payload
      };
    case CREATE_PLACE_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_PLACE_RESET:
      return {};
    default:
      return state;
  }
};
