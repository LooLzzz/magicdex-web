const useStyles = (theme) => {
  const topBottomPadding = theme.spacing(8)

  return {
    root: {
      minHeight: `calc(100vh - 2*${topBottomPadding}px)`,
      // width: '40vw',
      // flexDirection: "column",
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexGrow: 1,
    },
    paper: {
      height: '350px',
    },
  }
}

export default useStyles