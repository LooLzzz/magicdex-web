const accountReducers = {
  setActiveUser: (state, action) => {
    let {username, accessToken} = action.payload;
    
    state.account = {
      ...state.account,
      accessToken,
      username,
    };
  },
}

export default accountReducers;