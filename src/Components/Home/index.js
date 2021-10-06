/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react'
import { Typography, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
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
  const {
    classes,
    // username,
    dispatch,
  } = props;

  //EFFECTS
  useEffect( () => {
    //onMount
    dispatch.setCurrentTab('home')
  }, [])
  
  // useEffect( () => {
  //   MagicdexApi
  //     .getAllCards()
  //     .then(res => console.log(res))
  // }, [username])

  //HANDLERS
  // const handleTabChange = (event, value) => {
  //   dispatch.setCurrentTab(value);
  //   history.push( '/' + value )
  // }

  //RENDER
  return (
    <Paper className={classes.root}>
      <img src='/logo.png' width={window.screen.width*0.5} alt="home" />
      <Typography variant="h2">
        Welcome to Magicdex
        
      {/* <i className="ss ss-afr" /> */}

      </Typography>
    </Paper>
  );
};

// EXPORT WITH HOOKS AND DECORATORS
export default
  connect(mapStateToProps, mapDispatchToProps) (
    withStyles(useStyles) (
      Home
    )
  );