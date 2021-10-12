import { getDarkTheme, getLightTheme } from "@/Themes";

/** LOCAL STORAGE **/
let themeType = localStorage.getItem("themeType");
let accessToken = localStorage.getItem("accessToken");

themeType = themeType ? themeType : "dark";


/** STATE **/
const INITIAL_STATE = {
  activeUser: {
    username: undefined,
    accessToken: accessToken,
    collection: undefined,
  },
  theme: {
    currentTheme: themeType === 'dark' ? getDarkTheme() : getLightTheme(),
    currentThemeType: themeType,
  },
  topMenu: {
    currentTab: 'home',
  }
};

export default INITIAL_STATE;
