/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { ClickAwayListener, IconButton, List, Paper, Popover } from '@material-ui/core'
import { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
// import { connect } from 'react-redux'

// import { setCurrentTab } from '@/Logic/redux'
import useStyles from './styles'


const MenuPopover = forwardRef( (props, ref) => {
  /** VARS **/
  const [Icon, setIcon] = useState( () => {} )
  const [menuAnchor, setMenuAnchor] = useState(null)
  const menuOpen = Boolean(menuAnchor)
  const iconButtonRef = useRef()
  const theme = useTheme()
  const classes = makeStyles(useStyles(theme))();
  const {
    // classes,
    // dispatch,
    icon,
  } = props


  /** EFFECTS **/
  useImperativeHandle(ref, () => ({
    openMenu:  () => { setMenuAnchor(iconButtonRef) },
    closeMenu: () => { setMenuAnchor(null) },
  }))

  // useEffect(() => {
  //   //onMount
  //   console.log(props.ref)
  // }, [])

  useEffect(() => {
    setIcon(icon)
  }, [icon])

  
  /** HANDLERS **/
  const handleIconClick = (e) => {
    setMenuAnchor(e.currentTarget)
    // e.stopPropagation()
  }
  
  const handleMenuClose = (e) => {
    setMenuAnchor(null)
  }
  

  /** RENDER **/
  return (
    <>
      <IconButton className={classes.icon} ref={iconButtonRef} onClick={handleIconClick}>
        {Icon}
      </IconButton>
      
      <Popover
        className={classes.popover}
        open = {menuOpen}
        anchorEl = {menuAnchor}
        onClose = {handleMenuClose}
        anchorOrigin = {{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin = {{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Paper className={classes.paper}>
          <ClickAwayListener onClickAway={handleMenuClose}>
            <List>
              {props.children}
            </List>
          </ClickAwayListener>
        </Paper>
      </Popover>
    </>
  )
})

/** EXPORT **/
export default MenuPopover
