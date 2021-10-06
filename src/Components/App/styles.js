const useStyles = (theme) => {
  // const bottomBarHeight = '50px'
  const leftRightPadding = theme.spacing(10)
  const topBottomPadding = theme.spacing(8)

  return {
    '@global': {
      '#root': {
        // display: 'flex',
        // justifyContent: 'center',
        // minHeight: '100vh',
        // maxHeight: '100vh',
        // height: '100vh',
        // minWidth: '100wh',
        maxWidth: '100wh',
        width: '100wh',
        // background: theme.palette.background.default,
        // background: `linear-gradient(35deg, ${theme.palette.background.default} 20%, ${theme.palette.background.paper} 175%)`,
        // background: `linear-gradient(35deg, ${theme.palette.background.paper} 10%, ${theme.palette.background.default} 225%)`,
        paddingTop: topBottomPadding,
        // paddingBottom: topBottomPadding,
        paddingLeft: leftRightPadding,
        paddingRight: leftRightPadding,
      }
    },

    root: {
      display: 'flex',
      justifyContent: 'center',
      // minHeight: '100vh',
      // maxHeight: '100vh',
      // minWidth: '100wh',
      // maxWidth: '100wh',
      // background: theme.palette.background.default,
      // background: `linear-gradient(35deg, ${theme.palette.background.default} 20%, ${theme.palette.background.paper} 175%)`,
      // background: `linear-gradient(35deg, ${theme.palette.background.paper} 10%, ${theme.palette.background.default} 225%)`,
    },
    content: {
      flexGrow: 1,
      // maxWidth: '100wh',
      // maxWidth: '95%',
      // minHeight: '100vh',
      // maxHeight: `calc(100vh - ${topBottomPadding})`,
      textAlign: '-webkit-center',
      // display: 'flex',
      // justifyContent: 'center',
      // alignItems: 'center',
      // paddingTop: topBottomPadding,
      // paddingBottom: topBottomPadding,
      // paddingLeft: leftRightPadding,
      // paddingRight: leftRightPadding,
      // boxShadow: theme.shadows[4]
    },
  }
}

export default useStyles;