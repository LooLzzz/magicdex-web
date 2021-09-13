export default {
    login: (state, action) => {
        let { username, token } = action.payload;
        state.account.username = username;
        state.account.token = token
    },
    register: (state) => {
        state.account.username = undefined
        state.account.token = undefined
    }
}