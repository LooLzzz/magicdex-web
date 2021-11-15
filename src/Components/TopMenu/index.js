import { createRef } from "react"
import { AppBar, Tabs, Tab, Grid, MenuItem, Divider, ListSubheader, ListItem, ListItemText, ListItemSecondaryAction, Switch } from "@material-ui/core"
import { withStyles } from "@material-ui/styles"
import {
  Menu as MenuIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
} from '@material-ui/icons'
import { connect } from "react-redux"
import { useHistory } from 'react-router-dom'
import { useSnackbar } from "notistack"

import { MenuPopover } from '@/Components'
import { setActiveUser, toggleThemeType } from "@/Logic/redux"
import useStyles from "./styles"


/** REDUX **/
const mapStateToProps = (state) => ({
  themeType: state.actions.theme.themeType,
  username: state.actions.activeUser.username,
  currentTab: state.actions.app.topMenu.currentTab,
})

const mapDispatchToProps = (dispatch) => ({
  'dispatch': {
    toggleThemeType: (payload) => dispatch(toggleThemeType(payload)),
    setActiveUser: (payload) => dispatch(setActiveUser(payload)),
  }
})


const TopMenu = ({
  /** VARS **/
  ...props
}) => {
  const {
    classes,
    dispatch,
    currentTab,
    themeType,
    username,
  } = props
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const menuRef = createRef()


  /** HANDLERS **/
  const handleTabChange = (event, value) => {
    // dispatch.setCurrentTab({tab:value});
    history.push('/' + value)
  }

  const handleMenuItemClick = (e) => {
    let goto = e.currentTarget.attributes.goto?.value
    let id = e.currentTarget.attributes.id?.value

    switch (id) {
      default:
        menuRef.current?.closeMenu()
        break

      case 'profile':
      case 'login':
      case 'register':
        menuRef.current?.closeMenu()
        history.push(goto)
        break

      case 'logout':
        // menuRef.current?.closeMenu()
        dispatch.setActiveUser({ username: null })
        enqueueSnackbar('Logged out', { variant: "info" })
        break

      case 'mode':
        dispatch.toggleThemeType()
        break
    }
  }


  /** RENDER **/
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Grid container wrap='nowrap' justifyContent='space-between'>
          <Grid item>
            <Tabs variant='scrollable' value={currentTab} onChange={handleTabChange}>
              <Tab value='home' label='Home' />
              <Tab value='collection' label='Collection' />
              <Tab value='decks' label='Decks' />

              <Tab value='profile' style={{ display: 'none' }} />
              <Tab value='login' style={{ display: 'none' }} />
              <Tab value='register' style={{ display: 'none' }} />
            </Tabs>
          </Grid>

          <Grid item>
            <MenuPopover ref={menuRef} icon={() => <MenuIcon />}>
              <ListSubheader>
                <AccountCircleIcon />
                {username ?? 'Account'}
              </ListSubheader>
              {
                username
                  ?
                  <>
                    <MenuItem onClick={handleMenuItemClick} id='profile' goto='/profile'>Personal Info</MenuItem>
                    <MenuItem onClick={handleMenuItemClick} id='logout'>Logout</MenuItem>
                  </>
                  :
                  <>
                    <MenuItem onClick={handleMenuItemClick} id='login' goto='/login'>Login</MenuItem>
                    <MenuItem onClick={handleMenuItemClick} id='register' goto='/register'>Register</MenuItem>
                  </>
              }

              <Divider />

              <ListSubheader>
                <SettingsIcon />
                Settings
              </ListSubheader>

              <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
                <ListItemText primary='Toggle Theme' secondary={themeType} />
                <ListItemSecondaryAction>
                  <Switch
                    // color='primary'
                    edge='end'
                    checked={themeType === 'dark'}
                    onChange={handleMenuItemClick}
                    id='mode'
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </MenuPopover>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  )
}

/** EXPORT WITH HOOKS AND DECORATORS **/
export default
  connect(mapStateToProps, mapDispatchToProps)(
    withStyles(useStyles)(
      TopMenu
    )
  )