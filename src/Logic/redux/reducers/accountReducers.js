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
      localStorage.setItem('collection', JSON.stringify(collection))
    else
      localStorage.removeItem('collection')

    state.activeUser = {
      ...state.activeUser,
      collection,
    }
  }
}

export default accountReducers