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

import { addSelectedCardIds, removeSelectedCardIds, setCurrentOpenCardId } from '@/Logic/redux'
import RenderCell from '@/CardRenders'
import { CardInfo, ContextMenu } from '@/Components/Collection/Views'
import useStyles from './styles'


/** REDUX **/
const mapStateToProps = (state) => ({
  selectedCardIds: state.actions.app.collection.selectedCardIds,
  cardsSelectableEnabled: state.actions.app.collection.cardsSelectableEnabled,
  currentOpenCardId: state.actions.app.collection.currentOpenCardId,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    addSelectedCardIds: (payload) => dispatch(addSelectedCardIds(payload)),
    removeSelectedCardIds: (payload) => dispatch(removeSelectedCardIds(payload)),
    setCurrentOpenCardId: (payload) => dispatch(setCurrentOpenCardId(payload)),
  }
})


const CardRow = ({
  /** VARS **/
  columns,
  key,
  card,
  onMouseEnter,
  contextMenuInitialState = {},
  ...props
}) => {
  const {
    classes,
    dispatch,
    cardsSelectableEnabled: selectable,
    selectedCardIds,
    currentOpenCardId,
  } = props
  const theme = useTheme()
  const setRef = useRef()
  const cardInfoRef = useRef()
  const checkboxRef = useRef()
  const [isOpen, setIsOpen] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [contextMenuState, setContextMenuState] = useState(contextMenuInitialState)

  const [isMouseOver, setIsMouseOver] = useState(false)


  /** EFFECTS **/
  useEffect(() => {
    setIsOpen(currentOpenCardId === card._id)
  }, [currentOpenCardId])


  /** HANDLERS **/
  const handleSelectChange = (e) => {
    e.target.checked
      ? dispatch.addSelectedCardIds({ id: card._id })
      : dispatch.removeSelectedCardIds({ id: card._id })
  }

  const handleCheckboxCellClick = (e) => {
    e.stopPropagation()

    !checkboxRef.current.checked
      ? dispatch.addSelectedCardIds({ id: card._id })
      : dispatch.removeSelectedCardIds({ id: card._id })
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
    setContextMenuState({
      mouseX: e.clientX,
      mouseY: e.clientY,
    })
  }

  const handleIsOpenToggle = () => {
    if (!isOpen)
      dispatch.setCurrentOpenCardId({ id: card._id })
    else
      dispatch.setCurrentOpenCardId({ id: null })
  }

  const collapseUpdate = (showContent) => (isAppearing) => {
    if (showContent != null)
      setShowContent(showContent)
    cardInfoRef.current?.updateHeight()
  }


  /** RENDER **/
  return (
    <Fragment key={key}>
      <ContextMenu
        setState={setContextMenuState}
        card={card}
        {...contextMenuState}
      />

      <TableRow
        className={clsx(classes.root, 'cursor-pointer')}
        onClick={handleIsOpenToggle}
        onMouseEnter={onMouseEnter}
        onContextMenu={handleContextMenu}
        style={{
          backgroundColor: (
            selectedCardIds.includes(card._id)
              ? theme.palette.action.selected
              : 'unset'
          ),
        }}
      // onContextMenu={e => {console.log(card.name);e.preventDefault()}} //TODO: add context menu
      >
        {
          Object
            .entries(columns)
            .map(
              ([columnName, columnDisplayName], i) => (
                <TableCell
                  key={i}
                  align='center'
                  className={classes.content}
                  {...( /* renderSet() setup */
                    columnName === 'set'
                      ? {
                        ref: setRef,
                        onMouseEnter: e => setIsMouseOver(true),
                        onMouseLeave: e => setIsMouseOver(false),
                      }
                      : {}
                  )} /* renderSet() setup */
                >
                  <RenderCell
                    card={card}
                    columnName={columnName}
                  />
                  {
                    columnName === 'set' && isMouseOver && (
                      <Paper elevation={5} className={classes.floating} onMouseEnter={e => setIsMouseOver(false)}>
                        {[card.set_name, upperFirst(card.rarity), '#' + card.collector_number].join(' - ')}
                      </Paper>
                    )
                  }
                </TableCell>
              )
            )
        }

        {/* CHECKBOX / DROPDOWN-ARROW */}
        {
          selectable
            ?
            <TableCell onClick={handleCheckboxCellClick} className={classes.checkboxCell}>
              <Checkbox
                size='small'
                checked={selectedCardIds.includes(card._id)}
                onChange={handleSelectChange}
                className={classes.checkbox}
                inputProps={{
                  ref: checkboxRef,
                }}
              />
            </TableCell>
            :
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
        }
      </TableRow>

      <TableRow onMouseEnter={onMouseEnter} className={classes.row} style={{ display: showContent ? 'table-row' : 'none' }}>
        <TableCell colSpan={10} style={{ padding: 0 }}>
          <Collapse mountOnEnter unmountOnExit
            timeout='auto'
            in={isOpen}
            onEnter={collapseUpdate(true)}
            onExited={collapseUpdate(false)}
            onEntering={collapseUpdate()}
          >
            <CardInfo
              card={card}
              refs={cardInfoRef}
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