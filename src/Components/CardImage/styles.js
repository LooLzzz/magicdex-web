
const useStyles = (theme) => {
  // const bottomBarHeight = '50px'
  // const mainSidesPadding = theme.spacing(10)

  return {
    imageContainer: {
      zIndex: 1,
      position: 'relative',
      transition: 'all 0.4s cubic-bezier(0.75, 0, 0.25, 1)',
    },
    dfcSymbol: {
      fontSize: '1.5em',
      position: 'absolute',
      top: '2.5%',
      left: '2.5%',
    },
    button: {
      marginTop: theme.spacing(1),
    },
    buttonThridly: {
      color: '#fff',
      backgroundColor: '#9c27b0',
      '&:hover': {
        backgroundColor: '#7b1fa2',
      },
    },
  }
}

export default useStyles