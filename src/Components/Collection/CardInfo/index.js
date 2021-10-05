/* eslint-disable no-lone-blocks */

import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import _ from 'lodash'

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
    data
    // dispatch,
  } = props


  /** EFFECTS **/
  { }


  /** HANDLERS **/
  { }


  /** RENDER **/
  return (
    <div className={classes.root}>
      {
        Object
          .entries(data)
          .map(([key, value]) =>
            <Grid container key={key}>
              <Grid item align='center' xs={2}>
                {key}
              </Grid>
              <Grid item align='center' xs={10}>
                {
                  (value instanceof Array)
                    ? '[' + _.join(value, ',') + ']'
                    : String(value)
                }
              </Grid>
            </Grid>
          )
      }
    </div>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      CardInfo
    )
  )