
const useStyles = (theme) => {
  // const bottomBarHeight = '50px'
  // const mainSidesPadding = theme.spacing(10)

  return {
    root: {
      position: 'relative',
      borderRadius: '4.75% / 3.5%',
    },
    base: {
      borderRadius: '4.75% / 3.5%',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    overlay: {
      borderRadius: '4.75% / 3.5%',
      position: 'absolute',
      top: 0,
      left: 0,
    },
  }
}

export default useStyles