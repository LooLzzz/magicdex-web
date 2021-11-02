import store from "./store";
import reducer, {
  setActiveUser,
  setCurrentTab,
  toggleCurrentThemeType,
  setCurrentCollection,
  updateCurrentCollection,
  removeCardsFromCollection,
} from './reducerSlice'

export {
  reducer as default,
  store,
  setActiveUser,
  setCurrentCollection,
  updateCurrentCollection,
  removeCardsFromCollection,
  setCurrentTab,
  toggleCurrentThemeType,
}