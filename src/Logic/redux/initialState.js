import { getDarkTheme, getLightTheme } from "@/Themes"
import { PER_PAGE } from '@/Config'


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
      pageNumber: 0,
      perPage: PER_PAGE,
      currentOpenCardId: undefined,
      cardsSelectableEnabled: false,
      selectedCardIds: [],
      filters: {},

      cardInfo: {
        viewIndex: 0,
        editEnabled: false,
      },
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
