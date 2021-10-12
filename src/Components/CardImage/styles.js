
const useStyles = (theme) => {
  // const bottomBarHeight = '50px'
  // const mainSidesPadding = theme.spacing(10)

  return {
    image: {

    },
    foil: {
      position: 'relative',
      overflow: 'hidden',
      '&:before': {
        position: 'absolute',
        top: '-50%',
        left: '-150%',
        right: '-50%',
        height: '145px',
        borderRadius: '4.75% / 3.5%',
        backgroundImage: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
        transform: 'rotate(-45deg)',
        content: "''",
        overflow: 'hidden',
        opacity: 0.5,
      },
      '&:after': {
        position: 'absolute',
        top: '0px',
        bottom: '0px',
        left: '0px',
        right: '0px',
        display: 'block',
        borderRadius: '4.75% / 3.5%',
        background: 'linear-gradient(-45deg, #e9ee52, #e73c7e, #23a6d5, #23d5ab)',
        opacity: 0.15,
        overflow: 'hidden',
        content: "''",
        // pointerEvents: 'none',
      },
    },
  }
}

export default useStyles