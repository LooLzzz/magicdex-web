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
} from '@material-ui/icons';

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
  const [isMouseOver, setIsMouseOver] = useState(false)
  const [dataWithPrice, setDataWithPrice] = useState(data)
  const [isOpen, setIsOpen] = useState(false)


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


  /** CUSTOM ROW RENDERS **/
  const defaultRender = (card, columnName) => (
    <TableCell key={columnName} align='center'>
      {card[columnName].toString()}
    </TableCell>
  )

  const renderSet = (card, columnName) => {
    const { set_data, rarity } = card
    const set = set_data?.parent_set_code ? set_data.parent_set_code : set_data.code
    return (
      <TableCell
        ref={setRef}
        key={columnName}
        align='center'
        onMouseEnter={e => setIsMouseOver(true)}
        onMouseLeave={e => setIsMouseOver(false)}
      >
        <span
          style={{ fontSize: '1.25em' }}
          className={['ss', 'ss-fw', `ss-${rarity}`, `ss-${set}`].join(' ')}
        >
        </span>
        <Paper className={classes.floating} style={{
          left: setRef.current?.getBoundingClientRect().x + setRef.current?.getBoundingClientRect().width,
          top: setRef.current?.getBoundingClientRect().y + scrollPosition + setRef.current?.getBoundingClientRect().height / 8,
          display: isMouseOver ? 'block' : 'none',
        }}>
          {[card.set_name, _.upperFirst(card.rarity), '#' + card.collector_number].join(' - ')}
        </Paper>
      </TableCell>
    )
  }

  const renderBoolean = (card, columnName) => (
    <TableCell key={columnName} align='center'>
      {card[columnName].toString() === 'true' ? '✔' : '✖'}
    </TableCell>
  )

  const renderAmount = (card, columnName) => (
    <TableCell key={columnName} align='center'>
      <Paper component='span' className={classes.amount}>
        {'x' + card.amount}
      </Paper>
    </TableCell>
  )

  const renderPrice = (card, columnName) => {
    const price = Number(card[columnName])
    return (
      <TableCell key={columnName} align='center'>
        {price > 0 ? '$' + price : '-'}
      </TableCell>
    )
  }

  const renderTag = (card, columnName) => {
    let tags = card['tag']
    return (
      <TableCell key={columnName} align='center'>
        {tags.length > 0 ? tags.join('; ') : '-'}
      </TableCell>
    )
  }

  const renderManaCost = (card, columnName) => {
    let manaCost = card['mana_cost']

    if (manaCost === '')
      manaCost = '-'
    else
      manaCost = manaCost
        .replace(/(^{)|(\/)|(}$)/g, '') // remove starting '{', trailing '}' and any '/'
        .split('}{')
        .map(sym => sym ? `ms-${sym.toLowerCase()}` : '')
        .map(cost => (
          <span
            style={{ fontSize: '0.85em' }}
            className={clsx(classes.mana, 'ms', 'ms-fw', 'ms-cost', 'ms-shadow', cost)} />
        ))

    return (
      <TableCell key={columnName} align='center'>
        {manaCost}
      </TableCell>
    )
  }

  const renderType = (card, columnName) => (
    <TableCell key={columnName} align='center'>
      {
        card[columnName]
          .replace('—', '-')
          .replace('Legendary', 'Lgd.')
      }
    </TableCell>
  )


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
          Object.entries(columns).map(([columnName, columnDisplayName]) => (
            ((card) => {
              switch (columnName) {
                case 'set':
                  return renderSet(card, columnName)
                case 'signed':
                case 'altered':
                case 'foil':
                  return renderBoolean(card, columnName)
                case 'amount':
                  return renderAmount(card, columnName)
                case 'total_price':
                case 'price':
                  return renderPrice(card, columnName)
                case 'tag':
                  return renderTag(card, columnName)
                case 'mana_cost':
                  return renderManaCost(card, columnName)
                case 'type_line':
                case 'type':
                  return renderType(card, columnName)
                default:
                  return defaultRender(card, columnName)
              }
            })(dataWithPrice)
          ))
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