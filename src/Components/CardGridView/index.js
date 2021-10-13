/* eslint-disable no-lone-blocks */

// import { useEffect, useState } from 'react'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'

import useStyles from './styles'


//TODO: all this


const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  // dispatch: {}
})

const CardGridView = (props) => {
  /** VARS **/
  const {
    classes,
    data,
    // dispatch,
  } = props


  /** EFFECTS **/
  { }


  /** HANDLERS **/
  { }

  /** RENDER **/
  return (
    <div className={classes.root}>
      hello from CardGridView
    </div>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      CardGridView
    )
  )