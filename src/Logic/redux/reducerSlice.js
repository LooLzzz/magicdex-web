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

export const {
  setActiveUser,
  setCurrentTab,
  toggleCurrentThemeType,
  setCurrentCollection,
  updateCurrentCollection,
  removeCardsFromCollection,
  setCurrentCardId,
  setSelectedCardIds,
  removeSelectedCardIds,
  addSelectedCardIds,
} = reducerSlice.actions

export default reducerSlice.reducer