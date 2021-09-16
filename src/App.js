import "./App.css";
import TopMenu from "./components/TopMenu/TopMenu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Collection from "./components/Collection/Collection";
import { ThemeProvider } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  const myThemeState = useSelector(
    (state) => state.actions.themes.currentTheme
  );
  const stateUsername = useSelector((state) => state.actions.account.username);
  let testTheme = {};
  Object.assign(testTheme, myThemeState);
  return (
    <ThemeProvider theme={testTheme}>
      <Router>
        <div className="TopMenu">
          <TopMenu />
        </div>
        <div>
          <Switch>
            <Route path="/collection" exact component={Collection} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
