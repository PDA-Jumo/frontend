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
export const UP_CASH_BY_WORK = "UP_CASH_BY_WORK";
export const UPDATE_LEVEL = "UPDATE_LEVEL";
export const INIT_LEVEL_CHECK = "INIT_LEVEL_CHECK";
export const UPDATE_LEVEL_NAME = "UPDATE_LEVEL_NAME";

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

export const updateLevelName = (levelName) => {
  return {
    type: UPDATE_LEVEL_NAME,
    payload: {
      levelName: levelName,
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

export const updateLevelAction = (level) => {
  return {
    type: UPDATE_LEVEL,
    payload: {
      level: level,
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

// export const upCashByWorkAction = (cash) => {
//   return {
//     type: UP_CASH_BY_WORK,
//     payload: {
//       cash: cash,
//     },
//   };
// };

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
    case UPDATE_CASH_TOTALASSETS: {
      // // cash 값을 업데이트합니다.
      // const updatedCash = (state.user.cash || 0) + action.payload.cash;

      // // 업데이트된 cash 값에 따라 level을 조정합니다.
      // let newLevel = state.user.level;
      // if (updatedCash >= 30000) {
      //   newLevel = 3;
      //   // redux-saga thunk promise rduxjs/toolkit
      // } else if (updatedCash >= 20000) {
      //   newLevel = 2;
      // } else if (updatedCash >= 10000) {
      //   newLevel = 1;
      // }

      // return {
      //   ...state,
      //   user: {
      //     ...state.user,
      //     cash: updatedCash,
      //     total_assets: (state.user.total_assets || 0) + action.payload.cash,
      //     level: newLevel, // 업데이트된 level을 상태에 반영합니다.
      //   },
      // };

      return {
        ...state,
        user: {
          ...state.user,
          cash: state.user.cash + action.payload.cash,
          total_assets: state.user.total_assets + action.payload.cash,
        },
      };
    }
    case UPDATE_TYPE:
      return {
        ...state,
        user: {
          ...state.user,
          type: action.payload.type,
        },
      };
    // case UP_CASH_BY_WORK:
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       cash: (state.user.cash || 0) + action.payload.cash,
    //     },
    //   };
    case UPDATE_LEVEL:
      return {
        ...state,
        user: {
          ...state.user,
          level: action.payload.level,
        },
      };
    case UPDATE_LEVEL_NAME:
      return {
        ...state,
        user: {
          ...state.user,
          level_name: action.payload.levelName,
        },
      };
    default:
      return state;
  }
}
