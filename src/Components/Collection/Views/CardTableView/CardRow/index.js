/* eslint-disable react-hooks/exhaustive-deps */

import { Fragment, useState, useEffect, useRef } from 'react'
import { Hidden, TableRow, TableCell, Collapse, IconButton, Checkbox, Paper } from '@material-ui/core'
import { withStyles, useTheme } from '@material-ui/styles'
import { connect } from 'react-redux'
import upperFirst from 'lodash/upperFirst'
import clsx from 'clsx'
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon
} from '@material-ui/icons'

import renderCell from '@/CardRenders'
import CardInfo from '../../CardInfo'
import useStyles from './styles'


const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  // dispatch: {}
})

const CardRow = (props) => {
  /** VARS **/
  const {
    classes,
    columns,
    key,
    card,
    onMouseEnter,
    selectable,
    onSelected,
    selectedCardIds,
    closeAllRows,
    closeSignal,
    // dispatch,
  } = props
  const theme = useTheme()
  const setRef = useRef()
  // const scrollPosition = useScrollPosition()
  const [isOpen, setIsOpen] = useState(false)
  const [showContent, setShowContent] = useState(false)

  const [isMouseOver, setIsMouseOver] = useState(false)


  /** EFFECTS **/
  useEffect(() => {
    if (closeSignal !== card._id)
      setIsOpen(false)
  }, [closeSignal])


  /** HANDLERS **/
  const handleSelectChange = (e) => {
    onSelected(card._id, e.target.checked)
  }

  const handleIsOpenToggle = () => {
    if (!isOpen)
      closeAllRows(card._id)

    setIsOpen(!isOpen)
  }

  const onCollapseExited = (isAppearing) => {
    setShowContent(false)
  }

  const onCollapseEnter = (isAppearing) => {
    setShowContent(true)
  }


  /** RENDER **/
  return (
    <Fragment key={key}>
      <TableRow
        className={clsx(classes.root, 'cursor-pointer')}
        onClick={handleIsOpenToggle}
        onMouseEnter={onMouseEnter}
      // onContextMenu={e => {console.log(card.name);e.preventDefault()}} //TODO: add context menu
      >
        {
          Object
            .entries(columns)
            .map(
              ([columnName, columnDisplayName], i) => (
                <TableCell
                  key={i}
                  className={classes.content}
                  align='center'
                  {
                  ...( /* renderSet() setup */
                    columnName === 'set'
                      ? {
                        ref: setRef,
                        onMouseEnter: e => setIsMouseOver(true),
                        onMouseLeave: e => setIsMouseOver(false),
                      }
                      : {}
                  ) /* renderSet() setup */
                  }
                >
                  {renderCell({ card, columnName, theme })}
                  {
                    columnName === 'set' && isMouseOver && (
                      <Paper elevation={5} className={classes.floating}>
                        {[card.set_name, upperFirst(card.rarity), '#' + card.collector_number].join(' - ')}
                      </Paper>
                    )
                  }
                </TableCell>
              )
            )
        }

        {/* DROPDOWN ARROW */}
        <Hidden smDown>
          <TableCell>
            <IconButton size='small' onClick={handleIsOpenToggle}>
              {
                isOpen
                  ? <KeyboardArrowUpIcon />
                  : <KeyboardArrowDownIcon />
              }
            </IconButton>
          </TableCell>
        </Hidden>

        {/* CHECKBOX */}
        {
          selectable &&
          <>
            <TableCell onClick={e => e.stopPropagation()} className={classes.checkbox}>
              <Checkbox
                size='small'
                checked={selectedCardIds.includes(card._id)}
                onChange={handleSelectChange}
              />
            </TableCell>
          </>
        }
      </TableRow>

      <TableRow onMouseEnter={onMouseEnter} className={classes.row} style={{ display: showContent ? 'table-row' : 'none' }}>
        <TableCell colSpan={10} style={{ padding: 0 }}>
          <Collapse unmountOnExit in={isOpen} timeout="auto" onEnter={onCollapseEnter} onExited={onCollapseExited}>
            <CardInfo
              card={card}
              topArrowProps={{
                style: {
                  borderTopColor: theme.palette.background.paper,
                },
              }}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      CardRow
    )
  )