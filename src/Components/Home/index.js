/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react'
import { Typography, Paper, Grid } from "@material-ui/core"
import { withStyles } from "@material-ui/styles"
import { connect } from "react-redux"

import { setCurrentTab } from "@/Logic/redux"
import useStyles from "./styles"


/** REDUX **/
const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  'dispatch': {
    setCurrentTab: (payload) => dispatch(setCurrentTab(payload)),
  }
})


const Home = (props) => {
  /** VARS **/
  const {
    classes,
    dispatch,
  } = props


  //EFFECTS
  useEffect(() => {
    //onMount
    dispatch.setCurrentTab({ tab: 'home' })
  }, [])


  /** RENDER **/
  return (
    <Grid container justifyContent='center' className={classes.root}>
      <Grid item component={Paper} xs={12} sm={10} md={9} lg={8} className={classes.content}>
        <Grid item container justifyContent='center' xs={12}>
          <Grid item xs={11} sm={10} md={9}>
            <img src='/logo.png' width='100%' alt="home" />
          </Grid>
        </Grid>
        <Grid item xs={12} component={Typography}>
          Welcome to Magicdex
        </Grid>
        <Grid item xs={12} component={Typography} variant='h2'>
          <span className="ss ss-fw ss-afr" />
          <span className="ss ss-fw ss-war" />
        </Grid>
      </Grid>
    </Grid>
  )
}

/** EXPORT **/
export default
  connect(mapStateToProps, mapDispatchToProps)(
    withStyles(useStyles)(
      Home
    )
  )