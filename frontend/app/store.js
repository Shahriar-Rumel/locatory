import { createStore, combineReducers, applyMiddleware } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer
} from './reducers/userReducers';
import {
  createPlaceReducer,
  getAllPlacesReducer,
  getNearbyPlacesReducer,
  getPlacesByCatagoryReducer
} from './reducers/placeReducers';
import {
  createReviewForPlaceReducer,
  deleteReviewReducer,
  getReviewsByPlaceReducer,
  getReviewsByUserReducer,
  likeReducer
} from './reducers/reviewReducers';
import { getTopRatedPlaceReducer } from './reducers/filterReducers';
import {
  createNotificationReducer,
  getNotificationsForUserReducer
} from './reducers/notificationReducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userLogin']
};

const reducer = combineReducers({
  userLogin: persistReducer(persistConfig, userLoginReducer),
  userRegister: persistReducer(persistConfig, userRegisterReducer),
  userData: persistReducer(persistConfig, userDetailsReducer),
  allPlacesData: persistReducer(persistConfig, getAllPlacesReducer),
  reviewsByPlaceData: persistReducer(persistConfig, getReviewsByPlaceReducer),
  createReviewForPlaceData: persistReducer(
    persistConfig,
    createReviewForPlaceReducer
  ),
  createPlaceData: persistReducer(persistConfig, createPlaceReducer),
  topRatedPlaceData: persistReducer(persistConfig, getTopRatedPlaceReducer),
  notificationsForUserData: persistReducer(
    persistConfig,
    getNotificationsForUserReducer
  ),
  likeData: persistReducer(persistConfig, likeReducer),
  nearbyPlacesData: persistReducer(persistConfig, getNearbyPlacesReducer),
  placesbyCatagoryData: persistReducer(
    persistConfig,
    getPlacesByCatagoryReducer
  ),
  reviewsByUserData: persistReducer(persistConfig, getReviewsByUserReducer),
  deleteReviewData: persistReducer(persistConfig, deleteReviewReducer),
  createNotificationData: persistReducer(
    persistConfig,
    createNotificationReducer
  )
});

// const userInfoFromStorage = r.getItem('userInfo')
//   ? JSON.parse(sessionStorage.getItem('userInfo'))
//   : null;

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // console.log(value);
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

// console.log(getData('userLogin'));

// const userInfoFromStorage = AsyncStorage.getItem('userLogin')
//   ? AsyncStorage.getItem('userLogin')
//   : null;

let userInfoFromStorage;

(async () => {
  userInfoFromStorage = (await AsyncStorage.getItem('userLogin'))
    ? await AsyncStorage.getItem('userLogin')
    : null;
})();

const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage
  }
};
// console.log(userLogin);

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
const persistor = persistStore(store);
export { store, persistor };
