/* eslint-disable react-hooks/exhaustive-deps */

import { forwardRef, useImperativeHandle, useRef } from 'react'
import { ClickAwayListener, IconButton, List, Paper, Popover } from '@material-ui/core'
import { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
// import { connect } from 'react-redux'

// import { setCurrentTab } from '@/Logic/redux'
import useStyles from './styles'


const MenuPopover = forwardRef((props, ref) => {
  /** VARS **/
  const {
    icon,
    iconButtonProps,
    popoverProps,
    listProps,
  } = props
  const classes = makeStyles(useStyles(useTheme()))()

  const iconButtonRef = useRef()
  const [Icon, setIcon] = useState(icon)

  const [menuAnchor, setMenuAnchor] = useState(null)
  const menuOpen = Boolean(menuAnchor)


  /** EFFECTS **/
  useImperativeHandle(ref, () => ({
    openMenu: () => { handleMenuOpen(iconButtonRef) },
    closeMenu: () => { handleMenuClose(null) },
  }))

  useEffect(() => {
    setIcon(icon)
  }, [icon])


  /** HANDLERS **/
  const handleIconClick = (e) => {
    handleMenuOpen(e.currentTarget)
    e.stopPropagation()
  }

  const handleMenuOpen = (menuAnnchor) => {
    setMenuAnchor(menuAnnchor)
  }

  const handleMenuClose = (e) => {
    setMenuAnchor(null)
  }


  /** RENDER **/
  return (
    <>
      <IconButton
        color="inherit"
        className={classes.icon}
        ref={iconButtonRef}
        onClick={handleIconClick}
        {...iconButtonProps}
      >
        {Icon}
      </IconButton>

      <Popover keepMounted
        className={classes.popover}
        open={menuOpen}
        anchorEl={menuAnchor}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        {...popoverProps}
      >
        <Paper className={classes.paper}>
          <ClickAwayListener onClickAway={handleMenuClose}>
            <List {...listProps}>
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
