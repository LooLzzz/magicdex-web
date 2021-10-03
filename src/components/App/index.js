// import { useEffect } from 'react';
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
// import { useHistory } from 'react-router';

import { Collection, TopMenu, Login, Register, Home } from "@/Components"
// import { setCurrentTab } from "@/Logic/redux/reducerSlice";
import useStyles from "./styles"


const mapStateToProps = (state) => ({
  theme: state.actions.theme.currentTheme,
})


const App = (props) => {
  /** VARS **/
  // const history = useHistory()
  const {
    theme,
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

export default connect(mapStateToProps)( App );