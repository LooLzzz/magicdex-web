const useStyles = (theme) => {
  // const bottomBarHeight = '50px'
  const leftRightPadding = theme.spacing(10)
  const topBottomPadding = theme.spacing(8)
  const contrast = theme.palette.type === 'dark' ? '255,255,255' : '0,0,0'
  // console.log(theme.palette)

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
        // paddingTop: topBottomPadding,
        // paddingBottom: topBottomPadding,
        // paddingLeft: leftRightPadding,
        // paddingRight: leftRightPadding,
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
      overflow: 'auto',
      paddingTop: topBottomPadding,
      // paddingBottom: topBottomPadding,
      paddingLeft: leftRightPadding,
      paddingRight: leftRightPadding,
      // flexGrow: 1,
      // maxWidth: '100wh',
      // maxWidth: '95%',
      // minHeight: '100vh',
      // minHeight: `calc(100vh - ${topBottomPadding}px)`,
      minHeight: '100vh',
      // textAlign: '-webkit-center',
      // display: 'flex',
      // justifyContent: 'center',
      // alignItems: 'center',
      // paddingTop: topBottomPadding,
      // paddingBottom: topBottomPadding,
      // paddingLeft: leftRightPadding,
      // paddingRight: leftRightPadding,
      // boxShadow: theme.shadows[4]
    },
    bottomBar: {
      minHeight: topBottomPadding,
      maxHeight: topBottomPadding,
      padding: theme.spacing(1),

      backgroundColor: theme.palette.primary[theme.palette.type],
      color: theme.palette.getContrastText(theme.palette.primary[theme.palette.type]),
      // background: `linear-gradient(rgba(${contrast}, 0.17),rgba(${contrast}, 0.17)), ${theme.palette.background.default}`,
      // boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
      // boxShadow: `rgba(${contrast}, 0.5) 0px 2px 4px, rgba(${contrast}, 0.4) 0px 7px 13px -3px, rgba(${contrast}, 0.3) 0px -3px 0px inset`,
      // boxShadow: 'rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset',
      // boxShadow: 'rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px',
      // boxShadow: '      0px -2px 4px -1px rgb(0 0 0 / 20%), 0px -4px 5px 0px rgb(0 0 0 / 14%), 0px -1px 10px 0px rgb(0 0 0 / 12%)',
      // boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
      // boxShadow: 'rgba(0, 0, 0, 0.45) 0px -25px 20px -20px',
    },
  }
}

export default useStyles