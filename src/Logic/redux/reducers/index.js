import appReducers from './appReducers'
import accountReducers from './accountReducers'
import themeReducers from './themeReducers'

import { combineReducers } from "redux"

export default combineReducers({
  app: appReducers,
  account: accountReducers,
  theme: themeReducers,
})

export {
  appReducers,
  accountReducers,
  themeReducers,
}