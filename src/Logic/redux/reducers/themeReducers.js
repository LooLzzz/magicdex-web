import { getDarkTheme, getLightTheme } from "@/Themes"


const themeReducers = {
  toggleThemeType: (state, action) => {
    const type = state.theme.themeType === 'dark' ? 'light' : 'dark' // toggle theme type
    localStorage.setItem("themeType", type)

    state.theme = {
      ...state.theme,
      themeType: type,
      currentTheme: type === 'dark' ? getDarkTheme() : getLightTheme(),
    }
  },
}

export default themeReducers
