
const useStyles = (theme) => {
  // const bottomBarHeight = '50px'
  // const mainSidesPadding = theme.spacing(10)

  return {
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  }
}

export default useStyles