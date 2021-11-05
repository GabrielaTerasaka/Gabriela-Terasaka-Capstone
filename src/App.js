import "./App.scss";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        HELLO WORLD
        <Switch>
          {/* <Route path="/" exact component={HomePage}/>         
          <Route path="/:userId" component={UserPage}/>          */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
