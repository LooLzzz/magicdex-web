/* eslint-disable no-lone-blocks */
import { Grid, IconButton, InputAdornment, ListSubheader, TextField } from '@material-ui/core'
import FilterListIcon from '@material-ui/icons/FilterList';
import { withStyles } from '@material-ui/styles'
import { createRef } from 'react'
import { connect } from 'react-redux'

import FilterPopover from './FilterPopover';
import useStyles from './styles'


const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = (dispatch) => ({
    dispatch: {

    }
})


const FilterCards = (props) => {
  /** VARS **/
  const {
    classes,
    // dispatch,
  } = props
  const filterRef = createRef()
  
  /** EFFECTS **/
  { }
  
  /** HANDLERS **/
  const handleMenuItemClick = (e) => {
    let goto = e.currentTarget.attributes.goto?.value
    let id = e.currentTarget.attributes.id?.value
    
    switch (id) {
      default:
        filterRef.current?.closeMenu()
        break
  
      case 'login':
      case 'register':
        filterRef.current?.closeMenu()
        // history.push(goto)
        break
      
      case 'logout':
        // menuRef.current?.closeMenu()
        // dispatch.setActiveUser({username:null})
        // enqueueSnackbar('Logged out', { variant: "info" })
        // localStorage.removeItem('accessToken')
        break
  
      case 'mode':
        // dispatch.toggleCurrentThemeType()
        break
    }
  }

    /** RENDER **/
    return (
      <div className={classes.root}>
        <TextField
          id="filled-search"
          label="Search Card"
          type="search"
          variant="filled"
          className={classes.search}
          onChange={props.searchHandler}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <FilterPopover>
                  <ListSubheader>
                    <Grid container spacing={2}>
                      <Grid item>Card Name:</Grid>
                      <Grid item>
                        <TextField />
                      </Grid>
                    </Grid>
                  </ListSubheader>
                  <ListSubheader>
                    <Grid container spacing={2}>
                      <Grid item>Text:</Grid>
                      <Grid item>
                        <TextField />
                      </Grid>
                    </Grid>
                  </ListSubheader>
                  <ListSubheader>
                    <Grid container spacing={2}>
                      <Grid item>Type Line:</Grid>
                      <Grid item>
                        <TextField />
                      </Grid>
                    </Grid>
                  </ListSubheader>
                  <ListSubheader>
                    <Grid container spacing={2}>
                      <Grid item>Colors:</Grid>
                      <Grid item>
                        <TextField />
                      </Grid>
                    </Grid>
                  </ListSubheader>
                  <ListSubheader>
                    <Grid container spacing={2}>
                      <Grid item>Mana Cost:</Grid>
                      <Grid item>
                        <TextField />
                      </Grid>
                    </Grid>
                  </ListSubheader>
                  {/* {username ? (
                    <MenuItem onClick={handleMenuItemClick} id="logout">
                      Logout
                    </MenuItem>
                  ) : (
                    <>
                      <MenuItem
                        onClick={handleMenuItemClick}
                        id="login"
                        goto="/login"
                      >
                        Login
                      </MenuItem>
                      <MenuItem
                        onClick={handleMenuItemClick}
                        id="register"
                        goto="/register"
                      >
                        Register
                      </MenuItem>
                    </>
                  )}

                  <Divider />

                  <ListSubheader>
                    <SettingsIcon />
                    Settings
                  </ListSubheader>
                  <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
                    <ListItemText
                      primary="Toggle Theme"
                      secondary={themeType}
                    />
                    <ListItemIcon style={{justifyContent:'center'}}>
                {
                  themeType === 'dark'
                    ? <DarkmodeIcon />
                    : <LightmodeIcon />
                }
                </ListItemIcon>
                    <ListItemSecondaryAction>
                      <Switch
                        // color='primary'
                        edge="end"
                        checked={themeType === "dark"}
                        onChange={handleMenuItemClick}
                        id="mode"
                      />
                    </ListItemSecondaryAction>
                  </ListItem> */}
                </FilterPopover>
              </InputAdornment>
            ),
          }}
        />
      </div>
    );
}

/** EXPORT **/
export default
    withStyles(useStyles) (
        connect(mapStateToProps, mapDispatchToProps) (
            FilterCards
        )
    )