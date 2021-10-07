/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState, useRef } from 'react'
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

import { renderCell } from './../renders'
import CardInfo from './../CardInfo'
import useStyles from './styles'


const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {

  }
})

const CardRow = (props) => {
  /** VARS **/
  const {
    classes,
    columns,
    data,
    onMouseEnter,
    dispatch,
  } = props
  const setRef = useRef()
  const scrollPosition = useScrollPosition()
  const [dataWithPrice, setDataWithPrice] = useState(data)
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
  useEffect(() => {
    const { prices, foil, amount } = data
    const price = Number(foil ? prices?.usd_foil : prices?.usd)

    setDataWithPrice({
      ...data,
      price: price,
      total_price: price * amount,
    })
  }, [data])


  /** RENDER **/
  return (
    <>
      <TableRow
        className={clsx(classes.root, 'cursor-pointer')}
        onClick={e => setIsOpen(!isOpen)}
        onMouseEnter={onMouseEnter}
      >
        <TableCell onClick={e => e.stopPropagation()}>
          <Checkbox
          // TODO
          />
        </TableCell>

        {
          Object
            .entries(columns)
            .map(
              ([columnName, columnDisplayName]) => (
                <TableCell
                  key={columnName}
                  align='center'

                  /** renderSet() setup **/
                  {...(
                    columnName === 'set'
                      ? {
                        ref: setRef,
                        onMouseEnter: e => setIsMouseOver(true),
                        onMouseLeave: e => setIsMouseOver(false),
                      }
                      : {}
                  )}
                >
                  {renderCell(dataWithPrice, columnName)}
                  {
                    columnName === 'set' && isMouseOver && (
                      <Paper className='floating' style={floatingCss(setRef, scrollPosition)}>
                        {[data.set_name, _.upperFirst(data.rarity), '#' + data.collector_number].join(' - ')}
                      </Paper>
                    )
                  }
                </TableCell>
              )
            )
        }

        <TableCell>
          <IconButton size='small' onClick={e => setIsOpen(!isOpen)}>
            {
              isOpen
                ? <KeyboardArrowUpIcon />
                : <KeyboardArrowDownIcon />
            }
          </IconButton>
        </TableCell>
      </TableRow>


      <TableRow>
        <TableCell colSpan={999} className={classes.collapsableContent}>
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <CardInfo
              collection={dataWithPrice}
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