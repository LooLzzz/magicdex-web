import { useRef } from "react";
import { AppBar, Tabs, Tab, Grid, MenuItem, Divider, ListSubheader } from "@material-ui/core";
import { withStyles } from "@material-ui/styles"
import { Menu as MenuIcon, AccountBox as AccountBoxIcon, Settings as SettingsIcon } from "@material-ui/icons"
import { connect } from "react-redux";
import { useHistory } from "react-router";

import MenuPopover from './MenuPopover'
// import { setCurrentTab } from "@/Logic/redux/reducerSlice";
import useStyles from "./styles";


const mapStateToProps = (state) => ({
  theme: state.actions.theme.currentTheme,
  username: state.actions.account.username,
  currentTab: state.actions.topMenu.currentTab,
})

const mapDispatchToProps = (dispatch) => ({
  'dispatch': {
    // setCurrentTab: (payload) => dispatch(setCurrentTab(payload)),
  }
})

const TopMenu = (props) => {
  //VARS
  const history = useHistory();
  const {
    classes,
    // theme,
    // dispatch,
    currentTab,
  } = props;
  const menuRef = useRef()


  //EFFECTS
  // useEffect(() => {
  //   //DEBUG
  //   console.log(menuRef)
  // }, [menuRef])


  //HANDLERS
  const handleTabChange = (event, value) => {
    // dispatch.setCurrentTab(value);
    history.push( '/' + value )
  }
  
  const handleMenuItemClick = (e) => {
    let value = e.currentTarget.attributes.goto?.value
    if (value)
      history.push(value)
    
    menuRef.current?.closeMenu()
  }


  //RENDER
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Grid container justifyContent='space-between'>
          <Grid item>
            <Tabs value={currentTab} onChange={handleTabChange}>
              <Tab label='Home'       value='home' />
              <Tab label='Collection' value='collection' />
            </Tabs>
          </Grid>
          <Grid item>
            <MenuPopover ref={menuRef} icon={() => <MenuIcon />}>
              <ListSubheader>
                  <AccountBoxIcon />
                  Account
              </ListSubheader>
              <MenuItem onClick={handleMenuItemClick} goto='/login'>
                Login
              </MenuItem>
              <MenuItem onClick={handleMenuItemClick} goto='/register'>
                Register
              </MenuItem>
              
              <Divider />
              
              <ListSubheader>
                <SettingsIcon />
                Settings
              </ListSubheader>
              <MenuItem onClick={handleMenuItemClick}>
                Darkmode Thingy Here
              </MenuItem>
            </MenuPopover>
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