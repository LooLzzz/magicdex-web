
const useStyles = (theme) => {
  return {
    root: {
      minHeight: '350px',
      maxWidth: '1000px',
      marginBottom: theme.spacing(3),
    },
    hoverHighlight: {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }
}

export default useStyles