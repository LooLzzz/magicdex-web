
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
      padding: 0,
      // paddingBottom: 0,
      // paddingTop: 0,
      // paddingLeft: 0,
      // paddingRight: 0,
      // marginBottom: theme.spacing(1),
    },
  }
}

export default useStyles