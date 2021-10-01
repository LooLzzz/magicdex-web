import { getDarkTheme, getLightTheme } from "@/Themes";

const INITIAL_STATE = {
  apiURL: "https://magicdex-server.herokuapp.com/",
  // apiURL: "localhost:5000/",
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
    currentTab: 0,
  }
};

export default INITIAL_STATE;
