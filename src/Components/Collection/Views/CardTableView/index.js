import { useState, useEffect } from 'react'
import { Grid, Paper, Hidden, Table, TableContainer, TableRow, TableHead, TableBody, TableCell, TableSortLabel } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import _ from 'lodash'

import { setCurrentCardId } from '@/Logic/redux'
import { CardImage } from '@/Components'
import CardRow from './CardRow'
import useStyles from './styles'


/** REDUX **/
const mapStateToProps = (state) => ({
  currentCardId: state.actions.app.collection.currentCardId,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    setCurrentCardId: (id) => dispatch(setCurrentCardId(id)),
  }
})


const CardTableView = (props) => {
  /** VARS **/
  const {
    classes,
    data,
    columns,
    isEditable,
    handleCardSelected,
    selectedCardIds,
    // currentCardId, // current *open* card info window, falsy if nothing is open
    // dispatch,
  } = props
  const [currentHoveringCard, setCurrentHoveringCard] = useState()
  const [sortBy, setSortByCol] = useState()
  const [sortOrder, setSortOrder] = useState('desc')
  const [sortedData, setSortedData] = useState(data)
  const [closeSignal, setCloseSignal] = useState(false)


  /** EFFECTS **/
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
  }, [data, sortOrder, sortBy])


  /** HANDLERS **/
  const closeAllRows = (origin) => {
    setCloseSignal(origin)
  }

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


  /** RENDER **/
  return (
    <Grid item container spacing={1} xs={11}>
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
        <Grid item>
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
                    isEditable &&
                    <TableCell className={classes.iconCell} />
                  }

                </TableRow>
              </TableHead>

              <TableBody>
                {sortedData instanceof Array && sortedData.map(card => (
                  <CardRow
                    onMouseEnter={e => handleRowHover(card)}
                    key={card._id}
                    columns={columns}
                    card={card}
                    selectable={isEditable}
                    onSelected={handleCardSelected}
                    selectedCardIds={selectedCardIds}

                    closeAllRows={closeAllRows}
                    closeSignal={closeSignal}
                  />
                ))}
              </TableBody>
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