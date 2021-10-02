/* eslint-disable react-hooks/rules-of-hooks */
import { Grid, CssBaseline, ThemeProvider, withStyles } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// import { useHistory } from 'react-router';

import { Collection, TopMenu, Login, Register, Home } from "@/Components"
import { setCurrentTab } from "@/Logic/redux/reducerSlice";
import useStyles from "./styles"


const mapStateToProps = (state) => ({
  theme: state.actions.theme.currentTheme,
})

const mapDispatchToProps = (dispatch) => ({
  'dispatch': {
    setCurrentTab: (payload) => dispatch(setCurrentTab(payload)),
  }
})


const App = (props) => {
  // const history = useHistory()
  const {
    theme,
    classes,
  } = props;
  
  let currentTheme = {};
  Object.assign(currentTheme, theme);

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

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Router>
        <Grid container direction="column" className={classes.root}>
          <Grid item xs={0}>
            <TopMenu />
          </Grid>
          <Grid item className={classes.content}>
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
          </Grid>
        </Grid>
      </Router>
    </ThemeProvider>
  );
}

export default
  connect(mapStateToProps, mapDispatchToProps) (
    withStyles(useStyles) (
      App
    )
  );
