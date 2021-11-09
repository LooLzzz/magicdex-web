import { getDarkTheme, getLightTheme } from "@/Themes"


const themeReducers = {
  toggleCurrentThemeType: (state, action) => {
    const type = state.theme.currentThemeType === 'dark' ? 'light' : 'dark' // toggle theme type
    localStorage.setItem("themeType", type)

    state.theme = {
      ...state.theme,
      currentThemeType: type,
      currentTheme: type === 'dark' ? getDarkTheme() : getLightTheme(),
    }
  },
}

export default themeReducers
