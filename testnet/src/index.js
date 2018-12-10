import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import rootReducer from "./store/reducers";

import thunk from "thunk";
import { createStore, applyMiddleware } from "redux";
import { BrowswerRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.querySelector("#root")
);
