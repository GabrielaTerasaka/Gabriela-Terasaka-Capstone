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
import NotFoundPage from "./pages/NotFoundPage";

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
          <Route
            path="/profile"
            exact
            render={(routerProps) => <UserPage {...routerProps} />}
          />
          <Route component={NotFoundPage} />

          {/* <Route path="/recipe" exact component={RecipePage} />
          <Route path="/profile" component={UserPage} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
