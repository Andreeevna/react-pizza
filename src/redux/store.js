import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

import reducers from "./reducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);

window.store = store;

export default store;
