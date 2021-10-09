/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react'
import { Hidden, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
// import useMouse from '@react-hook/mouse-position'
// import _ from 'lodash';
// import clsx from 'clsx'

import { setCurrentTab, setCurrentCollection } from '@/Logic/redux'
import { CardTable } from '@/Components'
import { MagicdexApi } from '@/Api'
import FilterFields from './FilterFields'
import FilteredDataProvider from './FilteredDataProvider'
import CardImage from './CardImage'
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
  const [currentHoveringCard, setCurrentHoveringCard] = useState()
  const [filters, setFilters] = useState()
  const columns = {
    amount: 'amount',
    set: 'set',
    name: 'name',
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


  /** HANDLERS **/
  const handleRowHover = (card, i) => {
    setCurrentHoveringCard(card)
  }


  /** RENDER **/
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item container xs={12}>
          <Grid item xs={2} />
          <Grid item xs={10}>
            <FilterFields setFilters={setFilters} />
          </Grid>
        </Grid>
        <Hidden mdDown>
          <Grid item xs={2}>
            <CardImage
              className={classes['card-image']}
              card={currentHoveringCard}
              width={225}
            />
          </Grid>
        </Hidden>
        <Grid item xs={10}>
          <div align='center' style={{ maxWidth: 'fit-content' }}>
            <FilteredDataProvider
              data={collection}
              filters={filters}
            >
              <CardTable
                onRowHover={handleRowHover}
                columns={columns}
                data={collection}
              />
            </FilteredDataProvider>
          </div>
        </Grid>
      </Grid>
    </div >
  );
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      Collection
    )
  )