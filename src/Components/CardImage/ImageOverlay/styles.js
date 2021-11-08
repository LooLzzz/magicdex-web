
const useStyles = (theme) => {
  // const bottomBarHeight = '50px'
  // const mainSidesPadding = theme.spacing(10)

  return {
    root: {
      position: 'relative',
      borderRadius: '4.75% / 3.5%',
    },
    loading: {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      top: 0,
      left: 0,

      background: 'url(cardback.png) 0 0 / cover',
      // background: 'linear-gradient(rgba(60,60,60,0.7),rgba(60,60,60,0.7)), url(cardback.png) 0 0 / cover',
      opacity: 0.65,
      backgroundSize: 'cover',
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