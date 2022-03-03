const SET_SORT_BY = "SET_SORT_BY";
const SET_CATEGORY = "SET_CATEGORY";

const initialState = {
  category: null,
  sortBy: "popular",
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SORT_BY: {
      return {
        ...state,
        sortBy: action.payload,
      };
    }

    case SET_CATEGORY: {
      return {
        ...state,
        category: action.payload
      }
    }

    default:
      return state;
  }
};

export const setSortByAC = (payload) => {
  return {
    type: SET_SORT_BY,
    payload,
  };
};

export const setCategoryAC = (catIndex) => {
  return {
    type: SET_CATEGORY,
    payload: catIndex,
  };
};

export default filtersReducer;
