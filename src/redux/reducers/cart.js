const SET_TOTALPRICE = "SET_TOTALPRICE";
const SET_TOTALCOUNT = "SET_TOTALCOUNT";
const ADD_PIZZA_CART = "ADD_PIZZA_CART";
const CLEAR_CART = "CLEAR_CART";
const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";
const PLUS_CART_ITEM = "PLUS_CART_ITEM";
const MINUS_CART_ITEM = "MINUS_CART_ITEM";

const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PIZZA_CART: {
      const currentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };

      const totalCount = Object.keys(newItems).reduce((sum, key) => {
        return newItems[key].items.length + sum;
      }, 0);
      const totalPrice = Object.keys(newItems).reduce((sum1, key1) => {
        return newItems[key1].totalPrice + sum1;
      }, 0);

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case PLUS_CART_ITEM: {
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = Object.keys(newItems).reduce((sum, key) => {
        return newItems[key].items.length + sum;
      }, 0);
      const totalPrice = Object.keys(newItems).reduce((sum1, key1) => {
        return newItems[key1].totalPrice + sum1;
      }, 0);


      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case MINUS_CART_ITEM: {
      const oldItems = state.items[action.payload].items;
      const newObjItems =
        oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = Object.keys(newItems).reduce((sum, key) => {
        return newItems[key].items.length + sum;
      }, 0);
      const totalPrice = Object.keys(newItems).reduce((sum1, key1) => {
        return newItems[key1].totalPrice + sum1;
      }, 0);
      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }
    
    case CLEAR_CART: {
      return {
        items: {},
        totalPrice: 0,
        totalCount: 0,
      };
    }

    case REMOVE_CART_ITEM: {
      const newItems = {
        ...state.items,
      };

      const currentTotalPrice = newItems[action.payload].totalPrice;
      const currentTotaCount = newItems[action.payload].items.length;

      delete newItems[action.payload];

      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotaCount,
      };
    }

    default:
      return state;
  }
};

export const addPizzaToCartAC = (pizzaObj) => {
  return {
    type: ADD_PIZZA_CART,
    payload: pizzaObj,
  };
};

export const setTotalCountAC = (count) => {
  return {
    type: SET_TOTALCOUNT,
    payload: count,
  };
};

export const setTotalPiceAC = (price) => {
  return {
    type: SET_TOTALPRICE,
    payload: price,
  };
};

export const plusItemAC = (id) => {
  return {
    type: PLUS_CART_ITEM,
    payload: id,
  };
};

export const minusItemAC = (id) => {
  return {
    type: MINUS_CART_ITEM,
    payload: id,
  };
};

export const clearCartAC = () => {
  return {
    type: CLEAR_CART,
  };
};

export const removeCartItemAC = (id) => {
  return {
    type: REMOVE_CART_ITEM,
    payload: id,
  };
};

export default cartReducer;
