import { createSlice } from "@reduxjs/toolkit";

const topMenuSlice = createSlice({
  name: "topMenu",
  initialState: {
    show: false,
    title: "Home",
    back: true,
    rightText: "SignIn",
    rightLink: "/signin",
  },
  reducers: {
    showTopMenu: (state, action) => {
      state.show = true;
      state.title = action.payload.title;
      state.back = action.payload.back;
      state.rightText = action.payload.rightText;
      state.rightLink = action.payload.rightLink;
    },
    hideTopMenu: (state) => {
      state.show = false;
    },
  },
});

export const { hideTopMenu, showTopMenu } = topMenuSlice.actions;
export default topMenuSlice.reducer;
