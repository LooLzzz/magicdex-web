import store from "./store";
import reducer, {
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
  setCurrentCardId,
  setSelectedCardIds,
  removeSelectedCardIds,
  addSelectedCardIds,
}