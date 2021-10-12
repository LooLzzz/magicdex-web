
const useStyles = (theme) => {
  // const bottomBarHeight = '50px'
  // const mainSidesPadding = theme.spacing(10)

  return {
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
    },
    content: {
      padding: `${theme.spacing(3)}px ${theme.spacing(5)}px ${theme.spacing(3)}px ${theme.spacing(5)}px`,
    },
  }
}

export default useStyles