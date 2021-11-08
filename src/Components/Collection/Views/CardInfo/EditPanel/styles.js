
const useStyles = (theme) => {
  // const bottomBarHeight = '50px'
  // const mainSidesPadding = theme.spacing(10)

  return {
    root: {
      // position: 'relative',
    },
    accordion: {
      // backgroundColor: theme.palette.background.secondary,
      backgroundColor: theme.palette.type === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
      marginBottom: theme.spacing(1),
    },
    'accordion-expanded': {
      paddingBottom: theme.spacing(1),
    },
    listing: {
      margin: 0,
      '& > li': {
        margin: '8px 1.25em 8px 0',
      },
      '& > li:first-child': {
        paddingTop: 0,
      },
      '& > li:last-child': {
        paddingBottom: 0,
      },
    },
    editButtonContainer: {
      // position: 'absolute',
      // top: 0,
      // right: 0,
    },
  }
}

export default useStyles