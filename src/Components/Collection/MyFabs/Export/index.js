/* eslint-disable no-lone-blocks */

// import { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'

import useStyles from './styles'


/** REDUX **/
const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {

  }
})


const MyFabs = ({
  /** VARS **/
  ...props
}) => {
  const {
    classes,
    // dispatch,
  } = props


  /** EFFECTS **/
  { }
  
  
  /** HANDLERS **/
  { }


  /** RENDER **/
  return (
    <div className={classes.root}>
      hello from MyFabs
    </div>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles) (
    connect(mapStateToProps, mapDispatchToProps) (
      MyFabs
    )
  )