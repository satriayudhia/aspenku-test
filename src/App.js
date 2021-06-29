import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { setAuthToken } from "./configs/API";

//Components
import Home from "./pages/Home";
import Product from "./pages/Product";

function App() {
  setAuthToken("QXNwZW5rdTpBc3Blbmt1");
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:id" component={Product} />
      </Switch>
    </Router>
  );
}

export default App;
