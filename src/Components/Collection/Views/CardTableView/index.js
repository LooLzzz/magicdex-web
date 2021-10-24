import { useState, useEffect } from 'react'
import { Grid, Paper, Hidden, Table, TableContainer, TableRow, TableHead, TableBody, TableCell, TableSortLabel } from '@material-ui/core'
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
    classes,
    data,
    columns,
    isEditable,
    // dispatch,
  } = props
  const [currentHoveringCard, setCurrentHoveringCard] = useState()
  const [sortBy, setSortByCol] = useState()
  const [sortOrder, setSortOrder] = useState('desc')
  const [sortedData, setSortedData] = useState(data)
  const [closeSignal, setCloseSignal] = useState(false)
  const [selectedCardIds, setSelectedCardIds] = useState([]) //will contain mongodb ids (`card._id`) of selected rows


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

  useEffect(() => {
    if (!isEditable)
      setSelectedCardIds([])
  }, [isEditable])


  /** HANDLERS **/
  const handleRowSelected = (id, checked) => {
    setSelectedCardIds(
      checked
        ? [...selectedCardIds, id]
        : selectedCardIds.filter(cardId => cardId !== id)
    )
  }

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
    <Grid item container spacing={1} xs={12}>
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
        <Grid item style={{ flexGrow: 1 }}>
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
                  <TableCell className={classes.iconCell} />

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
                    onSelected={handleRowSelected}
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