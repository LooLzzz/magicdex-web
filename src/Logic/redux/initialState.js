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
    themeType: themeType,
  },


  app: {
    currency: 'usd',
    topMenu: {
      currentTab: 'home',
    },

    collection: {
      view: 'table',
      currentOpenCardId: undefined,
      cardsSelectableEnabled: false,
      selectedCardIds: [],
      filters: {},

      tableView: {
        columns: {},
      },
      gridView: {
        tiltEnabled: false,
        transform3dEnabled: false,
      },
    },
  },
}

export default INITIAL_STATE
