/* eslint-disable no-unused-vars */

import { createTheme, colors } from "@material-ui/core";
const baseTheme = createTheme()

/** SHARED VALUES **/
const sharedOverrides = {
  MuiCssBaseline: {
    "@global": {
      ".alignLeft": {
        textAlign: "left",
      },
      ".alignRight": {
        textAlign: "right",
      },
      a: {
        textDecoration: "none",
      },
      "a:hover": {
        textDecoration: "underline",
      },
      ".hidden": {
        display: "none",
      },
    },
  },
  MuiTextField: {
    root: {
      width: "100%",
      margin: "0.4em",
    },
  },
  MuiPaper: {
    rounded: {
      borderRadius: "12.5px",
    },
  },
  MuiListSubheader: {
    root: {
      display: 'flex',
      alignItems: 'center',
      columnGap: '0.6em',
    },
  },
  MuiListItem: {
    secondaryAction: {
      paddingRight: baseTheme.spacing(8),
    },
  },
};


/** DARK THEME **/
const darkPrimary = {
  main: '#2D5295',
  // main: '#2D4583',
  // main: '#404664',
}
const darkSecondary = {
  // main: '#BF9EEE',
  // main: '#8A8FEE',
  main: '#DA7B08',
  // main: '#F3533B',
  // main: '#FA9F42',
  // main: '#F56C40',
  // main: colors.orange['900'],
  // main: colors.deepPurple['200'],
}

const getDarkTheme = () =>
  createTheme({
    palette:
    {
      type: 'dark',
      table: {
        divider: '#424242',
      },
      primary: { ...darkPrimary },
      secondary: { ...darkSecondary },
    },

    overrides:
    {
      ...sharedOverrides,
      MuiCssBaseline: {
        '@global': {
          ...sharedOverrides.MuiCssBaseline,
          a: {
            color: darkSecondary.main,
          },
        },
      },
      MuiCircularProgress: {
        circle: {
          color: 'white',
        },
      },
    },
  });


/** LIGHT THEME **/
const lightTable = { divider: 'rgba(150, 150, 150, 0.75)' }
const lightBackground = {
  default: '#D5D5D5',
  paper: '#F0F0F0',
}

const getLightTheme = () =>
  createTheme({
    palette: {
      type: 'light',
      table: { ...lightTable },
      background: { ...lightBackground },
    },

    overrides: {
      ...sharedOverrides,
      MuiIconButton: {
        root: {
          color: 'white',
        }
      },
    },
  });


export { getDarkTheme, getLightTheme };
