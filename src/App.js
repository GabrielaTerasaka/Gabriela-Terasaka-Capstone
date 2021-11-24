import "./App.scss";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import RecipePage from "./pages/RecipePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Redirect from="/home" to="/" />
          <Route path="/" exact component={HomePage} />
          <Route path="/user" exact component={UserPage} />
          <Route path="/recipe" exact component={RecipePage} />
          {/* <Route path="/:userId" component={UserPage} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
