import "./App.css";
import TopMenu from "./components/TopMenu/TopMenu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Collection from "./components/HomePage/HomePage";

function App() {
  return (
    <Router>
      <div className="TopMenu">
        <TopMenu />
      </div>
      <Switch>
        <Route path="/homepage" exact component={Collection} />
      </Switch>
    </Router>
  );
}

export default App;
