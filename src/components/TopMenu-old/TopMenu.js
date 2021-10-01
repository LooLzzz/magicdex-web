// import { useEffect } from 'react'
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Grid, withStyles, withTheme } from "@material-ui/core";

import TopCenterMenu from "./TopCenterMenu/TopCenterMenu";
import TopLeftMenu from "./TopLeftMenu/TopLeftMenu";
import TopRightMenu from "./TopRightMenu/TopRightMenu";
import { login } from "@/Logic/redux/reducerSlice";
import useStyles from "./styles.js";


const mapStateToProps = (state) => {
  return {
    username: state.actions.account.username,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (payload) => dispatch(login(payload)),
  };
}

const TopMenu = (props) => {
  // VARS
  const {
    classes,
    // theme,
    // username,
    login,
  } = props;
  const history = useHistory();
  const accessToken = localStorage.getItem('access-token');


  // LOGIC
  if (accessToken === null)
    history.push("login");
  else
    login({ username: localStorage.getItem("username"), accessToken });


  // RENDER
  return (
    <>
      <div className={classes.TopMenuComponent}>
        <Grid container justifyContent="flex-start" direction="row">
          <Grid item xs={4}>
            <TopLeftMenu />
          </Grid>
          <Grid item xs={4} justifyContent="center">
            <TopCenterMenu />
          </Grid>
          <Grid item xs={4} justifyContent="flex-end">
            <TopRightMenu />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

// EXPORT WITH HOOKS AND DECORATORS
export default
  connect(mapStateToProps, mapDispatchToProps) (
    withStyles(useStyles) (
      withTheme(
        TopMenu
      )
    )
  );
