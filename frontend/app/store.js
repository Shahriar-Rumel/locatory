import { createStore, combineReducers, applyMiddleware } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer } from './reducers/userReducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userLogin']
};

const reducer = combineReducers({
  userLogin: persistReducer(persistConfig, userLoginReducer)
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
