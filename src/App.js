import { Grid, CssBaseline, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import {  } from "@material-ui/core";

import { Collection, TopMenu, Login, Register } from "@/Components"


const mapStateToProps = (state) => {
  return {
    theme: state.actions.theme.currentTheme,
  };
};

const App = (props) => {
  const {
    theme,
  } = props;
  
  let currentTheme = {};
  Object.assign(currentTheme, theme);
  
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Router>
        <Grid container direction="column" style={{height:'100%'}}>
          <Grid item xs={0}>
            <TopMenu />
          </Grid>
          <Grid item>
            <Switch>
              <Route path="/collection" exact component={Collection} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
            </Switch>
          </Grid>
        </Grid>
      </Router>
    </ThemeProvider>
  );
}

export default connect(mapStateToProps)(App);
