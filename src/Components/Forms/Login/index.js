/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState, useRef } from 'react';
// import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import { withStyles } from "@material-ui/styles"
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { TextValidator } from 'react-material-ui-form-validator';
import { useSnackbar } from 'notistack';

import { MagicdexApi } from '@/Api'
import { setActiveUser, setCurrentTab } from '@/Logic/redux'
import { BaseForm } from './..'
import useStyles from './styles'
import { Box, Button, Grid, Typography } from '@material-ui/core';


const mapStateToProps = (state) => ({
  username: state.actions.activeUser.username,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    setActiveUser: (payload) => dispatch(setActiveUser(payload)),
    setCurrentTab: (payload) => dispatch(setCurrentTab(payload)),
  }
})

const Login = (props) => {
  /** VARS **/
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar();
  const [errorMessages, setErrorMessages] = useState([])
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const formRef = useRef()
  const {
    classes,
    dispatch,
    username,
  } = props


  /** EFFECTS **/
  useEffect(() => {
    //onMount
    dispatch.setCurrentTab('login')
  }, [])

  useEffect(() => {
    if (username)
      history.push('/')
  }, [username])


  /** HANDLERS **/
  const handleSubmit = (e) => {
    MagicdexApi
      .login({ username: usernameInput, password: passwordInput })
      .then(res => {
        dispatch.setActiveUser(res.data)
        enqueueSnackbar('Login successful', { variant: 'success' })
      })
      .catch(err => {
        setErrorMessages('Username not found')
        enqueueSnackbar('Login failed', { variant: 'error' })
      })
    }

  const handleClear = (e) => {
    setErrorMessages([])
    setUsernameInput('')
    setPasswordInput('')
    formRef.current.resetValidations()
  }


  /** RENDER **/
  return (
    <Grid container className={classes.root}>
      <BaseForm
        formRef={formRef}
        onSubmit={handleSubmit}
        instantValidate={false}

        header='Login'
        // icon     = {() => <AccountCircleIcon fontSize='inherit' />}
        icon={() => <Box marginBottom={2}>💩</Box>}
        content={() => (
          <>
            <TextValidator
              id='username'
              type='text'
              label='Username'
              variant='outlined'
              size='small'
              color='secondary'
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              validators={['required', `matchRegexp:^([A-Za-z0-9]|[-_.'])*$`]}
              errorMessages={['Field is required', 'Special characters are not allowed']}
            />
            <TextValidator
              id='password'
              type='password'
              label='Password'
              variant='outlined'
              size='small'
              color='secondary'
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              validators={['required']}
              errorMessages={['Field is required']}
            />
            {
              (errorMessages instanceof Array)
                ? Object.values(errorMessages).map((value, i) => (
                    <Typography key={i} variant='subtitle2' color='error'>
                      { value[0].toUpperCase() + value.slice(1) }
                    </Typography>
                  ))
                : <Typography variant='subtitle2' color='error'>
                    { errorMessages[0].toUpperCase() + errorMessages.slice(1) }
                  </Typography>
            }
          </>
        )}
        actions={() => (
          <Grid container spacing={1}>
            <Grid item>
              <Button
                size="medium"
                variant="outlined"
                onClick={handleClear}
              // disabled = {this.state.success}
              >
                Clear
              </Button>
            </Grid>
            <Grid item style={{ paddingRight: 0 }}>
              <Button
                type="submit"
                size="medium"
                variant="contained"
                color="primary"
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
  withStyles(useStyles)(
    connect(mapStateToProps, mapDispatchToProps)(
      Login
    )
  )