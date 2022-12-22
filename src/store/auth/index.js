import { createSlice } from "@reduxjs/toolkit";
import {
  clearLocalStorage,
  removeLocalStorageByName,
  setLocalStorage,
  STORAGE_KEYS,
} from "../../localStorage";
import jwt_decode from "jwt-decode";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      setLocalStorage(STORAGE_KEYS.jwt_token, action.payload.access_token);
      const user_info = jwt_decode(action.payload.access_token);
      state.user = user_info;
      setLocalStorage(STORAGE_KEYS.user_info, JSON.stringify(user_info));
    },
    logout: (state) => {
      console.log("asas");
      state.user = null;
      clearLocalStorage();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
