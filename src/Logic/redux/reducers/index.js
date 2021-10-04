import accountReducers from './accountReducers';
import themeReducers from './themeReducers';
import topMenuReducers from './topMenuReducers';

import { combineReducers } from "redux";

export default combineReducers({
    account: accountReducers,
    theme: themeReducers,
    topMenu: topMenuReducers
});

export {
    accountReducers,
    themeReducers,
    topMenuReducers,
}