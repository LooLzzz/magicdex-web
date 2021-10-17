
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
      '&:before': {
        content: '""',
        right: theme.spacing(12),
        top: '-1rem',
        width: '2rem',
        height: '2rem',
        // display: 'inline-block',
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        // backgroundColor: theme.palette.background.secondary,
        transform: 'rotate(45deg)',
        transition: 'left 0.3s ease',
      },
    },
    image: {
      marginRight: -theme.spacing(1),
      // width: 'fit-content',
    },
    content: {
      padding: theme.spacing(2),
      flexGrow: 1,
    },
  }
}

export default useStyles