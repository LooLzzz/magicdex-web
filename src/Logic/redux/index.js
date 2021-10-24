import store from "./store";
import reducer, {
  setActiveUser,
  setCurrentTab,
  toggleCurrentThemeType,
  setCurrentCollection,
  updateCurrentCollection,
} from './reducerSlice'

export {
  reducer as default,
  store,
  setActiveUser,
  setCurrentCollection,
  updateCurrentCollection,
  setCurrentTab,
  toggleCurrentThemeType,
}