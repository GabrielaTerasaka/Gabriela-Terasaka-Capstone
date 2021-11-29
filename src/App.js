import "./App.scss";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";

import IndexPage from "./pages/IndexPage";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={IndexPage} />
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
            path="/home"
            exact
            render={(routerProps) => <HomePage {...routerProps} />}
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
