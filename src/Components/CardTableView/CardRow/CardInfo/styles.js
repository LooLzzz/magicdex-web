
const useStyles = (theme) => {
  // const bottomBarHeight = '50px'
  // const mainSidesPadding = theme.spacing(10)

  return {
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.secondary,
      position: 'relative',
      marginTop: theme.spacing(1),
      padding: `${theme.spacing(4)}px ${theme.spacing(3)}px ${theme.spacing(4)}px ${theme.spacing(3)}px`,
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
    content: {
      padding: theme.spacing(1.5),
    },
  }
}

export default useStyles