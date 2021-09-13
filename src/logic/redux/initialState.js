import { getInitialTheme } from "@/themes/themes";

export default {
  apiURL: "https://magicdex-server.herokuapp.com/",
  account: {
    username: undefined,
    token: undefined,
  },
  currentCollection: {},
  themes: {
    currentTheme: getInitialTheme(),
  },
};
