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
import { MagicdexApi } from '@/Api'
import FilteredDataProvider from './FilteredDataProvider'
import CardImage from './CardImage'
import { CardTable } from '@/Components'
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
  const history = useHistory()
  const [currentHoveringCard, setCurrentHoveringCard] = useState()
  const {
    classes,
    dispatch,
    username,
    collection,
  } = props
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
  }, [])

  useEffect(() => {
    if (username === null)
      history.push('/')
    else if (username) {
      MagicdexApi
        .getAllCards()
        .then(res => dispatch.setCurrentCollection({ collection: res }))
    }
  }, [username])


  /** HANDLERS **/
  const handleRowHover = (card, i) => {
    setCurrentHoveringCard(card)
  }


  /** RENDER **/
  return (
    <div className={classes.root}>
      <Grid container>
        <Hidden mdDown>
          <Grid item className={classes['image-container']}>
            <CardImage
              className={classes['card-image']}
              card={currentHoveringCard}
              width={225}
            />
          </Grid>
        </Hidden>
        <Grid item style={{ flexGrow: 1 }}>
          <div align='center' style={{ maxWidth: 'fit-content' }}>
            <FilteredDataProvider
              data={collection}
              // filters={filters} //idk, get it from somewhere
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