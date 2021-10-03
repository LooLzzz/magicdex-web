/* eslint-disable no-lone-blocks */
import { useEffect, useState, useRef } from 'react';
// import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import { withStyles } from "@material-ui/styles"
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { TextValidator } from 'react-material-ui-form-validator';

import { login, setCurrentTab } from '@/Logic/redux/reducerSlice'
import { BaseForm } from '..'
import useStyles from './styles'
import { Box, Button, Grid, Typography } from '@material-ui/core';


const mapStateToProps = (state) => ({
  username: state.actions.account.username,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    login: (payload) => dispatch(login(payload)),
    setCurrentTab: (payload) => dispatch(setCurrentTab(payload)),
  }
})

const Login = (props) => {
  /** VARS **/
  const history = useHistory()
  const [errorMessages, setErrorMessages] = useState({})
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const formRef = useRef()
  const {
    classes,
    dispatch,
  } = props


  /** EFFECTS **/
  useEffect( () => {
    //onMount
    if (props.username)
      history.push('/')
    else
      dispatch.setCurrentTab('login')
  })
  

  /** HANDLERS **/
  const handleSubmit = async (e) => {
    //TODO: handle submit & open modal
    console.log('login sumbit')
    let flag = await formRef.current.isFormValid()
  }
  
  const handleError = (e) => {
    //TODO
    console.log('login error')
  }
  
  const handleClear = (e) => {
    setErrorMessages({})
    setUsernameInput('')
    setPasswordInput('')
    formRef.current.resetValidations()
  }


  /** RENDER **/
  return (
    <Grid container className={classes.root}>
      <BaseForm
        formRef  = {formRef}
        onSubmit = {handleSubmit}
        onError  = {handleError}
        instantValidate = {false}
        
        header   = 'Login'
        // icon     = {() => <AccountCircleIcon fontSize='inherit' />}
        icon     = {() => <Box style={{marginBottom:17}}>💩</Box>}
        content  = {() => (
          <>
            <TextValidator
              id = 'username'
              type = 'text'
              label = 'Username'
              variant = 'outlined'
              size = 'small'
              color = 'secondary'
              value = {usernameInput}
              onChange = {(e) => setUsernameInput(e.target.value)}
              validators = {['required', `matchRegexp:^([A-Za-z0-9]|[-_.'])*$`]}
              errorMessages = {['Username is required', `Username can only be alphanumerica and any of - _ . ' `]}
            />
            <TextValidator
              id = 'password'
              type = 'password'
              label = 'Password'
              variant = 'outlined'
              size = 'small'
              color = 'secondary'
              value = {passwordInput}
              onChange = {(e) => setPasswordInput(e.target.value)}
              validators = {['required']}
              errorMessages = {['Password is required']}
            />
            {
              Object.values(errorMessages).map( (value, i) => (
                <Typography key={i} variant='subtitle2' color='error'>
                  {value}
                </Typography>
              ))
            }
          </>
        )}
        actions  = {() => (
          <Grid container spacing={1}>
            <Grid item>
              <Button
                size = "medium"
                variant = "outlined"
                onClick = {handleClear}
                // disabled = {this.state.success}
              >
                Clear
              </Button>
            </Grid>
            <Grid item style={{paddingRight:0}}>
              <Button
                type = "submit"
                size = "medium"
                variant = "contained"
                color = "primary"
                // disabled = {this.state.success}
              >
                Submit
              </Button>
          </Grid>
        </Grid>
        )}
      />
    </Grid>
  )
}

/** EXPORT **/
export default
  withStyles(useStyles) (
    connect(mapStateToProps, mapDispatchToProps) (
      Login
    )
  )