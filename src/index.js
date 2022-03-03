import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Routes } from "react-router-dom";
import store from "./redux/store";

import "./scss/app.scss";
import App from "./App";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Routes>
      <Provider store={store}>
        <App />
      </Provider>
    </Routes>
  </React.StrictMode>,
  document.getElementById("root")
);
