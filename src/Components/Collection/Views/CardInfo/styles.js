
const useStyles = (theme) => {
  // const bottomBarHeight = '50px'
  // const mainSidesPadding = theme.spacing(10)

  return {
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.secondary,
      position: 'relative',
      marginTop: theme.spacing(1),
      padding: `${theme.spacing(5)}px ${theme.spacing(5)}px ${theme.spacing(5)}px ${theme.spacing(4)}px`,
      // display: 'flex',
      // flexWrap: 'wrap',
      // alignItems: 'baseline',
      // flexDirection: 'column',
      // justifyContent: 'center',
      // alignContent: 'center',
    },
    topArrow: {
      content: '""',
      zIndex: 1,
      top: -1,
      width: 0,
      height: 0,
      position: 'absolute',
      backgroundColor: 'unset',
      border: 'solid transparent',
      borderWidth: '1.5rem 1.75rem 0rem 1.75rem',
      left: `calc(50% - (1.75rem / 2))`,
      transition: 'all 0.3s ease',
    },
    image: {
      marginRight: -theme.spacing(1),
      // width: 'fit-content',
    },
    content: {
      transition: 'all 0.3s ease',
      padding: theme.spacing(2),
      marginTop: 0,
    },
  }
}

export default useStyles