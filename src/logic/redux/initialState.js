import { getDarkTheme, getLightTheme } from "@/Themes";

const INITIAL_STATE = {
  apiUrl: "https://magicdex-server.herokuapp.com/",
  // apiUrl: "localhost:5000/",
  account: {
    username: undefined,
    accessToken: undefined,
  },
  currentCollection: {},
  theme: {
    currentTheme: getDarkTheme(),
    // currentTheme: getLightTheme(),
  },
  topMenu: {
    currentTab: 'home',
  }
};

export default INITIAL_STATE;
