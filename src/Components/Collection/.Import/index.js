/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */

import { useState, useEffect } from 'react'
import { Grid, Typography, Paper, Divider, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'

import { setCurrentTab, setCurrentCollection } from '@/Logic/redux'
import useStyles from './styles'


/** REDUX **/
const mapStateToProps = (state) => ({
  username: state.actions.activeUser.username,
  collection: state.actions.activeUser.collection,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    setCurrentTab: (tab) => dispatch(setCurrentTab({ tab })),
    setCurrentCollection: (collection) => dispatch(setCurrentCollection({ collection })),
  }
})


const Import = ({
  /** VARS **/
  ...props
}) => {
  const {
    classes,
    dispatch,
    username,
    collection,
  } = props
  const history = useHistory()
  const [currentViewIndex, setCurrentViewIndex] = useState(0)


  /** EFFECTS **/
  useEffect(() => {
    //onMount
    dispatch.setCurrentTab('collection')
  }, [])

  useEffect(() => {
    if (!username)
      return history.push('/login')
  }, [username])


  /** HANDLERS **/
  { }


  /** RENDER **/
  return (

    <Grid container justifyContent='center' alignItems='center' component={Paper} elevation={3} className={classes.root}>
      <SwipeableViews
        index={currentViewIndex}
        style={{ width: '100%' }}
      >
        <Grid item container style={{ height: '100%' }}>
          {/* <Grid item xs={12} component={Typography} variant='h4'>
            Import Stuff
          </Grid> */}
          <Grid item xs component={Button} style={{ borderRadius: '2.5% 0 0 2.5%' }} onClick={e => setCurrentViewIndex(1)}>
            Bulk Import
          </Grid>
          <Divider flexItem orientation="vertical" />
          <Grid item xs component={Button} style={{ borderRadius: '0 2.5% 2.5% 0' }} onClick={e => setCurrentViewIndex(1)}>
            Import Wizard
          </Grid>
        </Grid>

        <Grid item container style={{ height: '100%' }}>
          <Grid container justifyContent='center' alignItems='center' className={classes.root}>
            <Grid item>
              im second view
            </Grid>
          </Grid>
        </Grid>
      </SwipeableViews>
    </Grid>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      Import
    )
  )