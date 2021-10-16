
const useStyles = (theme) => {
  // const bottomBarHeight = '50px'
  // const mainSidesPadding = theme.spacing(10)

  return {
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
    checkbox: {
      borderLeft: `1px solid ${theme.palette.divider}`,
      paddingRight: '6px'
    },
  }
}

export default useStyles