
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
      // maxWidth: theme.spacing(200),
      // display: 'flex',
      // justifyContent: 'center',
    },
    search: {
      margin: "0 auto",
      marginBottom: theme.spacing(2),
    },
    paper: {
      // display: 'flex',
      // justifyContent: 'center',
      // flexShrink: 1,
      marginBottom: theme.spacing(2),
    },
    iconCell: {
      width: 0,
    },
  }
}

export default useStyles