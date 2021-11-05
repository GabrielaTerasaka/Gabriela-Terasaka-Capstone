import "./App.scss";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import UserPage from "./pages/UserPage/UserPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Redirect from="/home" to="/" />
          <Route path="/" exact component={HomePage} />
          <Route path="/user" exact component={UserPage} />
          {/* <Route path="/:userId" component={UserPage} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
