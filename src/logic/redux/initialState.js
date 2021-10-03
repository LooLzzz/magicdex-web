import { getDarkTheme } from "@/Themes";
// import { getLightTheme } from "@/Themes";

const INITIAL_STATE = {
  account: {
    username: null,
    accessToken: null,
    collection: {},
  },
  theme: {
    currentTheme: getDarkTheme(),
    currentThemeType: 'dark',
  },
  topMenu: {
    currentTab: 'home',
  }
};

export default INITIAL_STATE;
