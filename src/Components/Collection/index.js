/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
// import useMouse from '@react-hook/mouse-position'
// import _ from 'lodash';
// import clsx from 'clsx'

import { setCurrentTab, setCurrentCollection } from '@/Logic/redux'
import { CardTableView } from '@/Components'
import { MagicdexApi } from '@/Api'
import FilterFields from './FilterFields'
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
  } = props
  const history = useHistory()
  const [filters, setFilters] = useState()
  const columns = {
    amount: 'amount',
    name: 'name',
    set: 'set',
    mana_cost: 'mana cost',
    type_line: 'type',
    foil: 'foil',
    total_price: 'price (usd)',
    date_created: 'date added',
  }


  /** EFFECTS **/
  useEffect(() => {
    //onMount
    dispatch.setCurrentTab({ tab: 'collection' })

    //DEBUG
    // setFilters({
    //   // foil: v => v === true,
    //   // foil: true,
    //   // name: v => v.toLowerCase().includes('fire'),
    //   // name: 'Fireball',
    //   price: (v, item) => item.amount * item.prices.usd < 10,
    // })
  }, [])

  useEffect(() => {
    if (username === null)
      return history.push('/')

    MagicdexApi
      .getAllCards()
      .then(res => dispatch.setCurrentCollection({ collection: res }))
  }, [username])

  // useEffect(() => {
  // }, [collection])


  /** HANDLERS **/
  // const handleRowHover = (card, i) => {
  //   setCurrentHoveringCard(card)
  // }


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
          <Grid container justifyContent='flex-end'>
            <Grid item container xs={12} lg={10} justifyContent='center'>
              <Grid item xs={12}>
                <FilterFields setFilters={setFilters} />
              </Grid>
            </Grid>
            <Grid item container wrap='nowrap' justifyContent='center' xs={12}>
              <Grid item>
                <FilteredDataProvider
                  data={collection}
                  filters={filters}
                >
                  <CardTableView
                    columns={columns}
                    data={collection}
                  />
                </FilteredDataProvider>
              </Grid>
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