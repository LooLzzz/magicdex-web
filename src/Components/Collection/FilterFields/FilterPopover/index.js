/* eslint-disable react-hooks/exhaustive-deps */

import { useState, forwardRef, useImperativeHandle, useRef } from 'react'
import { ClickAwayListener, IconButton, List, Paper, Popover } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/styles'
import FilterListIcon from '@material-ui/icons/FilterList'
// import { connect } from 'react-redux'

// import { setCurrentTab } from '@/Logic/redux'
import useStyles from './styles'


const MenuPopover = forwardRef((props, ref) => {
  /** VARS **/
  const [menuAnchor, setMenuAnchor] = useState(null)
  const menuOpen = Boolean(menuAnchor)
  const filterButtonRef = useRef()
  const classes = makeStyles(useStyles(useTheme()))()
  // const {
  //   icon,
  // } = props


  /** EFFECTS **/
  useImperativeHandle(ref, () => ({
    openMenu: () => { handleMenuOpen(filterButtonRef) },
    closeMenu: () => { handleMenuClose(null) },
  }))

  // useEffect(() => {
  //   //onMount
  //   console.log(props.ref)
  // }, [])

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
        ref={filterButtonRef}
        onClick={handleIconClick}
      >
        <FilterListIcon />
      </IconButton>

      <Popover
        className={classes.popover}
        open={menuOpen}
        anchorEl={menuAnchor}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Paper className={classes.paper}>
          <ClickAwayListener onClickAway={handleMenuClose}>
            <List dense disablePadding>
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
