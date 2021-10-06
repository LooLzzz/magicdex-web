/* eslint-disable no-lone-blocks */

import { useState, useEffect } from 'react'
import { Paper, Table, TableContainer, TableRow, TableHead, TableBody, TableCell, TableSortLabel } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import _ from 'lodash'

import CardRow from './CardRow'
import useStyles from './styles'


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {

  }
})

const CardTable = (props) => {
  /** VARS **/
  const {
    ref,
    classes,
    collection,
    columns,
    onRowHover,
    // dispatch,
  } = props
  const [sortBy, setSortByCol] = useState('total_price')
  const [sortOrder, setSortOrder] = useState('desc')
  const [sortedData, setSortedData] = useState(collection)


  /** EFFECTS **/
  useEffect(() => {
    let _sortBy; //= sortBy === 'mana_cost' ? 'cmc' : sortBy
    switch (sortBy) {
      case 'mana_cost':
        _sortBy = 'cmc'
        break
      case 'total_price':
      case 'price':
        _sortBy = (card) => card.amount * Number(card.foil ? card.prices?.usd_foil : card.prices?.usd)
        break
      case 'type':
      case 'type_line':
        _sortBy = (card) => card.type_line.replace('Legendary ', '')
        break
      default:
        _sortBy = sortBy
        break
    }

    setSortedData(
      _.orderBy(collection, [_sortBy, 'name', 'collector_number'], [sortOrder])
    )
  }, [collection, sortOrder, sortBy])


  /** HANDLERS **/
  const handleHeaderClick = (event, colName) => {
    if (colName === sortBy)
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    else {
      setSortByCol(colName)
      setSortOrder('asc')
    }
  }


  /** RENDER **/
  return (
    <TableContainer ref={ref} component={Paper} className={classes.paper}>
      <Table size="small">
        <TableHead>
          <TableRow>

            <TableCell className={classes.iconCell} /> {/* for Checkbox */}

            {Object.entries(columns).map(([columnName, columnDisplayName]) => (
              <TableCell
                key={columnName}
                align="center"
                sortDirection={sortBy === columnName ? sortOrder : false}
              >
                <TableSortLabel
                  active={sortBy === columnName}
                  direction={sortBy === columnName ? sortOrder : 'asc'}
                  onClick={e => handleHeaderClick(e, columnName)}
                >
                  {columnDisplayName}
                </TableSortLabel>
              </TableCell>
            ))}

            <TableCell className={classes.iconCell} /> {/* for Dropdown icon */}

          </TableRow>
        </TableHead>

        <TableBody
        // onMouseLeave={e => onRowHover(null)}
        >
          {sortedData.map(card => (
            <CardRow
              onMouseEnter={e => onRowHover(card)}
              key={card._id}
              columns={columns}
              data={card}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      CardTable
    )
  )