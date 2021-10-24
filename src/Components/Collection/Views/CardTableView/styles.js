
const useStyles = (theme) => {
  // const bottomBarHeight = '50px'
  // const mainSidesPadding = theme.spacing(10)

  return {
    root: {},
    'card-image': {
      zIndex: 1,
      position: 'sticky',
      top: theme.spacing(8),
      marginRight: theme.spacing(2),
    },
    tableContainer: {
      overflow: 'visible',
    },
  }
}

export default useStyles