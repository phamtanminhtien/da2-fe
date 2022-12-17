import { createSlice } from "@reduxjs/toolkit";

const topMenuSlice = createSlice({
  name: "topMenu",
  initialState: {
    show: false,
    title: "Welcome",
    back: true,
    leftText: "",
    leftLink: "/",
    rightText: "",
    rightLink: "/",
  },
  reducers: {
    showTopMenu: (state, action) => {
      state.show = true;
      state.title = action.payload.title;
      state.back = action.payload.back;
      state.leftText = action.payload.leftText;
      state.leftLink = action.payload.leftLink;
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
