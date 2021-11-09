import _ from 'lodash'


const appReducers = {
  setCurrentTab: (state, action) => {
    const { tab } = action.payload

    state.app.topMenu = {
      ...state.app.topMenu,
      currentTab: tab,
    }
  },

  setCurrentCardId: (state, action) => {
    const { id } = action.payload

    state.app.collection.currentCardId = id
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
      selectedCardIds.concat(id || selectedCardIds)
    )
  },

  removeSelectedCardIds: (state, action) => {
    const { selectedCardIds, id } = action.payload

    state.app.collection.selectedCardIds = _.difference(
      selectedCardIds,
      id ? [id] : selectedCardIds
    )
  },
}

export default appReducers
