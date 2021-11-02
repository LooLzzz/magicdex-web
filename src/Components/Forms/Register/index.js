/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState, useRef } from 'react'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import { AccountCircle as AccountCircleIcon } from '@material-ui/icons'
import { withStyles } from "@material-ui/styles"
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { TextValidator } from 'react-material-ui-form-validator'
import { useSnackbar } from 'notistack'
import _ from 'lodash'

import { MagicdexApi } from "@/Api"
import { setActiveUser, setCurrentTab } from '@/Logic/redux'
import { BaseForm } from './..'
import useStyles from './styles'


const mapStateToProps = (state) => ({
  username: state.actions.activeUser.username,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    setActiveUser: (payload) => dispatch(setActiveUser(payload)),
    setCurrentTab: (payload) => dispatch(setCurrentTab(payload)),
  }
})

const Register = (props) => {
  /** VARS **/
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordRepeatInput, setPasswordRepeatInput] = useState('')
  const passwordInputRef = useRef()
  const formRef = useRef()
  const {
    classes,
    dispatch,
    username,
  } = props


  /** EFFECTS **/
  useEffect(() => {
    //onMount
    dispatch.setCurrentTab({ tab: 'register' })
  }, [])

  useEffect(() => {
    if (username)
      history.push('/')
  }, [username])


  /** HANDLERS **/
  const handleSubmit = (e, resolve, reject) => {
    setErrorMessages([])
    setPasswordInput('')
    setPasswordRepeatInput('')
    setIsLoading(true)

    MagicdexApi
      .register({ username: usernameInput, password: passwordInput })
      .then(res => {
        dispatch.setActiveUser(res)
        enqueueSnackbar('Successfully registered', { variant: 'success' })
        resolve(res)
      })
      .catch(err => {
        const { msg } = err.response.data
        const msgs = (msg instanceof Array) ? msg : [msg]

        setErrorMessages(msgs)
        enqueueSnackbar('Error registering', { variant: 'error' })
        reject(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleError = (e) => {
    setErrorMessages([])
  }

  const handleClear = (e) => {
    setErrorMessages([])
    setUsernameInput('')
    setPasswordInput('')
    setPasswordRepeatInput('')
    formRef.current.resetValidations()
  }


  /** VALIDATORS **/
  const isPasswordMatch = (value) => (
    value === passwordInputRef.current.props.value
  )


  /** RENDER **/
  return (
    <Grid container className={classes.root}>
      <BaseForm
        formRef={formRef}
        validationRules={{ isPasswordMatch }}
        onSubmit={handleSubmit}
        onError={handleError}
        instantValidate={false}

        header='Signup'
        // icon={() => <AccountCircleIcon fontSize='inherit' />}
        icon={() => <Box marginBottom={2}>💁</Box>}
        content={() => (
          <>
            <TextValidator
              error={_.join(errorMessages, ';').includes('username')}
              id='username'
              name='username'
              type='text'
              label='Username'
              variant='outlined'
              size='small'
              color='secondary'
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              validators={['required', `matchRegexp:^[A-Za-z][A-Za-z0-9-_.]*$`]}
              errorMessages={['Field is required', 'Special characters are not allowed']}
              autoComplete='new-username'
            />
            <TextValidator
              ref={passwordInputRef}
              id='password'
              name='password'
              type='password'
              label='Password'
              variant='outlined'
              size='small'
              color='secondary'
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              validators={['required', 'minStringLength:5']}
              errorMessages={['Field is required', 'Password is too short']}
              autoComplete='new-password'
            />
            <TextValidator
              id='password_repeat'
              name='password_repeat'
              type='password'
              label='Repeat Password'
              variant='outlined'
              size='small'
              color='secondary'
              value={passwordRepeatInput}
              onChange={(e) => setPasswordRepeatInput(e.target.value)}
              validators={['required', 'minStringLength:5', 'isPasswordMatch']}
              errorMessages={['Field is required', 'Password is too short', 'Passwords does not match']}
              autoComplete='new-password2'
            />
            <Grid container direction='column'>
              {
                Object.values(errorMessages).map((value, i) => (
                  <Grid item key={i} className={classes.errorMessages}>
                    {value[0].toUpperCase() + value.slice(1)} {/* capitalize first letter */}
                  </Grid>
                ))
              }
            </Grid>
          </>
        )}
        actions={() => (
          <Grid container spacing={1}>
            <Grid item>
              <Button
                size="medium"
                variant="outlined"
                onClick={handleClear}
                disabled={isLoading}
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
                disabled={isLoading}
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
export default withStyles(useStyles)(
  connect(mapStateToProps, mapDispatchToProps)(
    Register
  )
)
