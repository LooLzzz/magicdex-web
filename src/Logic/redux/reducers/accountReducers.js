
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
    const { cards } = action.payload
    const { collection } = state.activeUser

    for (const item of cards) {
      const { _id, action, card } = item
      let idx = -1

      switch (action) {
        case 'CREATED':
          collection.push(card)
          break

        case 'UPDATED':
          idx = collection.findIndex(item => item._id === _id)
          if (idx !== -1)
            Object.assign(collection[idx], card)
          break

        case 'DELETED':
          idx = collection.findIndex(item => item._id === _id)
          if (idx !== -1)
            collection.splice(idx, 1)
          break

        case 'NOP':
        default:
          break
      }
    }

    state.activeUser.collection = collection
    localStorage.setItem('collection', JSON.stringify(collection || []))
  },
}

export default accountReducers