//initial state
const initialState = {
  searchList: [{}],
};

//Action Types
export const ADD_SEARCH = "ADD_SEARCH";
export const DELETE_SEARCH = "DELETE_SEARCH";

//Action Creator
export const addsearch = (search) => {
  return {
    type: ADD_SEARCH,
    payload: {
      content: search.content,
    },
  };
};

export const deletesearch = (id) => {
  return {
    type: DELETE_SEARCH,
    payload: {
      id: id,
    },
  };
};

//Reducer
export default function SearchReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SEARCH:
      return {
        ...state,
        searchList: [...state.searchList, action.payload.content],
      };
    case DELETE_SEARCH:
      return {
        ...state,
        searchList: state.searchList.filter((search) => {
          return search.stock_code !== action.payload.id;
        }),
      };
    default:
      return state;
  }
}
