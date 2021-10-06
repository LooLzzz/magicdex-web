
const useStyles = (theme) => {
  // const bottomBarHeight = '50px'
  // const mainSidesPadding = theme.spacing(10)

  return {
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
    collapsableContent: {
      paddingBottom: 0,
      paddingTop: 0,
    },
    amount: {
      padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px ${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
      // marginRight: theme.spacing(0.2),
      backgroundColor: theme.palette.background.secondary,
      color: theme.palette.getContrastText(theme.palette.background.secondary),
    },
    mana: {
      marginRight:'0.25em',
      // fontSize: '0.85em',
    },
    floating: {
      position: 'absolute',
      zIndex: '999',
      maxWidth: theme.spacing(25),
      padding: `${theme.spacing(0.5)}px ${theme.spacing(1.25)}px ${theme.spacing(0.5)}px ${theme.spacing(1.25)}px`,
      backgroundColor: theme.palette.background.secondary,
      color: theme.palette.getContrastText(theme.palette.background.secondary),
    }
  }
}

export default useStyles