const topMenuReducers = {
    setCurrentTab: (state, action) => {
        let tab = action.payload;
        state.topMenu = {
            ...state.topMenu,
            currentTab: tab,
        };
    },
}

export default topMenuReducers;