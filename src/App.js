import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";

import "./assets/scss/style.scss";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}
