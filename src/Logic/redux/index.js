import store from "./store";
import reducer, {
  setActiveUser,
  setCurrentTab,
  toggleCurrentThemeType,
  setCurrentCollection,
} from './reducerSlice'

export {
  reducer as default,
  store,
  setActiveUser,
  setCurrentCollection,
  setCurrentTab,
  toggleCurrentThemeType,
}