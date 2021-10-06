const useStyles = (theme) => {
  const topBottomPadding = theme.spacing(8)

  return {
    root: {
      minHeight: `calc(100vh - 2*${topBottomPadding}px)`,
      // width: '40vw',
      // flexDirection: "column",
      justifyContent: "center",
      alignItems: 'center',
      display: 'flex',
      flexGrow: 1,
    },
    // paper: {
    //   padding: theme.spacing(3),
    //   display: 'flex',
    //   justifyContent: "center",
    //   alignItems: 'center',
    //   // flexDirection: "column",
    //   // flexGrow: 0.1,
    // },
  }
}

export default useStyles;