import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import accountReducers from "./reducers/accountReducers";

export const reducerSlice = createSlice({
  name: "actions",
  initialState: initialState,
  reducers: {...accountReducers, },
});

export const {
login,
logout,
} = reducerSlice.actions;

export default reducerSlice.reducer;