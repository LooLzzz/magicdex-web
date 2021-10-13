/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react'
import { Grid, Button, ButtonGroup } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
// import {
//   Apps as AppsIcon,
//   Toc as TocIcon,
// } from '@material-ui/icons'
// import useMouse from '@react-hook/mouse-position'
// import _ from 'lodash';
// import clsx from 'clsx'

import { setCurrentTab, setCurrentCollection } from '@/Logic/redux'
import { CardTableView, CardGridView } from '@/Components'
import { MagicdexApi } from '@/Api'
// import ViewSwitch from './ViewSwitch'
import FilterFields from './FilterFields'
import CardPriceDataProvider from './CardPriceDataProvider'
import FilteredDataProvider from './FilteredDataProvider'
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
  const [view, setView] = useState('table') // one of ['table', 'grid']
  const [filters, setFilters] = useState()
  const [currency, setCurrency] = useState(_currency ?? 'usd') // one of ['usd', 'eur']
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
    if (username === null)
      return history.push('/')

    MagicdexApi
      .getAllCards()
      .then(res => dispatch.setCurrentCollection({ collection: res }))
  }, [username])


  /** HANDLERS **/
  { }


  /** RENDER **/
  return (
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
          <Grid container spacing={2} justifyContent='flex-end'>
            <Grid item container xs={12} lg={10} justifyContent='center' alignItems='center'>
              <Grid item container xs={10}>
                <FilterFields
                  setFilters={setFilters}
                />
              </Grid>
              <Grid item xs={2}>
                <ButtonGroup variant='contained' color='primary' >
                  <Button color='primary' onClick={e => setView('table')}>
                    Table
                  </Button>
                  <Button color='primary' onClick={e => setView('grid')}>
                    Grid
                  </Button>
                  {/* <IconButton color='inherit'>
                    <AppsIcon color='inherit' />
                  </IconButton>
                  <IconButton color='inherit'>
                    <TocIcon color='inherit' />
                  </IconButton> */}
                </ButtonGroup>
              </Grid>
            </Grid>
            <Grid item container wrap='nowrap' justifyContent='center' xs={12}>
              <CardPriceDataProvider
                data={collection}
                currency={currency} //TODO: add currency selection component
              >
                <FilteredDataProvider
                  filters={filters}
                // data = passed from parent
                >
                  {/* TODO: add view switcher component (table/grid) */}
                  {
                    view === 'table'
                      ? <CardTableView
                        columns={columns}
                        setCurrency={setCurrency}
                        currency={currency}
                      // data = passed from parent
                      />
                      : <CardGridView
                      // data = passed from parent
                      />
                  }
                </FilteredDataProvider>
              </CardPriceDataProvider>
            </Grid>
          </Grid>
      }
    </div >
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      Collection
    )
  )