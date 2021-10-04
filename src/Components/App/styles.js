const useStyles = (theme) => {
  // const bottomBarHeight = '50px'
  const leftRightPadding = theme.spacing(10)
  const topBottomPadding = theme.spacing(8)

  return {
    root: {
      display: 'flex',
      minHeight: '100vh',
      minWidth: '100wh',
      maxWidth: '100wh',
      // background: theme.palette.background.default,
      background: `linear-gradient(35deg, ${theme.palette.background.default} 10%, ${theme.palette.background.paper} 225%)`,
      // background: `linear-gradient(35deg, ${theme.palette.background.paper} 10%, ${theme.palette.background.default} 225%)`,
      // background: 'linear-gradient(35deg, #D5D5D5 10%, #F0F0F0 50%)',
    },
    content: {
      flexGrow: 1,
      textAlign: '-webkit-center',
      // display: 'flex',
      // justifyContent: 'center',
      // alignItems: 'center',
      marginTop: topBottomPadding,
      // marginBottom: topBottomPadding,
      marginLeft: leftRightPadding,
      marginRight: leftRightPadding,
      // boxShadow: theme.shadows[4]
    },
  }
}

export default useStyles;