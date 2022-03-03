import axios from "axios";

const SET_PIZZAS = "SET_PIZZAS";
const SET_LOADED = "SET_LOADED";

const initialState = {
  items: [],
  isLoading: false,
};

const pizzasReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PIZZAS: {
      return {
        ...state,
        items: action.payloadPizzas,
        isLoading: true,
      };
    }

    case SET_LOADED: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    default:
      return state;
  }
};

export const setPizzasAC = (items) => {
  return {
    type: SET_PIZZAS,
    payloadPizzas: items,
  };
};

export const setLoaded = (val) => ({
  type: SET_LOADED,
  payload: val,
});

export const fetchPizzas = (category, sortBy) => {
  return (dispatch) => {
    dispatch(setLoaded(false));
    axios
      .get(
        `/pizzas?${
          category !==null ? `category=${category}` : ""
        }&_sort=${sortBy}&_order=asc`
      )
      .then(({ data }) => {
        dispatch(setPizzasAC(data));
      });
    dispatch(setLoaded(true));
  };
};

export default pizzasReducer;
