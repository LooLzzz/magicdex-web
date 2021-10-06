
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
      marginBottom: theme.spacing(2),
      // maxWidth: theme.spacing(200),
      // display: 'flex',
      // justifyContent: 'center',
    },
    filtersContainer: {
      // width: '100%',
      marginBottom: theme.spacing(2),
    },
    search: {

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
    'image-container': {
      marginRight: theme.spacing(2),
    },
    'card-image': {
      position: 'sticky',
      top: theme.spacing(10),
    },
    floating: {
      position: 'fixed',
      zIndex: '999',
      padding: `${theme.spacing(1)}px ${theme.spacing(1.5)}px ${theme.spacing(1)}px ${theme.spacing(1.5)}px`,
      backgroundColor: theme.palette.background.secondary,
      color: theme.palette.getContrastText(theme.palette.background.secondary),
    },
  }
}

export default useStyles