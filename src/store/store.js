import { combineReducers, configureStore } from "@reduxjs/toolkit";
import menuReducer from "./top-menu";

const reducer = combineReducers({
  menu: menuReducer,
});

const store = configureStore({
  reducer,
});

export default store;
