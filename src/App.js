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
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Redirect from="/home" to="/" />
          <Route path="/" exact component={HomePage} />
          <Route
            path="/signin"
            exact
            render={(routerProps) => <SignInPage {...routerProps} />}
          />
          <Route
            path="/signup"
            exact
            render={(routerProps) => <SignUpPage {...routerProps} />}
          />
          <Route path="/user" exact component={UserPage} />
          <Route path="/recipe" exact component={RecipePage} />
          {/* <Route path="/:userId" component={UserPage} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
