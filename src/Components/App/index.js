/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, createRef } from 'react'
import { Grid, Button, CssBaseline, ThemeProvider } from "@material-ui/core"
import { Close as CloseIcon } from '@material-ui/icons'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { makeStyles } from "@material-ui/styles"
import { SnackbarProvider } from 'notistack'
// import { useHistory } from 'react-router-dom'

import { Collection, TopMenu, BottomBar, Login, Register, Home, Decks, Profile } from "@/Components"
import { MagicdexApi } from "@/Api"
import { setActiveUser } from "@/Logic/redux"
import useStyles from "./styles"


/** REDUX **/
const mapStateToProps = (state) => ({
  theme: state.actions.theme.currentTheme,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    setActiveUser: (payload) => dispatch(setActiveUser(payload)),
  }
})


const App = ({
  /** VARS **/
  theme: _theme,
  ...props
}) => {
  const {
    dispatch,
  } = props
  const snackbarRef = createRef()
  const theme = Object.assign({}, _theme)
  const classes = makeStyles(useStyles(theme))()

  const routes = [
    {
      component: Route,
      props: {
        path: '/',
        component: Home,
        exact: true,
      }
    },
    {
      component: Route,
      props: {
        path: '/collection',
        component: Collection,
        exact: true,
      }
    },
    {
      component: Route,
      props: {
        path: '/decks',
        component: Decks,
        exact: true,
      }
    },
    {
      component: Route,
      props: {
        path: '/login',
        component: Login,
        exact: true,
      }
    },
    {
      component: Route,
      props: {
        path: '/register',
        component: Register,
        exact: true,
      }
    },
    {
      component: Route,
      props: {
        path: '/profile',
        component: Profile,
        exact: true,
      }
    },
    {
      component: Redirect,
      props: {
        to: '/',
        exact: false,
      }
    },
  ]


  /** EFFECTS **/
  useEffect(() => {
    // onMount
    MagicdexApi.login() //try to login with `localStorage['accessToken']`
      .then(res => {
        dispatch.setActiveUser(res)
        snackbarRef.current.enqueueSnackbar(`Welcome back ${res.username}`, { variant: 'info' })
        // snackbarRef.current.enqueueSnackbar('Welcome back', { variant: 'info' })
      })
      .catch(err => dispatch.setActiveUser({ username: null }))
  }, [])


  /** RENDER **/
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        ref={snackbarRef}
        autoHideDuration={3250}
        maxSnack={3}
        action={toastId => (
          <Button
            endIcon={<CloseIcon />}
            onClick={e => snackbarRef.current.closeSnackbar(toastId)}
            color="inherit"
          >
            Dismiss
          </Button>
        )}
      >
        <Grid container component={Router} justifyContent='center' alignItems='flex-start'>
          <Grid item xs={12}
            component={TopMenu}
          />

          <Grid item xs={12} align='center' className={classes.content}>
            <Switch>
              {
                routes.map((item, i) => (
                  <item.component
                    key={i}
                    {...item.props}
                  />
                ))
              }
            </Switch>
          </Grid>

          <Grid item container justifyContent='center' alignItems='center' xs={12} className={`${classes.bottomBar} MuiPaper-elevation8`}>
            <BottomBar />
          </Grid>
        </Grid>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)