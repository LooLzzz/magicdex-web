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

  updateCurrentCollection: (state, action) => {
    const { cards } = action.payload
    let { collection } = state.activeUser

    cards.forEach(card => {
      const idx = collection.findIndex(item => item._id === card._id)

      if (idx > -1)
        Object.assign(collection[idx], card)
      else
        collection.push(card)
    })

    state.activeUser.collection = collection
  },

  removeCardsFromCollection: (state, action) => {
    const { cards } = action.payload
    let { collection } = state.activeUser

    cards.forEach(card => {
      const idx = collection.findIndex(item => item._id === card._id)
      if (idx !== -1)
        collection.splice(idx, 1)
    })

    state.activeUser.collection = collection
  },
}

export default accountReducers