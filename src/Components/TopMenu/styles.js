
const useStyles = (theme) => {
  // const bottomBarHeight = '50px'
  const mainSidesPadding = theme.spacing(10)

  return {
    root: {
      position: 'absolute',
    },
    appBar: {
      // position: "inherit",
      paddingLeft: mainSidesPadding,
      paddingRight: mainSidesPadding,
      // backgroundColor: theme.palette.type === 'dark' ? 'rgba(0,0,0,0.25)' : theme.palette.primary,
      // backgroundColor: theme.palette.type === 'dark' ? theme.palette.primary : theme.palette.primary,
      // color: theme.palette.text.primary,
      // transition: theme.transitions.create(['margin', 'width'], {
      //   easing: theme.transitions.easing.sharp,
      //   duration: theme.transitions.duration.leavingScreen,
      // }),
    },
  }
}

export default useStyles