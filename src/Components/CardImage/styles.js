
const useStyles = (theme) => {
  // const bottomBarHeight = '50px'
  // const mainSidesPadding = theme.spacing(10)
  // console.log({ palette: theme.palette })

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
    checkboxContainer: {
      position: 'absolute',
      top: '4%',
      right: '5%',
      // borderRadius: '20%',
      // border: `1px solid ${theme.palette.action.hover}`,
      // backgroundColor: theme.palette.action.active,
      // margin: 0,
      // padding: 0,
      // '&:hover': {
      //   backgroundColor: theme.palette.action.hover,
      // },
    },
    checkbox: {
      // padding: 1.5,
      // margin: 2,
      // backgroundColor: theme.palette.action.active,
      // borderRadius: '15%',
      transform: 'scale(1.5)'
    },
    priceContainer: {
      marginTop: theme.spacing(1),
    },
    buttonContainer: {
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