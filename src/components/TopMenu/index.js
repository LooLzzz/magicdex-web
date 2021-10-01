import { AppBar, Tabs, Tab, withStyles, withTheme, Grid, IconButton } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons"
import { connect } from "react-redux";
import { useHistory } from "react-router";

import { login, setCurrentTab } from "@/Logic/redux/reducerSlice";
import useStyles from "./styles";


const mapStateToProps = (state) => ({
  username: state.actions.account.username,
  currentTab: state.actions.topMenu.currentTab,
})

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(login(payload)),
  setCurrentTab: (payload) => dispatch(setCurrentTab(payload)),
})

const TopMenu = (props) => {
  //VARS
  const history = useHistory();
  const {
    classes,
    // theme,
    currentTab,
    setCurrentTab,
  } = props;

  //HANDLERS
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    switch (newValue) {
      default:
        history.push("/");
        break;
      case 1:
        history.push("/collection");
        break;
    }
  }

  //RENDER
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Grid container justifyContent='space-between'>
          <Grid item>
            <Tabs value={currentTab} onChange={handleTabChange}>
              <Tab label="Home" value={0} />
              <Tab label="Collection" value={1} />
            </Tabs>
          </Grid>
          <Grid item>
            <IconButton>
              <MenuIcon />
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
      withTheme(
        TopMenu
      )
    )
  );