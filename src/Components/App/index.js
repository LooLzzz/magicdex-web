/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
// import { useHistory } from 'react-router';

import { Collection, TopMenu, Login, Register, Home } from "@/Components"
import { MagicdexApi } from "@/Api"
import { setActiveUser } from "@/Logic/redux";
import useStyles from "./styles"


const mapStateToProps = (state) => ({
  theme: state.actions.theme.currentTheme,
  // accessToken: state.actions.activeUser.accessToken,
  // username: state.actions.activeUser.username,
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: {
    setActiveUser: (payload) => dispatch(setActiveUser(payload)),
  }
})


const App = (props) => {
  /** VARS **/
  // const history = useHistory()
  const {
    dispatch,
    theme,
    // accessToken,
  } = props;
  const _theme = Object.assign({}, theme);
  const classes = makeStyles(useStyles(_theme))();

  const routes = [
    {
      parent: Route,
      props: {
        path: '/',
        component: Home,
        exact: true,
      }
    },
    {
      parent: Route,
      props: {
        path: '/collection',
        component: Collection,
        exact: true,
      }
    },
    {
      parent: Route,
      props: {
        path: '/login',
        component: Login,
        exact: true,
      }
    },
    {
      parent: Route,
      props: {
        path: '/register',
        component: Register,
        exact: true,
      }
    },
    {
      parent: Redirect,
      props: {
        to: '/',
        exact: false,
      }
    },
  ];


  /** EFFECTS **/
  useEffect( () => {
    // onMount
    MagicdexApi.login() //try to login with `localStorage['accessToken']`
      .then( res => dispatch.setActiveUser(res.data) )
      .catch( err => {/*do nothing*/} )
  }, [])


  /** RENDER **/
  return (
    <ThemeProvider theme={_theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Router>
          <TopMenu />
          <div className={classes.content}>
            <Switch>
              {
                routes.map( (item, i) => (
                  <item.parent
                    key = {i}
                    {...item.props}
                  />
                ))
              }
            </Switch>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)( App );