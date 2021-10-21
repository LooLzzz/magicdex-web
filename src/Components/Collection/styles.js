
const useStyles = (theme) => {
  // const bottomBarHeight = '50px'
  // const mainSidesPadding = theme.spacing(10)

  return {
    '@global': {
      '.MuiTableCell-head': {
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
      '.MuiTableCell-sizeSmall': {
        padding: '0.3em',
      },
    },
    root: {
      marginBottom: theme.spacing(3),
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    filtersContainer: {
      marginBottom: theme.spacing(4.5),
    },
    subheader: {
      justifyContent: 'center',
      fontWeight: 600,
      height: '2.5rem',
      alignItems: 'baseline',
    },
  }
}

export default useStyles