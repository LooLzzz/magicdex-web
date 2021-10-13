
const useStyles = (theme) => {
  // const bottomBarHeight = '50px'
  // const mainSidesPadding = theme.spacing(10)

  return {
    root: {},
    'card-image': {
      position: 'sticky',
      top: theme.spacing(8),
      marginRight: theme.spacing(2),
    },
    'tableHead': {
      // backgroundColor: theme.palette.type === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
      // backgroundColor: theme.palette.primary.light,
      // borderBottom: `1px solid ${theme.palette.divider}`,
    },
  }
}

export default useStyles