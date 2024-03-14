//initial state
const initialState = {
  searchList: [],
};

//Action Types
export const ADD_SEARCH = "ADD_SEARCH";

//Action Creator
export const addsearch = (search) => {
  return {
    type: ADD_SEARCH,
    payload: {
      search: search,
    },
  };
};

//Reducer
export default function SearchReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SEARCH:
      return {
        ...state,
        searchList: [...state.searchList, action.payload.search],
      };
    default:
      return state;
  }
}
