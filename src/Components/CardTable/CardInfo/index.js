/* eslint-disable no-lone-blocks */

import { Grid, Box } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
// import _ from 'lodash'

import useStyles from './styles'


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {

  }
})

const CardInfo = (props) => {
  /** VARS **/
  const {
    classes,
    collection,
    // dispatch,
  } = props


  /** EFFECTS **/
  { }


  /** HANDLERS **/
  { }


  /** RENDER **/
  return (
    <Box container component={Grid} padding={2} spacing={1} className={classes.root}>
      {
        Object.entries(collection).map(([key, value]) => (
          <Grid item container xs={12} key={key}>
            <Grid item xs={2}>
              {key}
            </Grid>
            <Grid item xs={10}>
              {value.toString()}
            </Grid>
          </Grid>
        ))
      }
    </Box>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      CardInfo
    )
  )