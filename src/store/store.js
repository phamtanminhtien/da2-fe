import { combineReducers, configureStore } from "@reduxjs/toolkit";
import menuReducer from "./top-menu";
import authReducer from "./auth";

const reducer = combineReducers({
  menu: menuReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer,
});

export default store;
