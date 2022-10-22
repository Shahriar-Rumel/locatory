import {
  GET_TOP_RATED_PLACE_FAIL,
  GET_TOP_RATED_PLACE_REQUEST,
  GET_TOP_RATED_PLACE_RESET,
  GET_TOP_RATED_PLACE_SUCCESS
} from '../constants/FilterConstant';
import {} from '../constants/placeConstants';

export const getTopRatedPlaceReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TOP_RATED_PLACE_REQUEST:
      return { loading: true, success: false };
    case GET_TOP_RATED_PLACE_SUCCESS:
      return { loading: false, success: true, topRatedPlace: action.payload };
    case GET_TOP_RATED_PLACE_FAIL:
      return { loading: false, error: action.payload };
    case GET_TOP_RATED_PLACE_RESET:
      return {};
    default:
      return state;
  }
};
