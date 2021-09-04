import { configureStore } from "@reduxjs/toolkit";
import reducerSlice from "./reducerSlice";

export default configureStore({
  reducer: { actions: reducerSlice },
});
