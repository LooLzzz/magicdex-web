/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react'
import { Typography, Paper, Grid } from "@material-ui/core"
import { withStyles } from "@material-ui/styles"
import { connect } from "react-redux"
// import useSize from '@react-hook/size'
// import { useHistory } from 'react-router-dom';

// import { MagicdexApi } from "@/Api"
import { setCurrentTab } from "@/Logic/redux"
import useStyles from "./styles"


/** REDUX **/
const mapStateToProps = (state) => ({
  currentTab: state.actions.app.topMenu.currentTab,
})

const mapDispatchToProps = (dispatch) => ({
  'dispatch': {
    setCurrentTab: (payload) => dispatch(setCurrentTab(payload)),
  }
})


const Home = (props) => {
  //VARS
  // const history = useHistory();
  // const [width,] = useSize(document.body)
  const {
    classes,
    dispatch,
  } = props

  //EFFECTS
  useEffect(() => {
    //onMount
    dispatch.setCurrentTab({ tab: 'home' })
  }, [])


  //HANDLERS
  // const handleTabChange = (event, value) => {
  //   dispatch.setCurrentTab({tab:value});
  //   history.push( '/' + value )
  // }

  //RENDER
  return (
    <Grid container justifyContent='center' className={classes.root}>
      <Grid item component={Paper} xs={12} sm={10} md={9} lg={8} className={classes.content}>
        <Grid item container justifyContent='center' xs={12}>
          <Grid item xs={11} sm={10} md={9}>
            <img src='/logo.png' width='100%' alt="home" />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2">
            Welcome to Magicdex
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2">
            <span className="ss ss-fw ss-afr" />
            <span className="ss ss-fw ss-war" />
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

// EXPORT WITH HOOKS AND DECORATORS
export default
  connect(mapStateToProps, mapDispatchToProps)(
    withStyles(useStyles)(
      Home
    )
  )