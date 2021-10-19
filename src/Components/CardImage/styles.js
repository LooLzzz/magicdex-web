
const useStyles = (theme) => {
  // const bottomBarHeight = '50px'
  // const mainSidesPadding = theme.spacing(10)

  return {
    imageContainer: {
      position: 'relative',
    },
    dfcSymbol: {
      position: 'absolute',
      top: theme.spacing(1),
      left: theme.spacing(0.9),
    },
    button: {
      marginTop: theme.spacing(1),
    },
  }
}

export default useStyles