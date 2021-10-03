/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useEffect, useState, useRef } from 'react';
import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import { withStyles } from "@material-ui/styles"
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { TextValidator } from 'react-material-ui-form-validator';

import { login, setCurrentTab } from '@/Logic/redux/reducerSlice'
import { BaseForm } from './..'
import useStyles from './styles'
import { Box, Button, Grid, Typography } from '@material-ui/core';

const mapStateToProps = (state) => ({
  username: state.actions.account.username,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    login: (payload) => dispatch(login(payload)),
    setCurrentTab: (payload) => dispatch(setCurrentTab(payload)),
  }
})

const Register = (props) => {
    /** VARS **/
    const history = useHistory()
    const [errorMessages, setErrorMessages]             = useState({})
    const [usernameInput, setUsernameInput]             = useState('')
    const [passwordInput, setPasswordInput]             = useState('')
    const [passwordRepeatInput, setPasswordRepeatInput] = useState('')
    const formRef = useRef()
    const {
      classes,
      dispatch,
    } = props


    /** EFFECTS **/
    useEffect( () => {
      //onMount
      if (props.username)
      {
        history.push('/')
        return
      }
      
      dispatch.setCurrentTab('login')
    }, [])


    /** HANDLERS **/
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleSubmit = async (e) => {
      //TODO:
      console.log('started register submit')
      await sleep(1000)
      console.log('started register ended')
    }

    const handleError = (e) => {
      //TODO
      console.log('register error')
    }

    const handleClear = (e) => {
      setErrorMessages({})
      setUsernameInput('')
      setPasswordInput('')
      setPasswordRepeatInput('')
      formRef.current.resetValidations()
    }

    
    /** VALIDATORS **/
    const isPasswordMatch = (value) => (
      value === passwordInput
    )


    /** RENDER **/
    return (
      <Grid container className={classes.root}>
      <BaseForm
        formRef  = {formRef}
        validationRules = {{ isPasswordMatch }}
        onSubmit = {handleSubmit}
        onError  = {handleError}
        instantValidate = {false}
        
        header   = 'Signup'
        icon     = {() => <AccountCircleIcon fontSize='inherit' />}
        // icon     = {() => <Box style={{marginBottom:17}}>💩</Box>}
        content  = {() => (
          <>
            <TextValidator
              id = 'username'
              name = 'username'
              type = 'text'
              label = 'Username'
              variant = 'outlined'
              size = 'small'
              color = 'secondary'
              value = {usernameInput}
              onChange = {(e) => setUsernameInput(e.target.value)}
              validators = {['required', `matchRegexp:^([A-Za-z0-9]|[-_.'])*$`]}
              errorMessages = {['Field is required', 'Special characters are not allowed']}
            />
            <TextValidator
              id = 'password'
              name = 'password'
              type = 'password'
              label = 'Password'
              variant = 'outlined'
              size = 'small'
              color = 'secondary'
              value = {passwordInput}
              onChange = {(e) => setPasswordInput(e.target.value)}
              validators = {['required', 'minStringLength:5']}
              errorMessages = {['Field is required', 'Password is too short']}
            />
            <TextValidator
              id = 'password_repeat'
              name = 'password_repeat'
              type = 'password'
              label = 'Repeat Password'
              variant = 'outlined'
              size = 'small'
              color = 'secondary'
              value = {passwordRepeatInput}
              onChange = {(e) => setPasswordRepeatInput(e.target.value)}
              validators = {['required', 'minStringLength:5', 'isPasswordMatch']}
              errorMessages = {['Field is required', 'Password is too short', 'Passwords does not match']}
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
        actions = {() => (
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
};

/** EXPORT **/
export default withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      Register
    )
);
