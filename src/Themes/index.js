/* eslint-disable no-unused-vars */

import { createTheme, colors } from "@material-ui/core"
const baseTheme = createTheme()
const getContrastText = baseTheme.palette.getContrastText

/** SHARED VALUES **/
const sharedOverrides = {
  MuiCssBaseline: {
    "@global": {
      "code": {
        padding: '2px',
        // marginLeft: '0.25em',
        // backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '12.5%',
      },
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
      ".cursor-pointer": {
        cursor: "pointer",
      },
      '.floating': {
        // position: 'absolute',
        // zIndex: '999',
        maxWidth: baseTheme.spacing(25),
        padding: `${baseTheme.spacing(0.5)}px ${baseTheme.spacing(1.25)}px ${baseTheme.spacing(0.5)}px ${baseTheme.spacing(1.25)}px`,
      },
    },
  },
  MuiListItemText: {
    multiline: {
      marginTop: 0,
      marginBottom: 0,
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
}


/** DARK THEME **/
const darkPrimary = {
  main: '#2D5295',
  // main: '#2D4583',
  // main: '#404664',
}
const darkSecondary = {
  // main: colors.purple[500],
  // main: '#731FA1',
  // main: '#BF9EEE',
  // main: '#8A8FEE',
  main: '#DA7B08',
  // main: '#F3533B',
  // main: '#FA9F42',
  // main: '#F56C40',
  // main: colors.orange['900'],
  // main: colors.deepPurple['200'],
}
const darkThirdly = {
  main: colors.purple[800],
  secondary: colors.purple[700]
  // main: '#DA7B08',
  // main: '#731FA1',
  // main: '#45155F',
}

const getDarkTheme = () =>
  createTheme({
    palette:
    {
      type: 'dark',
      table: {
        divider: '#424242',
      },
      primary: {
        ...darkPrimary,
        contrastText: getContrastText(darkPrimary.main)
      },
      secondary: {
        ...darkSecondary,
        contrastText: getContrastText(darkSecondary.main)
      },
      thridly: {
        ...darkThirdly,
        contrastText: getContrastText(darkThirdly.main)
      },
      background: {
        secondary: colors.grey['700'],
      }
    },

    overrides:
    {
      ...sharedOverrides,
      MuiCssBaseline: {
        '@global': {
          ...sharedOverrides.MuiCssBaseline,
          code: {
            ...sharedOverrides.MuiCssBaseline.code,
            backgroundColor: 'rgba(255,255,255,0.1)',
          },
          a: {
            color: darkSecondary.main,
          },
          '.floating': {
            ...sharedOverrides.MuiCssBaseline['.floating'],
            backgroundColor: colors.grey['700'],
            color: getContrastText(colors.grey['700']),
          },
          '.buttonThridly-root': {
            color: getContrastText(darkThirdly.main),
            backgroundColor: darkThirdly.main,
            '&:hover': {
              backgroundColor: darkThirdly.secondary,
            },
          },
        },
      },
      MuiCircularProgress: {
        circle: {
          color: 'white',
        },
      },
    },
  })


/** LIGHT THEME **/
const getLightTheme = () =>
  createTheme({
    palette: {
      type: 'light',
      secondary: {
        // main: colors.orange[900],
        // main: colors.purple['A400'],
        // main: '#9568AD',
        // main: '#D695F9',
        main: '#E3468C',
        contrastText: getContrastText('#E3468C'),
      },
      table: {
        divider: 'rgba(150, 150, 150, 0.75)'
      },
      background: {
        default: '#D5D5D5',
        paper: '#F0F0F0',
        secondary: colors.grey['400'],
      },
      thridly: {
        main: colors.purple[500],
        secondary: colors.purple[700],
        contrastText: getContrastText(colors.purple[500]),
      },
    },

    overrides: {
      ...sharedOverrides,
      MuiCssBaseline: {
        '@global': {
          ...sharedOverrides.MuiCssBaseline,
          code: {
            ...sharedOverrides.MuiCssBaseline.code,
            backgroundColor: 'rgba(0,0,0,0.1)',
          },
          a: {
            // color: '#4f6ce2',
            color: '#bf9eee',
          },
          '.floating': {
            ...sharedOverrides.MuiCssBaseline['.floating'],
            backgroundColor: colors.grey['A100'],
            color: getContrastText(colors.grey['A100']),
          },
          '.buttonThridly-root': {
            color: getContrastText(colors.purple[500]),
            backgroundColor: colors.purple[500],
            '&:hover': {
              backgroundColor: colors.purple[700],
            },
          },
        },
      },
      MuiCircularProgress: {
        circle: {
          color: 'currentColor',
        },
      },
    },
  })


export { getDarkTheme, getLightTheme }
