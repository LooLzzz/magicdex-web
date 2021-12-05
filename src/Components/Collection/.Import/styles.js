const useStyles = (theme) => {
  const topBottomPadding = theme.spacing(8)

  return {
    root: {
      minHeight: `calc(100vh - 2*${topBottomPadding}px)`,
      marginBottom: theme.spacing(2),
      // width: '40vw',
      // flexDirection: "column",
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexGrow: 1,
    },
    hoverHighlight: {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    view1Container: {
      height: '350px',
    },
    view2Container: {
      padding: [2, 2, 0, 2]
        .map(v => `${theme.spacing(v)}px`)
        .join(' '),
    },
  }
}

export default useStyles