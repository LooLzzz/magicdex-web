/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react'
import { Grid, Tooltip, Checkbox, IconButton, Paper, Hidden, Table, TableContainer, TableRow, TableHead, TableBody, TableFooter, TableCell, TableSortLabel, TablePagination } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
} from '@material-ui/icons'
import { connect } from 'react-redux'
import _ from 'lodash'

import { setSelectedCardIds, setPageNumber, setPerPage } from '@/Logic/redux'
import { CardImage } from '@/Components'
import CardRow from './CardRow'
import useStyles from './styles'


/** REDUX **/
const mapStateToProps = (state) => ({
  columns: state.actions.app.collection.tableView.columns,
  cardsSelectableEnabled: state.actions.app.collection.cardsSelectableEnabled,
  selectedCardIds: state.actions.app.collection.selectedCardIds,
  pageNumber: state.actions.app.collection.pageNumber,
  perPage: state.actions.app.collection.perPage,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    setSelectedCardIds: (selectedCardIds) => dispatch(setSelectedCardIds({ selectedCardIds })),
    setPageNumber: (pageNumber) => dispatch(setPageNumber({ pageNumber })),
    setPerPage: (perPage) => dispatch(setPerPage({ perPage })),
  }
})


const CardTableView = (props) => {
  /** VARS **/
  const {
    classes,
    dispatch,
    data,
    columns,
    pageNumber,
    perPage,
    cardsSelectableEnabled,
    selectedCardIds,
  } = props
  const [currentHoveringCard, setCurrentHoveringCard] = useState()
  const [sortBy, setSortByCol] = useState()
  const [sortOrder, setSortOrder] = useState('desc')
  const [sortedData, setSortedData] = useState(data)
  const [paginatedData, setPaginatedData] = useState(data)


  /** EFFECTS **/
  useEffect(() => {
    setPaginatedData(() =>
      perPage === -1
        ? sortedData // show all
        : sortedData.slice(
          pageNumber * perPage,
          pageNumber * perPage + perPage
        )
    )
  }, [sortedData, pageNumber, perPage])

  useEffect(() => {
    let _sortBy //= sortBy === 'mana_cost' ? 'cmc' : sortBy
    switch (sortBy) {
      case 'mana_cost':
      case 'mana_value':
        _sortBy = ['cmc']
        break

      case 'total_price':
      case 'prices':
      case 'price':
        _sortBy = ['price']
        break

      case 'type':
      case 'type_line':
        _sortBy = [(card) => card.type_line.replace('Legendary ', '')]
        break

      case 'set':
      case 'rarity':
        _sortBy = [
          (card) => {
            return card.set_data.parent_set_code ?? card.set
          },
          (card) => {
            switch (card.rarity) {
              default:
                return 4
              case 'common':
                return 3
              case 'uncommon':
                return 2
              case 'rare':
                return 1
              case 'mythic':
                return 0
            }
          }
        ]
        break

      default:
        _sortBy = [sortBy]
        break

      /* if `sortBy` is not specified, then sort by `date_created` */
      case null:
      case undefined:
      case '':
        _sortBy = [(card) => new Date(card.date_created)]
        break
    }

    setSortedData(
      _.orderBy(data, [..._sortBy, 'name', 'collector_number'], sortOrder)
    )
    dispatch.setPageNumber(0)
  }, [data, sortOrder, sortBy])

  useEffect(() => {
    setCurrentHoveringCard(null)
  }, [sortedData, paginatedData])

  useEffect(() => {
    dispatch.setSelectedCardIds([])
  }, [data])


  /** HANDLERS **/
  const handleRowHover = (card, i) => {
    setCurrentHoveringCard(card)
  }

  const handleHeaderClick = (event, colName) => {
    if (colName === sortBy) {
      switch (sortOrder) {
        case 'desc': //second click
          setSortOrder('asc')
          break

        case 'asc': //third click, reset sorting
        default:
          setSortByCol('')
          setSortOrder('desc')
          break
      }
    }
    else {
      // first click
      setSortByCol(colName)
      setSortOrder('desc')
    }
  }

  const handleSelectAllChange = (e) => {
    e.target.checked
      ? dispatch.setSelectedCardIds(data.map(card => card._id))
      : dispatch.setSelectedCardIds([])
  }


  /** RENDER **/
  return (
    <Grid item container spacing={1} xs={11} className={classes.root}>
      <Grid item container wrap='nowrap' justifyContent='center'>

        {/** CARD PREVIEW **/}
        <Hidden mdDown>
          <Grid item>
            <div className={classes['card-image']}>
              <CardImage tiltEnabled transform3dEnabled
                card={currentHoveringCard}
              />
            </div>
          </Grid>
        </Hidden>

        {/** TABLE VIEW **/}
        <Grid item md>
          <TableContainer component={Paper} className={classes.tableContainer} elevation={5}>
            <Table size="small">
              <TableHead className={classes.tableHead}>
                <TableRow>
                  {
                    Object
                      .entries(columns)
                      .map(([columnName, columnDisplayName]) => (
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
                      ))
                  }

                  {/* Dropdown icon */}
                  <Hidden smDown>
                    <TableCell className={classes.iconCell} />
                  </Hidden>

                  {/** Checkbox **/}
                  {
                    cardsSelectableEnabled &&
                    // <TableCell className={classes.iconCell} />
                    <TableCell onClick={e => e.stopPropagation()} className={classes.checkbox}>
                      <Tooltip arrow placement='top' title={selectedCardIds.length >= data.length ? 'Clear selection' : 'Select all'}>
                        <Checkbox
                          size='small'
                          checked={selectedCardIds.length >= data.length}
                          indeterminate={selectedCardIds.length > 0 && selectedCardIds.length < data.length}
                          onChange={handleSelectAllChange}
                        />
                      </Tooltip>
                    </TableCell>
                  }

                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedData instanceof Array && paginatedData.map(card => (
                  <CardRow
                    onMouseEnter={e => handleRowHover(card)}
                    key={card._id}
                    columns={columns}
                    card={card}
                  />
                ))}
              </TableBody>

              <TableFooter className={classes.tableFooter}>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 25, 50, 100, { label: 'All', value: -1 }]}
                    labelRowsPerPage='Cards per page:'
                    colSpan={9}
                    count={data.length}
                    rowsPerPage={perPage}
                    page={pageNumber}
                    onPageChange={(e, v) => dispatch.setPageNumber(v)}
                    onRowsPerPageChange={(e) => dispatch.setPerPage(parseInt(e.target.value))}
                    SelectProps={{
                      native: true,
                    }}
                    ActionsComponent={({ count, page, rowsPerPage, onPageChange }) => (
                      <>
                        <IconButton
                          size='small'
                          onClick={e => onPageChange(e, 0)}
                          disabled={page === 0}
                          aria-label="first page"
                        >
                          <FirstPageIcon />
                        </IconButton>
                        <IconButton
                          size='small'
                          onClick={e => onPageChange(e, page - 1)}
                          disabled={page === 0}
                          aria-label="previous page"
                        >
                          <ChevronLeftIcon />
                        </IconButton>
                        <IconButton
                          size='small'
                          onClick={e => onPageChange(e, page + 1)}
                          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                          aria-label="next page"
                        >
                          <ChevronRightIcon />
                        </IconButton>
                        <IconButton
                          size='small'
                          onClick={e => onPageChange(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1))}
                          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                          aria-label="last page"
                        >
                          <LastPageIcon />
                        </IconButton>
                      </>
                    )}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
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