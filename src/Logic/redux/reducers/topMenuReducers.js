const topMenuReducers = {
  setCurrentTab: (state, action) => {
    const { tab } = action.payload;
    
    state.topMenu = {
      ...state.topMenu,
      currentTab: tab,
    };
  },
};

export default topMenuReducers;
