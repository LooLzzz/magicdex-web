
const useStyles = (theme) => {
  // const bottomBarHeight = '50px'
  // const mainSidesPadding = theme.spacing(10)

  return {
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
    collapsableContent: {
      paddingBottom: 0,
      paddingTop: 0,
    },
  }
}

export default useStyles