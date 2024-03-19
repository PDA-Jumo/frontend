// reducers/userReducer.js
//initial state
const initialState = {
  user: {},
};

//Action Types
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const UPDATE_CASH_TOTALASSETS = "UPDATE_CASH_TOTALASSETS";
export const UPDATE_TYPE = "UPDATE_TYPE";

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

export const updateFinancialsAction = (cash) => {
  return {
    type: UPDATE_CASH_TOTALASSETS,
    payload: {
      cash: cash,
    },
  };
};

export const updateTypeAction = (type) => {
  return {
    type: UPDATE_TYPE,
    payload: {
      type: type,
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
    case UPDATE_CASH_TOTALASSETS:
      return {
        ...state,
        user: {
          ...state.user,
          cash: (state.user.cash || 0) + action.payload.cash,
          total_assets: (state.user.total_assets || 0) + action.payload.cash,
        },
      };
    case UPDATE_TYPE:
      return {
        ...state,
        user: {
          ...state.user,
          type: action.payload.type,
        },
      };
    default:
      return state;
  }
}
