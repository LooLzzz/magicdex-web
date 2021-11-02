/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState, createRef } from 'react'
import { Grid, ListItemText, MenuItem, ListItem, ListSubheader, Divider, ButtonGroup, IconButton, Fab, useMediaQuery } from '@material-ui/core'
import { Skeleton, ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import {
  Add as AddIcon,
  CloudUpload as CloudUploadIcon,
  MoreVert as MoreVertIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  ViewCompact as ViewCompactIcon,
} from '@material-ui/icons'
import upperFirst from 'lodash/upperFirst'

import { setCurrentTab, setCurrentCollection } from '@/Logic/redux'
import { CardPriceDataProvider, FilteredDataProvider } from '@/Providers'
import { MenuPopover } from '@/Components'
import { MagicdexApi } from '@/Api'
import { CardTableView, CardGridView } from './Views'
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
  const [tiltEnabled, setTiltEnabled] = useState(false)
  const [transform3dEnabled, setTransform3dEnabled] = useState(false)

  const smDown = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const [columns, setColumns] = useState({
    amount: 'amount',
    name: 'name',
    set: 'set',
    mana_cost: 'mana cost',
    type_line: 'type',
    foil: 'foil',
    total_price: `price (${currency})`,
    date_created: 'date added',
  })


  /** EFFECTS **/
  useEffect(() => {
    //onMount
    dispatch.setCurrentTab({ tab: 'collection' })
  }, [])

  useEffect(() => {
    if (smDown) {
      setColumns({
        name: 'name',
        set: 'set',
        mana_cost: 'mana cost',
        type_line: 'type',
        foil: 'foil',
        total_price: `price (${currency})`,
      })
    }
    else if (mdDown) {
      setColumns({
        amount: 'amount',
        name: 'name',
        set: 'set',
        mana_cost: 'mana cost',
        type_line: 'type',
        foil: 'foil',
        total_price: `price (${currency})`,
      })
    }
    else {
      setColumns({
        amount: 'amount',
        name: 'name',
        set: 'set',
        mana_cost: 'mana cost',
        type_line: 'type',
        foil: 'foil',
        total_price: `price (${currency})`,
        date_created: 'date added',
      })
    }
  }, [smDown, mdDown, currency])

  useEffect(() => {
    if (!username)
      return history.push('/login')

    dispatch.setCurrentCollection({ collection: JSON.parse(localStorage.getItem('collection')) })
    MagicdexApi
      .getAllCards()
      .then(res => dispatch.setCurrentCollection({ collection: res }))
  }, [username])


  /** HANDLERS **/
  const handleFabClick = fabType => e => {
    switch (fabType) {
      case 'add':
        console.log('fab: add')
        break

      case 'import-export':
        console.log('fab: import-export')
        break

      default:
        break
    }

    //TODO: add a new card to the collection & update the localStorage.
    // user should choose `import from list` or a form to add a new card
  }

  const toggleTransform3d = () => {
    setTransform3dEnabled(!transform3dEnabled)
  }

  const toggleTlit = () => {
    setTiltEnabled(!tiltEnabled)
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
                      <ListItem style={{ justifyContent: 'center', marginBottom: 8 }}>
                        <ToggleButtonGroup exclusive
                          size='small'
                          value={view}
                          onChange={(e, v) => setView(v)}
                        >
                          <ToggleButton value='table'>
                            <ViewListIcon color={view === 'table' ? 'secondary' : 'inherit'} />
                          </ToggleButton>
                          <ToggleButton value='grid'>
                            <ViewModuleIcon color={view === 'grid' ? 'secondary' : 'inherit'} />
                          </ToggleButton>
                          <ToggleButton value='compact'>
                            <ViewCompactIcon color={view === 'compact' ? 'secondary' : 'inherit'} />
                          </ToggleButton>
                        </ToggleButtonGroup>
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
                                <MenuItem onClick={toggleTlit}>
                                  {tiltEnabled ? 'Disable Tilt' : 'Enable Tilt'}
                                </MenuItem>
                                <MenuItem onClick={toggleTransform3d}>
                                  {transform3dEnabled ? 'Disable 3D Transform' : 'Enable 3D Transform'}
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
                                tiltEnabled={tiltEnabled}
                                transform3dEnabled={transform3dEnabled}
                              // data = {passed from parent}
                              />
                            case 'grid':
                              return <CardGridView
                                tiltEnabled={tiltEnabled}
                                transform3dEnabled={transform3dEnabled}
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

              {/* FLOATING ACTION BUTTONS */}
              <div className={classes.fab}>
                <Grid container spacing={1} direction="column-reverse">
                  <Grid item>
                    <Fab
                      title='Add a Card'
                      size='small'
                      color='primary'
                      onClick={handleFabClick('add')}
                    >
                      <AddIcon />
                    </Fab>
                  </Grid>
                  <Grid item>
                    <Fab
                      title='Import/Export'
                      size='small'
                      color='primary'
                      onClick={handleFabClick('import-export')}
                    >
                      <CloudUploadIcon />
                    </Fab>
                  </Grid>
                </Grid>
              </div>
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