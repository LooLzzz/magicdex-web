const pick = require('lodash/pick')

const MagicdexApi = require('@/Api/MagicdexApi')
const Config = require('@/Config')


const accountReducers = {
  setActiveUser: (state, action) => {
    const { username, accessToken } = action.payload

    if (!username && !accessToken) {
      localStorage.removeItem('username')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('collection')
    }
    else {
      username && localStorage.setItem('username', username)
      accessToken && localStorage.setItem('accessToken', accessToken)
    }

    state.activeUser = {
      ...state.activeUser,
      accessToken,
      username,
    }
  },

  setCurrentCollection: (state, action) => {
    const { collection } = action.payload

    if (collection)
      localStorage.setItem('collection', JSON.stringify(collection || []))
    else
      localStorage.removeItem('collection')

    state.activeUser.collection = collection
  },

  updateCollection: (state, action) => {
    const { cards, callback } = action.payload
    const { collection } = state.activeUser

    cards.forEach(card => {
      const idx = collection.findIndex(item => item._id === card._id)
      if (idx > -1)
        Object.assign(collection[idx], card)
      else
        collection.push(card)
    })

    if (Config.MODIFY_DB_ALLOWED)
      MagicdexApi.updateCards(cards)
        .then(res => callback && callback({ success: true, res }))
        .catch(err => callback && callback({ success: false, res: err }))
    else
      callback && callback({ success: true, res: {} })

    state.activeUser.collection = collection
    localStorage.setItem('collection', JSON.stringify(collection || []))
  },

  removeCardsFromCollection: (state, action) => {
    const { cards, callback } = action.payload
    const { collection } = state.activeUser
    const { selectedCardIds } = state.app.collection

    cards.map(card => {
      const idx = collection.findIndex(item => item._id === card._id)
      if (idx !== -1)
        collection.splice(idx, 1)

      card.amount = 0 // deletion flag for api
      return pick(card, ['_id', 'amount'])
    })

    if (Config.MODIFY_DB_ALLOWED)
      MagicdexApi.updateCards(cards)
        .then(res => callback && callback({ success: true, res }))
        .catch(err => callback && callback({ success: false, res: err }))
    else
      callback && callback({ success: true, res: {} })

    state.activeUser.collection = collection
    state.app.collection.selectedCardIds = selectedCardIds.filter(id => cards.map(card => card._id).includes(id) === false)
    localStorage.setItem('collection', JSON.stringify(collection || []))
  },
}

export default accountReducers