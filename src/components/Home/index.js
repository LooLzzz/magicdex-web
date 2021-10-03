/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
// import { useHistory } from "react-router";

import { setCurrentTab } from "@/Logic/redux";
import useStyles from "./styles";


const mapStateToProps = (state) => ({
  theme: state.actions.theme.currentTheme,
  username: state.actions.account.username,
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
    // theme,
    dispatch,
  } = props;

  //EFFECTS
  useEffect( () => {
    //onMount
    dispatch.setCurrentTab('home')
  }, [])

  //HANDLERS
  // const handleTabChange = (event, value) => {
  //   dispatch.setCurrentTab(value);
  //   history.push( '/' + value )
  // }

  //RENDER
  return (
    <div className={classes.root}>
      <Typography variant="h2">
        Welcome Home
      </Typography>
    </div>
  );
};

// EXPORT WITH HOOKS AND DECORATORS
export default
  connect(mapStateToProps, mapDispatchToProps) (
    withStyles(useStyles) (
      Home
    )
  );