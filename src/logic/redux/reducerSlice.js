import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";

export const reducerSlice = createSlice({
  name: "actions",
  initialState: initialState,
  reducers: {},
});

export const {

} = reducerSlice.actions;

export default reducerSlice.reducer;