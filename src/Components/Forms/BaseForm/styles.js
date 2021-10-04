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
      alignSelf: "flex-end",
      textTransform: "uppercase",
    },
    icon: {
      fontSize: iconSize,
      alignSelf: "flex-start",
      position: "relative",
      // color: theme.palette.primary.light,
      zIndex: 1,
    },
    divider: {
      bottom: `calc(${iconSize} - 0.55em)`,
      marginBottom: theme.spacing(3),
      width: `calc(100% + 2*${theme.spacing(3)}px)`,
      position: "relative",
      zIndex: 0,
    },
    bottom: {
      position: "relative",
      bottom: "2em",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    content: {
      paddingBottom: theme.spacing(2),
    },
    actions: {
      alignSelf: "flex-end",
    },
  }
}

export default useStyles
