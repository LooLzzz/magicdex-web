/* eslint-disable no-lone-blocks */
import { useEffect, useState } from 'react'
import { Paper, Divider, Typography } from '@material-ui/core'
import { withStyles } from "@material-ui/styles"
import { connect } from 'react-redux'
import { ValidatorForm } from 'react-material-ui-form-validator'

// import { setCurrentTab } from "@/Logic/redux/reducerSlice"
import useStyles from './styles'

// function toTitleCase(str) {
//   return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
// }

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    // setCurrentTab: (payload) => dispatch(setCurrentTab(payload)),
  }
})

const BaseForm = (props) => {
  /** VARS **/
  const {
    classes,
    // dispatch,
  } = props
  const [Header,  setHeader]  = useState(() => ([]))
  const [Icon,    setIcon]    = useState(() => ([]))
  const [Content, setContent] = useState(() => ([]))
  const [Actions, setActions] = useState(() => ([]))

  
  /** EFFECTS **/
  useEffect( () => {
    setHeader(props.header)
  }, [props.header])
  
  useEffect( () => {
    setIcon(props.icon)
  }, [props.icon])
  
  useEffect( () => {
    setContent(props.content)
  }, [props.content])
  
  useEffect( () => {
    setActions(props.actions)
  }, [props.actions])


  /** HANDLERS **/
  { }

  
  /** RENDER **/
  return (
    <>
      <Paper ref={props.formRef}
        className={classes.root} elevation={8} style={props?.style}
        component={ValidatorForm} onSubmit={props.onSubmit}
      >
        <Typography variant='h4' className={classes.header}>
          <b>{Header}</b>
        </Typography>
        
        <div className={classes.icon}>
          {Icon}
        </div>
        <Divider className={classes.divider}/>

        <div className={classes.bottom}>
          <div className={classes.content}>
            {Content}
          </div>
          <div className={classes.actions}>
            {Actions}
          </div>
        </div>
      </Paper>
    </>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles) (
    connect(mapStateToProps, mapDispatchToProps) (
      BaseForm
    )
  )