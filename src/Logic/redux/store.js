import { configureStore } from "@reduxjs/toolkit"
import reducerSlice from "./reducerSlice"

export default configureStore({
  reducer: { actions: reducerSlice },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})
