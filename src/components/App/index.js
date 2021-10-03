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
  username: state.actions.account.username,
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
    username,
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
    if (!username) {
      MagicdexApi.login() //try to login with `localStorage['access-token']`
        .then(res => {
          if (res.status === 200) 
            dispatch.setActiveUser(res.data)
        })
    }
  }, [username])


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