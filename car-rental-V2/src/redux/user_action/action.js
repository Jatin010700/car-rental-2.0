// Action types
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// Action creators
// userActions.js
export const login = (username) => {
  return {
    type: 'LOGIN',
    payload: username,
  };
};


export const logout = () => {
  return { type: LOGOUT };
};
