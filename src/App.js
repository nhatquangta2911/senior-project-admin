import React from "react";
import { Route, Switch } from "react-router-dom";
import "./styles/styles.scss";
import "semantic-ui-css/semantic.min.css";
import { ToastProvider } from "react-toast-notifications";
import { Navbar } from "./components";
import { LogPage, HomePage, MonitorPage, LoginPage, ManagePage } from "./pages";
import withAuth from "./helpers/withAuth";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ToastProvider autoDismiss autoDismissTimeout={4000}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/manage" component={withAuth(ManagePage)} />
          <Route path="/monitor" component={withAuth(MonitorPage)} />
          <Route path="/log" component={withAuth(LogPage)} />
          <Route path="/auth" component={LoginPage} />
        </Switch>
      </ToastProvider>
    </div>
  );
}

export default App;
