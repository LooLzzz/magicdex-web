const accountReducers = {
    login: (state, action) => {
        let { username, accessToken } = action.payload;
        console.log(typeof(username), typeof(accessToken))
        state.account = {...state.account, username, accessToken};
    },
    logout: (state) => {
        state.account.username = undefined
        state.account.accessToken = undefined
    }
}

export default accountReducers;