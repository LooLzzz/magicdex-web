/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useRef } from 'react'
import { TableRow, TableCell, Collapse, IconButton, Checkbox, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import useScrollPosition from '@react-hook/window-scroll'
import _ from 'lodash'
import clsx from 'clsx'
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon
} from '@material-ui/icons'

import renderCell from '@/CardRenders'
import CardInfo from './CardInfo'
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
    card,
    onMouseEnter,
    selectable,
    // dispatch,
  } = props
  const setRef = useRef()
  const scrollPosition = useScrollPosition()
  const [isOpen, setIsOpen] = useState(false)

  const [isMouseOver, setIsMouseOver] = useState(false)


  /** UTILS **/
  const floatingCss = (ref, scrollPosition) => {
    const { x, y, width, height } = ref.current?.getBoundingClientRect() ?? { x: 0, y: 0, width: 0, height: 0 }
    return {
      zIndex: 1,
      position: 'absolute',
      left: x + width,
      top: y + (height / 8) + scrollPosition,
      // display: isMouseOver ? 'block' : 'none',
    }
  }


  /** EFFECTS **/
  { }


  /** RENDER **/
  return (
    <>
      <TableRow
        className={clsx(classes.root, 'cursor-pointer')}
        onClick={e => setIsOpen(!isOpen)}
        onMouseEnter={onMouseEnter}
      // onContextMenu={e => {console.log(card.name);e.preventDefault()}} //TODO: add context menu
      >
        {
          Object
            .entries(columns)
            .map(
              ([columnName, columnDisplayName]) => (
                <TableCell
                  key={columnName}
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
                  {renderCell(card, columnName)}
                  {
                    columnName === 'set' && isMouseOver && (
                      <Paper className='floating' style={floatingCss(setRef, scrollPosition)}>
                        {[card.set_name, _.upperFirst(card.rarity), '#' + card.collector_number].join(' - ')}
                      </Paper>
                    )
                  }
                </TableCell>
              )
            )
        }

        {/* DROPDOWN ARROW */}
        <TableCell>
          <IconButton size='small' onClick={e => setIsOpen(!isOpen)}>
            {
              isOpen
                ? <KeyboardArrowUpIcon />
                : <KeyboardArrowDownIcon />
            }
          </IconButton>
        </TableCell>

        {/* CHECKBOX */}
        {
          selectable &&
          <>
            <TableCell onClick={e => e.stopPropagation()} style={{ borderLeft: '1px solid #515151', paddingRight: '6px' }}>
              <Checkbox
              // TODO: checkbox needs to report back to parent it has been selected
              />
            </TableCell>
          </>
        }
      </TableRow>


      <TableRow onMouseEnter={onMouseEnter}>
        <TableCell colSpan={999} className={classes.collapsableContent} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Collapse unmountOnExit in={isOpen} timeout="auto">
            <CardInfo
              card={card}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      CardRow
    )
  )