const accountReducers = {
  setActiveUser: (state, action) => {
    const { username, accessToken } = action.payload;

    state.activeUser = {
      ...state.activeUser,
      accessToken,
      username,
    };
  },

  setCurrentCollection: (state, action) => {
    const { collection } = action.payload;

    state.activeUser = {
      ...state.activeUser,
      collection,
    }
  }
}

export default accountReducers;