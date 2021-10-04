import { createSlice } from "@reduxjs/toolkit";

import initialState from "./initialState";
import { accountReducers, themeReducers, topMenuReducers } from "./reducers"


export const reducerSlice = createSlice({
  name: "actions",
  initialState: initialState,
  reducers: {
    ...accountReducers,
    ...themeReducers,
    ...topMenuReducers
  },
});

export const {
  setActiveUser,
  setCurrentTab,
  toggleCurrentThemeType,
} = reducerSlice.actions;

export default reducerSlice.reducer;