/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState, createRef } from 'react'
import { Grid, ListItemText, MenuItem, ListItem, ListSubheader, Divider, ButtonGroup, IconButton, Fab } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  ViewCompact as ViewCompactIcon,
} from '@material-ui/icons'
import upperFirst from 'lodash/upperFirst'

import { setCurrentTab, setCurrentCollection } from '@/Logic/redux'
import { MenuPopover } from '@/Components'
import { MagicdexApi } from '@/Api'
import { CardTableView, CardGridView } from './Views'
import { CardPriceDataProvider, FilteredDataProvider } from './Providers'
import FilterFields from './FilterFields'
import useStyles from './styles'


const mapStateToProps = (state) => ({
  username: state.actions.activeUser.username,
  collection: state.actions.activeUser.collection,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    setCurrentTab: (payload) => dispatch(setCurrentTab(payload)),
    setCurrentCollection: (payload) => dispatch(setCurrentCollection(payload)),
  }
})

const Collection = (props) => {
  /** VARS **/
  const {
    classes,
    dispatch,
    username,
    collection,
    currency: _currency,
  } = props
  const history = useHistory()
  const menuRef = createRef()
  const [view, setView] = useState('table') // one of ['table', 'grid', 'compact']
  const [filters, setFilters] = useState()
  const [currency, setCurrency] = useState(_currency ?? 'usd') // one of ['usd', 'eur']
  const [tableEditable, setTableEditable] = useState(false)
  const columns = {
    amount: 'amount',
    name: 'name',
    set: 'set',
    mana_cost: 'mana cost',
    type_line: 'type',
    foil: 'foil',
    total_price: `price (${currency})`,
    date_created: 'date added',
  }


  /** EFFECTS **/
  useEffect(() => {
    //onMount
    dispatch.setCurrentTab({ tab: 'collection' })
  }, [])

  useEffect(() => {
    if (!username)
      return history.push('/login')

    dispatch.setCurrentCollection({ collection: JSON.parse(localStorage.getItem('collection')) })
    MagicdexApi
      .getAllCards()
      .then(res => dispatch.setCurrentCollection({ collection: res }))
  }, [username])


  /** HANDLERS **/
  const handleFabClick = (e) => {
    //TODO: add a new card to the collection & update the localStorage.
    // user should choose `import from list` or a form to add a new card
  }

  const toggleTableEditable = () => {
    setTableEditable(!tableEditable)
  }

  const toggleCurrency = () => {
    setCurrency(currency === 'usd' ? 'eur' : 'usd')
  }


  /** RENDER **/
  return (
    <>
      {/* <Prompt
        when={true}
        message="Are you sure you want to leave?"
      /> */}

      <div className={classes.root}>
        {
          !collection
            ?
            // SHOW SKELETON
            <Grid container justifyContent='center'>
              <Grid item container xs={12} sm={11} md={10} spacing={2}>
                <Grid item xs={2}>
                  <Skeleton variant='rect' height='100%' />
                </Grid>
                <Grid item container xs={10}>
                  <Grid item xs={2}>
                    <Skeleton variant='circle' width={75} height={75} />
                  </Grid>
                  <Grid item xs={10}>
                    <Skeleton variant='rect' height={32} />
                    <Skeleton variant='text' />
                  </Grid>
                  <Grid item xs={12}>
                    {[...Array(10).keys()].map(i => <Skeleton key={i} variant='text' />)}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            :
            // SHOW ACTUAL DATA VIEW
            <>
              <Grid container justifyContent='center'>
                <Grid item container xs={12} lg={10} wrap='nowrap' justifyContent='center' alignItems='center' className={classes.filtersContainer}>
                  <Grid item container xs={11}>
                    <FilterFields
                      setFilters={setFilters}
                    />
                  </Grid>
                  <Grid item>
                    <MenuPopover
                      ref={menuRef}
                      icon={<MoreVertIcon />}
                      listProps={{ dense: true }}
                    >
                      <ListItem>
                        <ButtonGroup variant='text' size='small'>
                          <IconButton onClick={() => setView('table')} color={view === 'table' && 'secondary'}>
                            <ViewListIcon />
                          </IconButton>
                          <IconButton onClick={() => setView('grid')} color={view === 'grid' && 'secondary'}>
                            <ViewModuleIcon />
                          </IconButton>
                          <IconButton onClick={() => setView('compact')} color={view === 'compact' && 'secondary'}>
                            <ViewCompactIcon />
                          </IconButton>
                        </ButtonGroup>
                      </ListItem>

                      <Divider />

                      <ListSubheader className={classes.subheader}>
                        {`${upperFirst(view)} View`}
                      </ListSubheader>
                      {(() => {
                        switch (view) {
                          default:
                          case 'table':
                            return (
                              <>
                                <MenuItem onClick={toggleCurrency}>
                                  <ListItemText
                                    primary={'Change Currency'}
                                    secondary={`Viewing ${currency.toUpperCase()}`}
                                  />
                                </MenuItem>
                                <MenuItem onClick={toggleTableEditable}>
                                  {
                                    tableEditable
                                      ? 'Disable Edit'
                                      : 'Enable Edit'
                                  }
                                </MenuItem>
                                <MenuItem>
                                  Reset Changes
                                </MenuItem>
                              </>
                            )
                          case 'grid':
                            return (
                              <>
                                <MenuItem>
                                  Something here
                                </MenuItem>
                              </>
                            )
                          case 'compact':
                            return (
                              <>
                                <MenuItem>
                                  TBD
                                </MenuItem>
                              </>
                            )
                        }
                      })()}
                    </MenuPopover>
                  </Grid>
                </Grid>
                <Grid item container wrap='nowrap' justifyContent='center' xs={12}>
                  <CardPriceDataProvider
                    data={collection}
                    currency={currency}
                  >
                    <FilteredDataProvider
                      filters={filters}
                    // data = passed from parent
                    >
                      {
                        (() => {
                          switch (view) {
                            default:
                            case 'table':
                              return <CardTableView
                                columns={columns}
                                setCurrency={setCurrency}
                                currency={currency}
                                isEditable={tableEditable}
                              // data = {passed from parent}
                              />
                            case 'grid':
                              return <CardGridView
                              // data = {passed from parent}
                              />
                            case 'compact':
                              return <div>TBD</div>
                          }
                        })()
                      }
                    </FilteredDataProvider>
                  </CardPriceDataProvider>
                </Grid>
              </Grid>

              {/* FLOATING PLUS BUTTON */}
              <Fab
                color='primary'
                className={classes.fab}
                onClick={handleFabClick}
              >
                <AddIcon />
              </Fab>
            </>
        }
      </div>
    </>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      Collection
    )
  )