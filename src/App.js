import React from "react";
import { Route, Switch } from "react-router-dom";
import "./styles/styles.scss";
import "semantic-ui-css/semantic.min.css";
import { Navbar } from "./components";
import { LogPage, HomePage, MonitorPage } from "./pages";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/log" component={LogPage} />
        <Route path="/monitor" component={MonitorPage} />
      </Switch>
    </div>
  );
}

export default App;
