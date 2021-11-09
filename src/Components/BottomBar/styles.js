
const useStyles = (theme) => {
  // const bottomBarHeight = '50px'
  const mainSidesPadding = theme.spacing(10)

  return {
    root: {},
    appBar: {
      height: '100%',
      width: '100%',
      paddingLeft: mainSidesPadding,
      paddingRight: mainSidesPadding,
      margin: 0,
      // position: "inherit",
      // textAlign: 'center',
      // verticalAlign: 'middle',
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