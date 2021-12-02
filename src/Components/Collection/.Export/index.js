/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */

import { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/styles'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import { setCurrentTab, setCurrentCollection } from '@/Logic/redux'
import { pickCardFields } from '@/Api/MagicdexApi/utils'
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


const Export = ({
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
    <div className={classes.root}>
      hello from Export
    </div>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      Export
    )
  )