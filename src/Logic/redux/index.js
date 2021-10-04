import store from "./store";
import reducer, {
  setActiveUser,
  setCurrentTab,
  toggleCurrentThemeType
} from './reducerSlice'

export {
  reducer as default,
  store,
  setActiveUser,
  setCurrentTab,
  toggleCurrentThemeType,
}