/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react'
import { Typography, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import useSize from '@react-hook/size'
// import { useHistory } from "react-router";

// import { MagicdexApi } from "@/Api"
import { setCurrentTab } from "@/Logic/redux";
import useStyles from "./styles";


const mapStateToProps = (state) => ({
  username: state.actions.activeUser.username,
  currentTab: state.actions.topMenu.currentTab,
})

const mapDispatchToProps = (dispatch) => ({
  'dispatch': {
    setCurrentTab: (payload) => dispatch(setCurrentTab(payload)),
  }
})

const Home = (props) => {
  //VARS
  // const history = useHistory();
  const [width, ] = useSize(document.body)
  const {
    classes,
    // username,
    dispatch,
  } = props;

  //EFFECTS
  useEffect(() => {
    //onMount
    dispatch.setCurrentTab({tab:'home'})
  }, [])

  // useEffect( () => {
  //   MagicdexApi
  //     .getAllCards()
  //     .then(res => console.log(res))
  // }, [username])

  //HANDLERS
  // const handleTabChange = (event, value) => {
  //   dispatch.setCurrentTab({tab:value});
  //   history.push( '/' + value )
  // }

  //RENDER
  return (
    <Paper component='span' className={classes.root}>
      <img src='/logo.png' width={width * 0.75} alt="home" />
      <Typography variant="h2">
        Welcome to Magicdex
      </Typography>
      <Typography variant="h2">
        <span className="ss ss-fw ss-afr" />
        <span className="ss ss-fw ss-war" />
      </Typography>
    </Paper>
  );
};

// EXPORT WITH HOOKS AND DECORATORS
export default
  connect(mapStateToProps, mapDispatchToProps)(
    withStyles(useStyles)(
      Home
    )
  );