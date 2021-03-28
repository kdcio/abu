import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Suspense from "components/Suspense";
import "scss/core.scss";

const SignIn = React.lazy(() => import("./SignIn"));
const NewPassword = React.lazy(() => import("./NewPassword"));

const Login = () => {
  return (
    <Router>
      <Switch>
        <Route path="/new-password">
          <Suspense Component={NewPassword} />
        </Route>
        <Route path="/">
          <Suspense Component={SignIn} />
        </Route>
      </Switch>
    </Router>
  );
};

export default Login;
