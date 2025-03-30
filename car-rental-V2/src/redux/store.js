// Redux store.js
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Action types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// Action creators
export const login = () => {
  return { type: LOGIN };
};

export const logout = () => {
  return { type: LOGOUT };
};

export const setUsernameState = (UsernameState) => {
  return {
    type: 'SET_USERNAME',
    payload: UsernameState,
  };
};

// Reducer
const initialState = {
  userLogin: false,
  userName: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userLogin: true,
      };
      case 'SET_USERNAME':
        return {
          ...state,
          userName: action.payload,
        };
      case LOGOUT:
        return {
          ...state,
          userLogin: false,
        };
      default:
        return state;
  }
};

// Configure Redux persist
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

// Create the Redux store
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
