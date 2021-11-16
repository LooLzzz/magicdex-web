import store from "./store"
import reducer, { actions } from './reducerSlice'

export default reducer
export { store }

export const {
  /** .activeUser **/
  setActiveUser,
  setCurrentCollection,
  updateCollection,

  /** .theme **/
  toggleThemeType,

  /** .app **/
  setCurrency,
  toggleCurrency, // toggles between 'usd' and 'eur'
  
  /** .app.topMenu **/
  setCurrentTab,

  /** .app.collection **/
  setView,
  setCurrentOpenCardId,
  setSelectedCardIds,
  removeSelectedCardIds,
  addSelectedCardIds,
  setFilters,
  addFilters,
  removeFilters,
  setCardsSelectableEnabled,
  toggleCardsSelectableEnabled,
  setPageNumber,
  setPerPage,
  
  /** .app.collection.cardInfo **/
  setViewIndex_CardInfo,
  setEditEnabled_CardInfo,

  /** .app.collection.tableView **/
  setColumns_TableView,
  
  /** .app.collection.gridView **/
  setTiltEnabled_GridView,
  toggleTiltEnabled_GridView,
  setTransform3dEnabled_GridView,
  toggleTransform3dEnabled_GridView,

} = actions