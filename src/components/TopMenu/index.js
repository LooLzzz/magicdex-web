import { AppBar, Tabs, Tab, withStyles, Grid, IconButton } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons"
import { connect } from "react-redux";
import { useHistory } from "react-router";

import { login, setCurrentTab } from "@/Logic/redux/reducerSlice";
import useStyles from "./styles";


const mapStateToProps = (state) => ({
  theme: state.actions.theme.currentTheme,
  username: state.actions.account.username,
  currentTab: state.actions.topMenu.currentTab,
})

const mapDispatchToProps = (dispatch) => ({
  'dispatch': {
    login: (payload) => dispatch(login(payload)),
    setCurrentTab: (payload) => dispatch(setCurrentTab(payload)),
  }
})

const TopMenu = (props) => {
  //VARS
  const history = useHistory();
  const {
    classes,
    // theme,
    currentTab,
    dispatch,
  } = props;

  //HANDLERS
  const handleTabChange = (event, value) => {
    // dispatch.setCurrentTab(value);
    history.push( '/' + value )
  }

  //RENDER
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Grid container justifyContent='space-between'>
          <Grid item>
            <Tabs value={currentTab} onChange={handleTabChange}>
              <Tab label='Home' value='home' />
              <Tab label='Collection' value='collection' />
            </Tabs>
          </Grid>
          <Grid item>
            <IconButton>
              <MenuIcon /> {/*TODO*/}
            </IconButton>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
};

// EXPORT WITH HOOKS AND DECORATORS
export default
  connect(mapStateToProps, mapDispatchToProps) (
    withStyles(useStyles) (
      TopMenu
    )
  );