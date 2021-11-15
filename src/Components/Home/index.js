/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react'
import { Typography, Paper, Grid, Divider } from "@material-ui/core"
import { withStyles } from "@material-ui/styles"
import { connect } from "react-redux"

import Config from '@/Config'
import { setCurrentTab } from "@/Logic/redux"
import useStyles from "./styles"


/** REDUX **/
const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  'dispatch': {
    setCurrentTab: (payload) => dispatch(setCurrentTab(payload)),
  }
})


const Home = ({
  /** VARS **/
  ...props
}) => {
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
      <Grid item container component={Paper} xs={12} sm={10} md={9} lg={8} className={classes.content} spacing={1}>
        <Grid item container justifyContent='center' xs={12}>
          <Grid item xs={11} sm={10} md={9}>
            <img src='/logo.png' width='100%' alt="home" />
          </Grid>
        </Grid>
        <Grid item xs={12} component={Typography} variant='h6'>
          Welcome to Magicdex
        </Grid>
        <Grid item xs={12} component={Typography} varinat='body2'>
          This is webapp is still in development, feel free to explore and report any bug you encounter.
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item xs={12} component={Typography} variant='body2'>
          Active Config:
          {
            JSON.stringify({
              MODIFY_DB_ALLOWED: Config.MODIFY_DB_ALLOWED,
              API_URL: Config.API_URL,
              username: 'test',
              password: 'test',
            }, null, 2)
              .slice(2, -1)
              .trim()
              .split('\n')
              .map((item, i) => (
                <div key={i}>
                  <code>
                    {item}
                  </code>
                </div>
              ))
          }
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