/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, createRef } from 'react'
import { Grid, ListItemText, MenuItem, ListItem, ListSubheader, Divider, Fab, Tooltip, useMediaQuery } from '@material-ui/core'
import { Skeleton, ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { withStyles } from '@material-ui/styles'
import {
  Add as AddIcon,
  CloudUpload as CloudUploadIcon,
  MoreVert as MoreVertIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  ViewCompact as ViewCompactIcon,
} from '@material-ui/icons'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import upperFirst from 'lodash/upperFirst'

import {
  setCurrentTab, setCurrentCollection, setView, toggleCurrency, setColumns_TableView, toggleTiltEnabled_GridView,
  toggleTransform3dEnabled_GridView, toggleCardsSelectableEnabled, setCurrentOpenCardId, setCardsSelectableEnabled,
  setPerPage, setPageNumber,
} from '@/Logic/redux'
import { CardPriceDataProvider, FilteredDataProvider } from '@/Providers'
import { MenuPopover } from '@/Components'
import { MagicdexApi } from '@/Api'
import { CardTableView, CardGridView } from './Views'
import FilterFields from './FilterFields'
import useStyles from './styles'


/** REDUX **/
const mapStateToProps = (state) => ({
  username: state.actions.activeUser.username,
  collection: state.actions.activeUser.collection,
  view: state.actions.app.collection.view,
  currency: state.actions.app.currency,
  tiltEnabled: state.actions.app.collection.gridView.tiltEnabled,
  transform3dEnabled: state.actions.app.collection.gridView.transform3dEnabled,
  selectedCardIds: state.actions.app.collection.selectedCardIds,
  cardsSelectableEnabled: state.actions.app.collection.cardsSelectableEnabled,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    setCurrentTab: (tab) => dispatch(setCurrentTab({ tab })),
    setCurrentCollection: (collection) => dispatch(setCurrentCollection({ collection })),
    setCurrentOpenCardId: (id) => dispatch(setCurrentOpenCardId({ id })),
    setView: (view) => dispatch(setView({ view })),
    setColumns: (columns) => dispatch(setColumns_TableView({ columns })),
    toggleCurrency: () => dispatch(toggleCurrency()),
    toggleTiltEnabled: () => dispatch(toggleTiltEnabled_GridView()),
    toggleTransform3dEnabled: () => dispatch(toggleTransform3dEnabled_GridView()),
    setCardsSelectableEnabled: (enabled) => dispatch(setCardsSelectableEnabled({ enabled })),
    toggleCardsSelectableEnabled: () => dispatch(toggleCardsSelectableEnabled()),
    setPageNumber: (pageNumber) => dispatch(setPageNumber({ pageNumber })),
    setPerPage: (perPage) => dispatch(setPerPage({ perPage })),
  }
})


const Collection = (props) => {
  /** VARS **/
  const {
    classes,
    dispatch,
    username,
    collection, // current user's collection
    view, // one of ['table', 'grid', 'compact']
    transform3dEnabled,
    tiltEnabled,
    cardsSelectableEnabled,
    // selectedCardIds, // an array which will contain mongodb ids of selected cards (List[card._id]) //TODO: use this somehow l8r
    currency,
  } = props
  const history = useHistory()
  const location = useLocation()
  const menuRef = createRef()
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down('md'))


  /** EFFECTS **/
  useEffect(() => {
    //onMount
    dispatch.setCurrentTab('collection')
    dispatch.setCurrentOpenCardId(null)

    //onUnmount
    return () => {
      dispatch.setCurrentOpenCardId(null)
      dispatch.setCardsSelectableEnabled(false)
      // dispatch.setPerPage(PER_PAGE)
      dispatch.setPageNumber(0)
    }
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const viewParam = params.get('view')

    if (viewParam && viewParam !== view)
      handleViewChange(viewParam)
  }, [location])

  useEffect(() => {
    if (mdDown) {
      dispatch.setColumns({
        amount: 'amount',
        name: 'name',
        set: 'set',
        mana_cost: 'cost',
        type_line: 'type',
        foil: 'foil',
        total_price: `price`,
      })
    }
    else {
      dispatch.setColumns({
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
  }, [mdDown, currency])

  useEffect(() => {
    if (!username)
      return history.push('/login')

    dispatch.setCurrentCollection(JSON.parse(localStorage.getItem('collection')))
    MagicdexApi
      .getAllCards()
      .then(res => dispatch.setCurrentCollection(res))
  }, [username])


  /** HANDLERS **/
  const handleViewChange = (value) => {
    if (value && value !== view) {
      const params = new URLSearchParams(location.search)
      params.set('view', value)

      history.push({ search: params.toString() })
      dispatch.setView(value)
      dispatch.setCurrentOpenCardId(null)
      dispatch.setCardsSelectableEnabled(false)
      // dispatch.setPerPage(PER_PAGE)
      dispatch.setPageNumber(0)
    }
  }

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
                    <FilterFields />
                  </Grid>
                  <Grid item>
                    <MenuPopover
                      ref={menuRef}
                      icon={<MoreVertIcon />}
                      listProps={{ dense: true }}
                    >
                      <ListItem style={{ justifyContent: 'center' }}>
                        <ToggleButtonGroup exclusive
                          style={{ height: '2.4em' }}
                          size='small'
                          value={view}
                          onChange={(e, v) => handleViewChange(v)}
                        >
                          <ToggleButton value='table'>
                            <ViewListIcon />
                          </ToggleButton>
                          <ToggleButton value='grid'>
                            <ViewModuleIcon />
                          </ToggleButton>
                          <ToggleButton value='compact'>
                            <ViewCompactIcon />
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </ListItem>

                      <Divider style={{ marginTop: 8 }} />

                      <ListSubheader className={classes.subheader}>
                        {`${upperFirst(view)} View`}
                      </ListSubheader>
                      {(() => {
                        switch (view) {
                          default:
                          case 'table':
                            return (
                              <>
                                <MenuItem onClick={dispatch.toggleCurrency}>
                                  <ListItemText
                                    primary={'Change Currency'}
                                    secondary={`Viewing ${currency.toUpperCase()}`}
                                  />
                                </MenuItem>
                                <MenuItem onClick={dispatch.toggleCardsSelectableEnabled}>
                                  {
                                    cardsSelectableEnabled
                                      ? 'Disable Edit'
                                      : 'Enable Edit'
                                  }
                                </MenuItem>
                                {/* <MenuItem>
                                  Reset Changes
                                </MenuItem> */}
                              </>
                            )
                          case 'grid':
                            return (
                              <>
                                <MenuItem onClick={dispatch.toggleTiltEnabled}>
                                  {tiltEnabled ? 'Disable Tilt' : 'Enable Tilt'}
                                </MenuItem>
                                <MenuItem onClick={dispatch.toggleTransform3dEnabled}>
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
                  <CardPriceDataProvider data={collection}>
                    <FilteredDataProvider>
                      {
                        (() => {
                          const props = {
                            // {data} is passed to children from the `DataProvider`s
                          }
                          switch (view) {
                            default:
                            case 'table':
                              return <CardTableView {...props} />
                            case 'grid':
                              return <CardGridView {...props} />
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
                    <Tooltip arrow
                      placement='left'
                      title='Add cards'
                      enterDelay={250}
                    >
                      <Fab
                        size='small'
                        color='primary'
                        onClick={handleFabClick('add')}
                      >
                        <AddIcon />
                      </Fab>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip arrow
                      placement='left'
                      title='Export Cards'
                      enterDelay={250}
                    >
                      <Fab
                        size='small'
                        color='primary'
                        onClick={handleFabClick('import-export')}
                      >
                        <CloudUploadIcon />
                      </Fab>
                    </Tooltip>
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