import _ from 'lodash'


const appReducers = {
  /** GENERAL APP **/
  setCurrency: (state, action) => {
    state.app.currency = action.payload.currency
  },

  toggleCurrency: (state, action) => {
    const currency = state.app.currency.toLowerCase()
    state.app.currency = currency === 'usd' ? 'eur' : 'usd'
  },


  /** TOP-MENU **/
  setCurrentTab: (state, action) => {
    state.app.topMenu.currentTab = action.payload.tab
  },


  /** COLLECTION **/
  setView: (state, action) => {
    state.app.collection.view = action.payload.view
    state.app.collection.currentOpenCardId = null
  },

  setCurrentOpenCardId: (state, action) => {
    state.app.collection.currentOpenCardId = action.payload.id
  },

  setSelectedCardIds: (state, action) => {
    const { selectedCardIds } = action.payload

    if (Array.isArray(selectedCardIds))
      state.app.collection.selectedCardIds = _.uniq(selectedCardIds)
    else
      throw new Error(`Parameter ${Object.prototype.toString.call(selectedCardIds)} is not an Array`)

  },

  addSelectedCardIds: (state, action) => {
    const { selectedCardIds, id } = action.payload

    state.app.collection.selectedCardIds = _.uniq(
      state.app.collection.selectedCardIds.concat(id || selectedCardIds)
    )
  },

  removeSelectedCardIds: (state, action) => {
    const { selectedCardIds, id } = action.payload

    state.app.collection.selectedCardIds = _.difference(
      state.app.collection.selectedCardIds,
      id ? [id] : selectedCardIds
    )
  },

  setFilters: (state, action) => {
    state.app.collection.filters = action.payload.filters
  },

  addFilters: (state, action) => {
    Object.assign(
      state.app.collection.filters,
      action.payload.filters // object with key-value pairs // { [key]: value }
    )
  },

  removeFilters: (state, action) => {
    state.app.collection.filters = _.omit(
      state.app.collection.filters,
      action.payload.filters //list of keys to remove // [keys]
    )
  },

  setCardsSelectableEnabled: (state, action) => {
    state.app.collection.cardsSelectableEnabled = action.payload.enabled

    if (!state.app.collection.cardsSelectableEnabled)
      state.app.collection.selectedCardIds = []
  },

  toggleCardsSelectableEnabled: (state, action) => {
    state.app.collection.cardsSelectableEnabled = !state.app.collection.cardsSelectableEnabled

    if (!state.app.collection.cardsSelectableEnabled)
      state.app.collection.selectedCardIds = []
  },

  //collection.tableView
  setColumns_TableView: (state, action) => {
    state.app.collection.tableView.columns = action.payload.columns
  },

  //collection.gridView
  setTiltEnabled_GridView: (state, action) => {
    state.app.collection.gridView.tiltEnabled = action.payload.enabled
  },

  toggleTiltEnabled_GridView: (state, action) => {
    state.app.collection.gridView.tiltEnabled = !state.app.collection.gridView.tiltEnabled
  },

  setTransform3dEnabled_GridView: (state, action) => {
    state.app.collection.gridView.transform3dEnabled = action.payload.enabled
  },

  toggleTransform3dEnabled_GridView: (state, action) => {
    state.app.collection.gridView.transform3dEnabled = !state.app.collection.gridView.transform3dEnabled
  },
}

export default appReducers
