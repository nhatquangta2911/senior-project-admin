import React from "react";
import { Route, Switch } from "react-router-dom";
import "./styles/styles.scss";
import "semantic-ui-css/semantic.min.css";
import { Navbar } from "./components";
import { LogPage, HomePage, MonitorPage, LoginPage } from "./pages";
import withAuth from "./helpers/withAuth";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/log" component={withAuth(LogPage)} />
        <Route path="/monitor" component={withAuth(MonitorPage)} />
        <Route path="/auth" component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
