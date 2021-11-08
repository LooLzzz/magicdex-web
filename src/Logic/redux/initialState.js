import { getDarkTheme, getLightTheme } from "@/Themes"


/** LOCAL STORAGE **/
let themeType = localStorage.getItem("themeType") ?? 'dark'
let accessToken = localStorage.getItem("accessToken")
let username = localStorage.getItem("username")
let collection = JSON.parse(localStorage.getItem("collection")) ?? []

themeType = themeType ? themeType : "dark"


/** STATE **/
const INITIAL_STATE = {
  activeUser: {
    username,
    accessToken,
    collection,
  },
  theme: {
    currentTheme: themeType === 'dark' ? getDarkTheme() : getLightTheme(),
    currentThemeType: themeType,
  },
  app: {
    topMenu: {
      currentTab: 'home',
    },
    collection: {
      currentCardId: undefined,
      selectedCardIds: [],
    },
  },
}

export default INITIAL_STATE
