//initial state
const initialState = {
  searchList: [{}],
};

//Action Types
export const ADD_SEARCH = "ADD_SEARCH";
export const DELETE_SEARCH = "DELETE_SEARCH"

//Action Creator
export const addsearch = (search) => {
  return {
    type: ADD_SEARCH,
    payload: {
      search: search,
    },
  };
};

export const deletesearch = (id)=>{
  return{
    type: DELETE_SEARCH,
    payload:{
      id: id
    }
  }
}

//Reducer
export default function SearchReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SEARCH:
      return {
        ...state,
        searchList: [...state.searchList, action.payload.search],
      };
    case DELETE_SEARCH:
      return{
        ...state,
        searchList: state.searchList.filter((search)=>{return search.id !== action.payload.id})
      }
    default:
      return state;
  }
}
