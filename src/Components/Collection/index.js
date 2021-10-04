/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */

import { useEffect } from 'react'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'

import useStyles from './styles'
import { setCurrentTab } from '@/Logic/redux'


const mapStateToProps = (state) => ({
  username: state.actions.activeUser.username,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    setCurrentTab: (payload) => dispatch(setCurrentTab(payload)),
  }
})

const Collection = (props) => {
  /** VARS **/
  const history = useHistory()
  const {
    classes,
    dispatch,
    username,
  } = props


  /** EFFECTS **/
  useEffect(() => {
    //onMount
    dispatch.setCurrentTab('collection')
  }, [])
  
  useEffect(() => {
    if (!username)
      history.push('/')
  }, [username])
  

  /** HANDLERS **/
  { }


  /** RENDER **/
  return (
    <div className={classes.root}>
      hello from Collection
    </div>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles) (
    connect(mapStateToProps, mapDispatchToProps) (
      Collection
    )
  )