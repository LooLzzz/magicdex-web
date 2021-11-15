/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */

import { useEffect } from 'react'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'

import { setCurrentTab } from '@/Logic/redux'
import useStyles from './styles'


/** REDUX **/
const mapStateToProps = (state) => ({
  username: state.actions.activeUser.username,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    setCurrentTab: (payload) => dispatch(setCurrentTab(payload)),
  }
})


const Decks = ({
  /** VARS **/
  ...props
}) => {
  const {
    classes,
    dispatch,
    username,
  } = props
  const history = useHistory()


  /** EFFECTS **/
  useEffect(() => {
    //onMount
    dispatch.setCurrentTab({ tab: 'decks' })
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
      hello from Decks
    </div>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      Decks
    )
  )