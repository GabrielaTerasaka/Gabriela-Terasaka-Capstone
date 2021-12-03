import "./App.scss";
import {
  BrowserRouter as Router,
  // Redirect,
  Switch,
  Route,
} from "react-router-dom";

import IndexPage from "./pages/IndexPage";
import HomePage from "./pages/HomePage";
// import RecipePage from "./pages/RecipePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import NotFoundPage from "./pages/NotFoundPage";
import FeatureInProgress from "./pages/FeatureInProgress";
import IndividualGroceryList from "./pages/IndividualGroceryList";
import AllGroceryList from "./pages/AllGroceryList";
import Pantry from "./pages/Pantry";

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
          <Route
            path="/grocery"
            exact
            render={(routerProps) => <AllGroceryList {...routerProps} />}
          />
          <Route
            path="/grocery/:id"
            render={(routerProps) => <IndividualGroceryList {...routerProps} />}
          />
          <Route
            path="/pantry"
            exact
            render={(routerProps) => <Pantry {...routerProps} />}
          />
          <Route
            path="/recipes"
            exact
            render={(routerProps) => <FeatureInProgress {...routerProps} />}
          />
          <Route
            path="/profile"
            exact
            render={(routerProps) => <FeatureInProgress {...routerProps} />}
          />
          <Route
            path="/featureinprogress"
            exact
            render={(routerProps) => <FeatureInProgress {...routerProps} />}
          />
          <Route
            path="/notfound"
            exact
            render={(routerProps) => <NotFoundPage {...routerProps} />}
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
