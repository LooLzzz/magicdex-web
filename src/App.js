import "./App.css";
import TopMenu from "./components/TopMenu/TopMenu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Collection from "./components/Collection/Collection";
import { ThemeProvider } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login/Login";

function App() {
  const myThemeState = useSelector(
    (state) => state.actions.themes.currentTheme
  );
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
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
