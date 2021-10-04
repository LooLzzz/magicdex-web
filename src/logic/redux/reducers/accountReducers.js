const accountReducers = {
  setActiveUser: (state, action) => {
    let {username, accessToken} = action.payload;
    
    state.activeUser = {
      ...state.activeUser,
      accessToken,
      username,
    };
  },
}

export default accountReducers;