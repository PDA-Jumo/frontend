// reducers/userReducer.js
//initial state
const initialState = {
  user: {},
};

//Action Types
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

//Action Creator
export const loginAction = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user: user,
    },
  };
};

export const logoutAction = (user) => {
  return {
    type: LOGOUT,
    payload: {
      user: null,
    },
  };
};

//Reducer
export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        user: null,
      };
    default:
      return state;
  }
}
