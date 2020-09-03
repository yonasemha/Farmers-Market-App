import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import errorReducer from "./store/reducer/errorReducer";
import userReducer from "./store/reducer/userReducer";
import productReducer from "./store/reducer/productReducer";




const Rootreducer = combineReducers({
  errorReducer: errorReducer,
  userReducer: userReducer,
  productReducer: productReducer


});


// The thunk is middleware that is used to delay the dispatch of an action, or to dispatch only if a certain condition is met.
export const store = createStore(Rootreducer, applyMiddleware(thunk));

ReactDOM.render(
  //Provider is used to connect redux with react
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
