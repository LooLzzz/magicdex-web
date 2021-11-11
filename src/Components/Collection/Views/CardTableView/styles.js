
const useStyles = (theme) => {
  // const bottomBarHeight = '50px'
  // const mainSidesPadding = theme.spacing(10)

  return {
    root: {
      paddingBottom: theme.spacing(1),
    },
    'card-image': {
      zIndex: 1,
      position: 'sticky',
      top: theme.spacing(8),
      marginRight: theme.spacing(2),
    },
    tableContainer: {
      maxWidth: '90vw',
      // overflow: 'visible',
    },
    tableFooter: {
      borderTop: `1px solid ${theme.palette.divider}`,
    }
  }
}

export default useStyles