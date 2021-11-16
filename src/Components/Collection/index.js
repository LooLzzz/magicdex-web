/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, Fragment, useRef } from 'react'
import { Grid, ListItemText, MenuItem, ListItem, ListSubheader, Divider, useMediaQuery } from '@material-ui/core'
import { Skeleton, ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { withStyles } from '@material-ui/styles'
import {
  MoreVert as MoreVertIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  ViewCompact as ViewCompactIcon,
} from '@material-ui/icons'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import upperFirst from 'lodash/upperFirst'

import {
  setCurrentTab, setCurrentCollection, setView, toggleCurrency, setColumns_TableView,
  toggleCardsSelectableEnabled, setCurrentOpenCardId, setCardsSelectableEnabled,
  setPerPage, setPageNumber,
} from '@/Logic/redux'
import { CardPriceDataProvider, FilteredDataProvider } from '@/Providers'
import { MenuPopover } from '@/Components'
import { MagicdexApi } from '@/Api'
import { CardTableView, CardGridView } from './Views'
import FilterFields from './FilterFields'
import MyFabs from './MyFabs'
import useStyles from './styles'


/** REDUX **/
const mapStateToProps = (state) => ({
  username: state.actions.activeUser.username,
  collection: state.actions.activeUser.collection,
  view: state.actions.app.collection.view,
  currency: state.actions.app.currency,
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
    setCardsSelectableEnabled: (enabled) => dispatch(setCardsSelectableEnabled({ enabled })),
    toggleCardsSelectableEnabled: () => dispatch(toggleCardsSelectableEnabled()),
    setPageNumber: (pageNumber) => dispatch(setPageNumber({ pageNumber })),
    setPerPage: (perPage) => dispatch(setPerPage({ perPage })),
  }
})


const Collection = ({
  /** VARS **/
  ...props
}) => {
  const {
    classes,
    dispatch,
    username,
    collection, // current user's collection
    view, // one of ['table', 'grid', 'compact']
    currency,
    cardsSelectableEnabled,
  } = props
  const history = useHistory()
  const location = useLocation()
  const menuRef = useRef()
  const menuItemRef = useRef()
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


  /** RENDER **/
  return (
    <>
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
                      refs={menuRef}
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
                      <MenuItem onClick={dispatch.toggleCardsSelectableEnabled}>
                        <ListItemText
                          primary={'Selection Mode'}
                          secondary={cardsSelectableEnabled ? 'On' : 'Off'}
                        />
                      </MenuItem>
                      <MenuItem onClick={dispatch.toggleCurrency}>
                        <ListItemText
                          primary={'Change Currency'}
                          secondary={`Viewing ${currency.toUpperCase()}`}
                        />
                      </MenuItem>

                      <span ref={menuItemRef} />  {/* placeholder for the view component to use <Portal> on */}
                    </MenuPopover>
                  </Grid>
                </Grid>

                <Grid item container wrap='nowrap' justifyContent='center' xs={12}>
                  <CardPriceDataProvider data={collection}>
                    <FilteredDataProvider>
                      {
                        (() => {
                          const props = {
                            menuItemRef,
                            // {data} is passed to children from the <DataProvider> parents
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
                <MyFabs />
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