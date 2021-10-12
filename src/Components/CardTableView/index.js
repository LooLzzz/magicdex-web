/* eslint-disable no-lone-blocks */

import { useState, useEffect } from 'react'
import { Grid, Paper, Hidden, Table, TableContainer, TableRow, TableHead, TableBody, TableCell, TableSortLabel, Button, IconButton } from '@material-ui/core'
import { MoreVert as MoreVertIcon } from '@material-ui/icons'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import _ from 'lodash'

import { CardImage } from '@/Components'
import CardRow from './CardRow'
import useStyles from './styles'


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {

  }
})

const CardTableView = (props) => {
  /** VARS **/
  const {
    ref,
    classes,
    data,
    columns,
    // dispatch,
  } = props
  const [currentHoveringCard, setCurrentHoveringCard] = useState()
  const [isSelectable, setIsSelectable] = useState(false)
  const [sortBy, setSortByCol] = useState()
  const [sortOrder, setSortOrder] = useState('desc')
  const [sortedData, setSortedData] = useState(data)


  /** EFFECTS **/
  useEffect(() => {
    let _sortBy //= sortBy === 'mana_cost' ? 'cmc' : sortBy
    switch (sortBy) {
      case 'mana_cost':
        _sortBy = 'cmc'
        break


      case 'total_price':
      case 'prices':
      case 'price':
        // _sortBy = (card) => card.amount * Number(card.foil ? card.prices?.usd_foil : card.prices?.usd)
        _sortBy = (card) => Number(card.foil ? card.prices?.usd_foil : card.prices?.usd)
        break

      case 'type':
      case 'type_line':
        _sortBy = (card) => card.type_line.replace('Legendary ', '')
        break

      case null:
      case undefined:
      case '':
        _sortBy = (card) => card.date_created
        break

      default:
        _sortBy = sortBy
        break
    }

    setSortedData(
      _.orderBy(data, [_sortBy, 'name', 'collector_number'], [sortOrder])
    )
  }, [data, sortOrder, sortBy])


  /** HANDLERS **/
  const handleRowHover = (card, i) => {
    setCurrentHoveringCard(card)
  }

  const handleHeaderClick = (event, colName) => {
    if (colName === sortBy) {
      switch (sortOrder) {
        case 'desc': //first click
          setSortOrder('asc')
          break

        case 'asc': //second click
        default:
          setSortByCol('')
          setSortOrder('desc')
          break
      }
    }
    else {
      setSortByCol(colName)
      setSortOrder('desc')
    }
  }


  /** RENDER **/
  return (
    <Grid container spacing={1}>
      {/** TOP BUTTONS **/}
      <Grid item container spacing={1} direction="row-reverse" xs={12}>
        <Grid item>
          <IconButton size='small'>
            <MoreVertIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Button
            color='primary'
            variant='contained'
            size='small'
            onClick={e => setIsSelectable(!isSelectable)}
          >
            {isSelectable ? 'Disable Edit' : 'Enable Edit'}
          </Button>
        </Grid>
      </Grid>

      {/** CARD PREVIEW **/}
      <Grid item container wrap='nowrap' justifyContent='center'>
        <Hidden mdDown>
          <Grid item>
            <div className={classes['card-image']}>
              <CardImage tiltEnabled
                card={currentHoveringCard}
              />
            </div>
          </Grid>
        </Hidden>

        {/** TABLE VIEW **/}
        <Grid item>
          <div align='center' style={{ width: 'fit-content' }}>
            <TableContainer ref={ref} component={Paper} className={classes.paper} elevation={5}>
              <Table size="small" >
                <TableHead>
                  <TableRow>

                    {Object.entries(columns).map(([columnName, columnDisplayName]) => (
                      <TableCell
                        style={{ paddingLeft: '16px' }}
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

                    {/* Dropdown icon */}
                    <TableCell className={classes.iconCell} />

                    {/** Checkbox **/}
                    {
                      isSelectable &&
                      <TableCell className={classes.iconCell} />
                    }

                  </TableRow>
                </TableHead>

                <TableBody /* onMouseLeave={e => onRowHover(null)} */ >
                  {sortedData.map(card => (
                    <CardRow
                      onMouseEnter={e => handleRowHover(card)}
                      key={card._id}
                      columns={columns}
                      card={card}
                      selectable={isSelectable}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    </Grid>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      CardTableView
    )
  )