import { getDarkTheme, getLightTheme } from "@/Themes";


const themeReducers = {
  toggleCurrentThemeType: (state, action) => {
    let type = state.theme.currentThemeType;
    type = (type === "dark") ? "light" : "dark"; // toggle
    localStorage.setItem("themeType", type);

    state.theme = {
      ...state.theme,
      currentThemeType: type,
      currentTheme: type === 'dark' ? getDarkTheme() : getLightTheme(),
    }
  },
};

export default themeReducers;
