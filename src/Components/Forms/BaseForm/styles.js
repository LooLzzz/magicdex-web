const useStyles = (theme) => {
  const iconSize = "4.5em"

  return {
    root: {
      padding: theme.spacing(3),
      paddingBottom: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",

      // minHeight: '80vh',
    },
    header: {
      // alignSelf: "flex-end",
      textTransform: "uppercase",
      fontWeight: "bold",
      width: '100%',
    },
    icon: {
      fontSize: iconSize,
      alignSelf: "flex-start",
      position: "relative",
      // color: theme.palette.primary.light,
      zIndex: 1,
    },
    divider1: {
      bottom: `calc(${iconSize} - 0.55em)`,
      marginBottom: theme.spacing(3),
      width: `calc(100% + 2*${theme.spacing(3)}px)`,
      position: "relative",
      zIndex: 0,
    },
    divider2: {
      marginBottom: theme.spacing(3),
      width: `calc(100% + 2*${theme.spacing(3)}px)`,
      position: "relative",
      zIndex: 0,
    },
    bottom: {
      position: "relative",
      bottom: "2em",
      width: '100%',
      // display: "flex",
      // justifyContent: "center",
      // alignItems: "center",
      // flexDirection: "column",
    },
    content: {
      width: '100%',
      paddingBottom: theme.spacing(2),
    },
    actions: {
      width: '100%',
      alignSelf: "flex-end",
    },
  }
}

export default useStyles
