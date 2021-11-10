import { createSlice } from "@reduxjs/toolkit"

import initialState from "./initialState"
import { appReducers, accountReducers, themeReducers } from "./reducers"


export const reducerSlice = createSlice({
  name: "actions",
  initialState: initialState,
  reducers: {
    ...appReducers,
    ...accountReducers,
    ...themeReducers,
  },
})

export default reducerSlice.reducer

export const {
  actions
} = reducerSlice